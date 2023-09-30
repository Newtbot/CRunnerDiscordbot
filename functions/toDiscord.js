require('dotenv').config();
const serverID = process.env.GUILD_ID;
const channel_ID = process.env.CHANNEL_ID;
const { client } = require('../modules/discordBot');


function timeOut(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let msgList = [];
let msgListUnmodified = [];
let timeOutActivated = false;
let dupeCount = 0;

async function send(fullmsg) {
  try {
    await client.guilds.cache.get(serverID).channels.cache.get(channel_ID).send({
      content: fullmsg,
    });
  } catch (error) {
    console.log(error);
  }
}

async function sendEmbed(msg) {
  try {
    await client.guilds.cache.get(serverID).channels.cache.get(channel_ID).send({
      embeds: [msg],
    });
  } catch (error) {
    console.log(error);
  }
}

function toDiscordChat(msg) {
  let fullmsg;
  if (typeof msg === "object") {
    console.log("msg is MessageEmbed");
    return sendEmbed(msg);
  }

  console.log(msg);
  msgList.push(msg);
  msgListUnmodified.push(msg);

  //if message after other message is the same remove duplicate message
  if (msgList.length > 1 && msgListUnmodified[msgList.length - 1] === msgListUnmodified[msgList.length - 2]) {
    dupeCount++;
    msgList[msgList.length - 2] = msgListUnmodified[msgList.length - 2] + `[x${dupeCount + 1}]`;
    msgList.pop();
  } else {
    dupeCount = 0;
  }

  //send once its 5 messages
  if (msgList.length >= 5) {
    fullmsg = msgList.join(`\n`);
    msgList = [];
    msgListUnmodified = [];
    return send(fullmsg);
  }
  //if 3 seconds passed send it anyway
  else if (!timeOutActivated) {
    timeOutActivated = true;
    timeOut(2500).then(() => {
      if (msgList.length > 0) {
        fullmsg = msgList.join(`\n`);
        timeOutActivated = false;
        msgList = [];
        msgListUnmodified = [];
        return send(fullmsg);
      } else {
        timeOutActivated = false;
      }
    });
  }
}

module.exports = { toDiscordChat };
