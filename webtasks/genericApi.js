var rp = require('request-promise');

module.exports = function(context, cb) {
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

    var url = 'https://api.spotify.com/v1/search?q=artist:"' + context.body.artist + '"+album:"' + context.body.album + '"&type=album',
        spotify_id = context.secrets.SPOTIFY_CLIENT_ID,
        spotify_secret = context.secrets.SPOTIFY_CLIENT_SECRET,
        encodedString = new Buffer(spotify_id + ':' + spotify_secret).toString('base64');

    return new Promise((resolve) => {
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
                console.log(response);
                resolve(cb(null, {spotify: response}));
            }).catch((err) => { resolve(cb(err)); });
        }).catch((err) => {
            resolve(cb(err));
        });
    });
};