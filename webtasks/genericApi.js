var rp = require('request-promise');

/**
 * MAPPING ALBUMS
 * Per album is needed:
 * id: Album id (specific for each streaming service)
 * name: Album title/name
 * artist.name: Album artist name
 * image: Image url
 * url: Link to streaming URL
 * */

module.exports = function(context, cb) {
  // TODO: put promise around switch, filter out results that don't match artist and album name in extra function.

  if ((context.body.type != null && context.body.artist != null && context.body.album != null) && (context.body.type.length > 0 && context.body.artist.length > 0 && context.body.album.length > 0)) {
    switch (context.body.type) {
      case 'spotify':
        return new Promise((resolve, reject) => {
          spotifyApi(context.body.artist, context.body.album, context)
            .then((result) => {
              resolve(cb(null, { spotify: result }));
            })
            .catch((err) => {
              reject(cb(err));
            });
        });
      case 'deezer':
        return new Promise((resolve, reject) => {
          deezerApi(context.body.artist, context.body.album)
            .then((result) => {
              resolve(cb(null, { deezer: result }));
            })
            .catch((err) => {
              reject(cb(err));
            });
        });
        break;
      case 'apple':
        cb(null, { err: 'This API type is not yet supported.' });
        break;
      default:
        cb({ err: 'Unknown API type.' });
    }
  } else cb({ err: 'Unknown API type.' });
};

function spotifyApi(artist, album, context){
  /** SPOTIFY API: Lessons learned.
   * May 29th: Spotify moved from open API to requiring authentication for every request.
   * Make sure you have a client ID and Secret (so register as developer and register your application.
   * Don't forget to use 'Content-Type':'application/x-www-form-urlencoded' as typing for the authorization flow.
   * Otherwise you'll end up with 415 status code errors. And id:secret needs to be encoded in Base64.
   *
   * The Client Credentials Flow (https://developer.spotify.com/web-api/authorization-guide/#client-credentials-flow)
   * This will use your ID and Secret to create a TEMPORARY access token, so this function needs to be regenerated,
   * ideally with every call. Once you've received a token, you can add this in the header of your actual API call.
   */

  var url = 'https://api.spotify.com/v1/search?q=artist:"' + artist + '"+album:"' + album + '"&type=album',
    spotify_id = context.secrets.SPOTIFY_CLIENT_ID,
    spotify_secret = context.secrets.SPOTIFY_CLIENT_SECRET,
    encodedString = new Buffer(spotify_id + ':' + spotify_secret).toString('base64');

  return new Promise((resolve, reject) => {
    var options = {
      method: 'POST',
      uri: 'https://accounts.spotify.com/api/token',
      body: 'grant_type=client_credentials',
      headers: {
        'Authorization': 'Basic ' + encodedString,
        'Content-Type':'application/x-www-form-urlencoded',
      },
      json: true,
    };

    rp(options).then((r) => {
      var token = 'Bearer ' + r.access_token,
        options = {
          method: 'GET',
          uri: url,
          headers: { 'Authorization' : token },
          json: true,
        };

      rp(options).then((response) => {
        var albums = [];
        response.albums.items.map((album) => {
          albums.push({
            id: album.id,
            name: album.name,
            artist: {
              name: album.artists[0].name,
            },
            url: album.external_urls.spotify,
            image: album.images[0].url,
          });
        });
        resolve(albums);
      }).catch((err) => { reject(err); });
    }).catch((err) => { reject(err); });
  });
}

function deezerApi(artist, album) {
  var i,
    deezerAlbums = [],
    deezerIds = {};
  const url = 'https://api.deezer.com/search/album?q=' + artist + ' ' + album + '"&type=album&strict=on';
  return new Promise((resolve, reject) => {
    rp(url)
      .then((response) => {
        var r = JSON.parse(response).data;
        r.forEach((deezer) => {
          console.log(deezer);
          if (!deezerIds[deezer.id]) {
            deezerAlbums.push({
              id: deezer.id,
              name: deezer.title,
              artist: {
                name: deezer.artist.name,
              },
              image: deezer.cover_xl,
              url: 'https://deezer.com/album/' + deezer.id,
            });
            deezerIds[deezer.id] = true;
          }
        });
        resolve(deezerAlbums);
      })
      .catch((err) => { reject(err); });
  });
}

// TODO: Apple Music/iTunes API
