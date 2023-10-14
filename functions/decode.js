require("dotenv").config();
const url = process.env.API_URL;
const { toDiscordChat, toReplyUser } = require("../functions/toDiscord.js");
const { toWeb } = require("../functions/toWeb.js");
const dev_web_url = process.env.DEV_WEB_URL;
const web_url = process.env.WEB_URL;

async function decodes(data, ms , messageID) {
	try {
		//decode base64 and retun it
		const decode = atob(data);
		if (decode.length > 1950) {
			//key is the ouput we are passing to toweb func
			let key = toWeb(decode);
			//toDiscordChat(dev_web_url + key )
			toReplyUser(web_url + key, messageID);
		} else if (decode) {
			//toDiscordChat("```\n" + decode + "\n```")
			toReplyUser(decode , ms , messageID);
		} else {
			//toDiscordChat("```\n" + "empty output, but do not have any errors to report." + "\n```")
			toReplyUser("empty output, but do not have any errors to report.",messageID);
		}
	} catch (error) {
		//axios
		if (error.response) {
			toReplyUser("https://http.cat/" + error.response.status, messageID);
		}
		//axios
		else if (error.request) {
			// The request was made but no response was received
			// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
			// http.ClientRequest in node.js
			console.log(error.request);
			//toDiscordChat(error.request)
			toReplyUser(error.request, messageID);
		} else {
			console.log(error);
			toReplyUser(error, messageID);
		}
	}
}

async function decodesthread(data, ms , message) {
	try {
		//decode base64 and retun it
		const decode = atob(data);
		if (decode.length > 1950) {
			//key is the ouput we are passing to toweb func
			let key = toWeb(decode);
			//toDiscordChat(dev_web_url + key )
			message.rely(web_url + key)
		} else if (decode) {
			//toDiscordChat("```\n" + decode + "\n```")
			//			toReplyUser(decode , ms , messageID);
            message.reply("```\n" + "Result: " + decode + "Time taken: " + ms +"ms" + "\n```")
		} else {
            message.reply("empty output, but do not have any errors to report.")
		}
	} catch (error) {
		//axios
		if (error.response) {
            message/reply("https://http.cat/" + error.response.status)
		}
		//axios
		else if (error.request) {
			// The request was made but no response was received
			// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
			// http.ClientRequest in node.js
			console.log(error.request);
			//toDiscordChat(error.request)
			message.reply(error.request)
		} else {
			console.log(error);
			message.reply(error)
		}
	}
}

module.exports = { decodes , decodesthread };
