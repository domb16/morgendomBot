/*
    Commands.js 
    -------------------

    Use this class to do anything with eacha command
    Call this class from main.js

    Please keep it library format:

    - No hard coded values
    - Everything passed from parameters
    - No Local variables unless properety

    -------------------

*/
import ytdl from 'ytdl-core';
import request from 'request';
import getYoutubeID from 'get-youtube-id';
import youtubeInfo from 'youtube-info';

new String(config) = JSON.parse(fs.readFileSync('./settings.json', 'UTF-8'));

const giphy = require('giphy-api')(config.giphyApiKey);
const youtube_api_key = config.youtube_api_key;

export default class Commands {

  constructor() {
    this.isPlaying = !this.isPlaying;
    this.queue = [];
    this.dispatcher = "";
    this.voiceChannel = "";

  }


  play_command(message) {
    if (message.startsWith(prefix + 'play')) {
      if (member.voiceChannel) {
        if (queue.length > 0 || isPlaying) {
          getID(argument, function (id) {
            addQueue(id);
            youtubeInfo(id, function (err, videoinfo) {
              if (err) {
                throw err;
              } else {
                message.reply(
                  '```ini\n [Added: | ' + videoinfo.title + ' | to queue!]```');
              }
            });
          });
        } else {
          isPlaying = true;
          getID(argument, function (id) {
            queue.push('placeholder');
            playMusic(id, message);
          });
        }
      } else {
        message.reply(
          '```ini\n [You need to be connected to a voicechannel]```');
      }
    }
  }

  skip_command(message) {
    try {
      skip_song(message);
      message.reply('```ini\n [Song skipped!]```');
    } catch (Exception) {
      console.log("Exception was thrown: " + Exception.message);
      message.reply("Couldn't skip song, I don't know how this happened");
    }

  }

  leave_command(message) {
    try {
      dispatcher.end();
      message.member.voiceChannel.leave();
    } catch (Exception) {
      console.log("You suck, error thrown: " + Exception.message);
      setTimeout(100);
      dispatcher.end()
      message.member.voiceChannel.leave();
    }
  }
  // } else if (string.startsWith(prefix + 'resume')) {
  //   dispatcher.resume();
  // } else if (string.startsWith(prefix + 'stop')) {
  //   dispatcher.end();
  //   message.member.voiceChannel.leave();

  pause_command(message) {
    try {
      dispatcher.pause();
    } catch (Exception) {
      console.log("You suck, error thrown: " + Exception.message);
      setTimeout(100);
      dispatcher.pause()
    }
  }

  resume_command(message) {
    try {
      dispatcher.resume();
    } catch (Exception) {
      console.log("You suck, error thrown: " + Exception.message);
      setTimeout(100);
      dispatcher.resume()
    }
  }



  getID(link, callback) {
    if (isYoutube(link)) {
      callback(getYoutubeID(link));
    } else {
      search_video(link, function (id) {
        callback(id);
      });
    };
  };

  isYoutube(link) {
    return link.toLowerCase().indexOf("youtube.com/watch?v=") > -1;
  };

  search_video(query, callback) {
    request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + youtube_api_key, function (error, response, body) {
      var json = JSON.parse(body);
      if (!json.items[0]) callback("tkm8qRRoQIM");
      else {
        callback(json.items[0].id.videoId);
      };
    });
  };

  addQueue(linkID) {
    if (isYoutube(linkID)) {
      queue.push(getID(linkID));
    } else {
      queue.push(linkID);
    };
  };

  skip_song(message) {
    dispatcher.end();
    if (queue.length > 1) {
      playMusic(queue[0].message);
    }
  }

  playMusic(id, message) {
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



  GenRandomGIF() {
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
}

