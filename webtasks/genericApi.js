var rp = require('request-promise');

module.exports = function(context, cb) {
    if((context.body.type != null && context.body.artist != null && context.body.album != null) && (context.body.type.length > 0 && context.body.artist.length > 0 && context.body.album.length > 0))
        switch (context.body.type){
            case 'spotify':
                return new Promise((resolve, reject) => {
                    spotifyApi(context.body.artist, context.body.album, context)
                        .then((result) => {
                            resolve(cb(null, {spotify: result}));
                        })
                        .catch((err) => {
                            reject(cb(err));
                        });
                });
                break;
            case 'deezer':
                cb(null, {err: "This API type is not yet supported."});
                break;
            case 'apple':
                cb(null, {err: "This API type is not yet supported."});
                break;
            default:
                cb({err: "Unknown API type."});
        }
    else cb({err: "Unknown API type."});
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
                'Content-Type':'application/x-www-form-urlencoded'
            },
            json: true
        };

        rp(options).then((response) => {
            var token = "Bearer " + response.access_token,
                options = {
                    method: 'GET',
                    uri: url,
                    headers: { 'Authorization' : token },
                    json: true
                };

            rp(options).then((response) => {
                resolve(response);
            }).catch((err) => { reject(err); });
        }).catch((err) => {
            reject(err);
        });
    });
}