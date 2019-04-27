/*
    Giphy.js 
    -------------------

    Use this class to do anything with the Giphy API
    Call this class from main.js

    -------------------

*/

const giphy = require('giphy-api')(config.giphyApiKey);

function GenRandomGIF() {
    giphy.random(function (err, res) {
        if (err) {
            throw err
        } else {
            message.channel.send({
                "embed": {
                    "title": res.data.title,
                    "url": res.data.image_original_url,
                    "image": {
                        "url": res.data.image_original_url
                    }
                }
            });
        }
    });
}