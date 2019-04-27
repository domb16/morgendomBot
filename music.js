/*
    Music.js 
    -------------------

    Use this class to do anything with the Youtube API / Any other music api
    Call this class from main.js

    Please keep it library format:

    - No hard coded values
    - Everything passed from parameters
    - No Local variables unless properety

    -------------------

*/
const ytdl = require('ytdl-core');
const request = require('request');
const getYoutubeID = require('get-youtube-id');
const youtubeInfo = require('youtube-info');

const youtube_api_key = config.youtube_api_key;

function getID(link, callback) {
    if (isYoutube(link)) {
      callback(getYoutubeID(link));
    } else {
      search_video(link, function (id) {
        callback(id);
      });
    };
  };
  
  
  function isYoutube(link) {
    return link.toLowerCase().indexOf("youtube.com/watch?v=") > -1;
  };
  
  function search_video(query, callback) {
    request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + youtube_api_key, function (error, response, body) {
      var json = JSON.parse(body);
      if (!json.items[0]) callback("tkm8qRRoQIM");
      else {
        callback(json.items[0].id.videoId);
      };
    });
  };
  
  function addQueue(linkID) {
    if (isYoutube(linkID)) {
      queue.push(getID(linkID));
    } else {
      queue.push(linkID);
    };
  };
  
  function skip_song(message) {
    dispatcher.end();
    if (queue.length > 1) {
      playMusic(queue[0].message);
    }
  }
  
  function playMusic(id, message) {
    youtubeInfo(id, function (err, videoinfo) {
      if (err) {
        throw err;
      } else {
        message.channel.send({
          "embed": {
            "title": videoinfo.title,
            "description": "Added by | " + message.author + " |",
            "url": "https://www.youtube.com/watch?v=DxmwITkkPis",
            "color": 2077041,
            "thumbnail": {
              "url": "https://media.giphy.com/media/26tn7BL2UDTMVWovu/giphy.gif"
            }
          }
        });
      };
    });
    VoiceChannel = message.member.voiceChannel;
    VoiceChannel.join().then(function (connection) {
      stream = ytdl('https://youtube.com/watch?v=' + id, {
        filer: 'audioonly'
      });
      dispatcher = connection.playStream(stream);
      dispatcher.on('end', function () {
        queue.shift();
        if (queue.length == 0) {
          isPlaying = false;
        } else {
          playMusic(queue[0], message);
        }
      })
    });
  };