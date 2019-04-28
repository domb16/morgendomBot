import { Client } from 'discord.js';
import { readFileSync } from 'fs';
import coms from "./commands";
import giphy from "./giphy";

var config = JSON.parse(readFileSync('./settings.json', 'UTF-8'));
const client = new Client();
const discord_token = config.discord_token;
const bot_controller = config.bot_controller;
const prefix = config.prefix;


client.login(discord_token);
client.on('ready', function () {
  console.log("I'm Ready!");
});

client.on('message', function (message) {
  const member = message.member;
  const originalString = message.content;
  const bot_msg = message.content.toLowerCase();
  const argument = message.content.split(' ').slice(1).join(' ');
  console.log(argument);

  switch(bot_msg.startsWith(prefix+ argument)){
    case "play": break;
    case "pause": break;
    case "resume": break;
    case "skip": break;
    case "leave" || "stop": break;
    case "ping": break;
    case "giphy": break;
    case "steam": break;
    
  }

 
  if (bot_msg.startsWith(prefix + 'test')) {
    message.reply(message.author)
      .then(msg => console.log(`Sent a reply to ${msg.author}`))
      .catch(console.error);
  } else if (string.startsWith(prefix + 'giphy')) {
  } else if (string.startsWith(prefix + 'steam')) {

  }
});