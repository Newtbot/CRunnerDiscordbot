const axios = require("axios");
require("dotenv").config();
const url = process.env.API_URL;
const dev_url = process.env.DEV_API_URL;
const { toDiscordChat, toReplyUser } = require("../functions/toDiscord.js");
const { decodes , decodesthread } = require("../functions/decode.js");

async function toAPI(lang, code, messageID) {
	try {
		//base64 encoding of code
		const base64 = btoa(code);

		let APIpayload = `cd /root;echo "${base64}"|base64 --decode| ${lang}`;

		let response = await axios.post(url, {
			code: APIpayload,
		});
		/*
        pass res to another function to seperate logic and api  
        */
		let data = response.data.res;
		decodes(data, messageID);
	} catch (error) {
		if (error.response) {
			toDiscordChat("https://http.cat/" + error.response.status);
		} else if (error.request) {
			// The request was made but no response was received
			// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
			// http.ClientRequest in node.js
			console.log(error.request);
		} else {
			console.log(error);
		}
	}
}

//thread toapi
async function toThreadAPI(lang , code , message){
    try {
		//base64 encoding of code
		const base64 = btoa(code);

		let APIpayload = `cd /root;echo "${base64}"|base64 --decode| ${lang}`;

		let response = await axios.post(url, {
			code: APIpayload,
		});
		/*
        pass res to another function to seperate logic and api  
        */
		let data = response.data.res;
		decodesthread(data, message);

	} catch (error) {
		if (error.response) {
			toDiscordChat("https://http.cat/" + error.response.status);
		} else if (error.request) {
			// The request was made but no response was received
			// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
			// http.ClientRequest in node.js
			console.log(error.request);
		} else {
			console.log(error);
		}
	}

}

module.exports = { toAPI , toThreadAPI };
