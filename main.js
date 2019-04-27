const discord = require('discord.js');
const fs = require('fs');
var config = JSON.parse(fs.readFileSync('./settings.json', 'UTF-8'));
const client = new discord.Client();
const music = require("./music");
const giphy = require("./giphy");

const discord_token = config.discord_token;
const bot_controller = config.bot_controller;
const prefix = config.prefix;


var queue = [];
var isPlaying = false;
var dispatcher = null;
var voiceChannel = null;

client.login(discord_token);
client.on('ready', function () {
  console.log("I'm Ready!");
});

client.on('message', function (message) {
  const member = message.member;
  const originalString = message.content;
  const string = message.content.toLowerCase();
  const argument = message.content.split(' ').slice(1).join(' ');
  console.log(argument);

  switch(string.startsWith(prefix+ command)){
    case "play": break;
    case "stop": break;
    case "pause": break;
    case "resume": break;
    case "skip": break;
    case "leave": break;
    case "ping": break;
    case "giphy": break;
    case "steam": break;
    
  }

  if (string.startsWith(prefix + 'play')) {
    if (member.voiceChannel) {
      if (queue.length > 0 || isPlaying) {
        getID(argument, function (id) {
          addQueue(id);
          youtubeInfo(id, function (err, videoinfo) {
            if (err) {
              throw err;
            } else {
              message.reply('```ini\n [Added: | ' + videoinfo.title + ' | to queue!]```');
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
  } else if (string.startsWith(prefix + 'skip')) {
    skip_song(message);
    message.reply('```ini\n [Song skipped!]```')
  } else if (string.startsWith(prefix + 'leave')) {
    dispatcher.end();
    message.member.voiceChannel.leave();
  } else if (string.startsWith(prefix + 'ping')) {
    message.reply(Date.now() - message.createdTimestamp + ' ms');
  } else if (string.startsWith(prefix + 'pause')) {
    dispatcher.pause();
  } else if (string.startsWith(prefix + 'resume')) {
    dispatcher.resume();
  } else if (string.startsWith(prefix + 'stop')) {
    dispatcher.end();
    message.member.voiceChannel.leave();
  } else if (string.startsWith(prefix + 'test')) {
    message.reply(message.author)
      .then(msg => console.log(`Sent a reply to ${msg.author}`))
      .catch(console.error);
  } else if (string.startsWith(prefix + 'giphy')) {
  } else if (string.startsWith(prefix + 'steam')) {

  }
});