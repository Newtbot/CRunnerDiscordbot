require("dotenv").config();
const url = process.env.API_URL;
const dev_url = process.env.DEV_API_URL;
const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require("axios");
const { toDiscordChat } = require("../functions/toDiscord.js");


module.exports = {
	// Slash command data
	data: new SlashCommandBuilder()
		.setName("run-code") // no caps at beginning
		.setDescription("Run the code")
		.addStringOption((option) =>
			option
				.setName("langauge")
				.setDescription("language to use")
				.setRequired(true)
		)
		.addStringOption((option) =>
			option.setName("argument").setDescription("Code to run")
		),
	async execute(interaction) {
		/*  
        cHJpbnQoImhlbGxvIG5vb3QiKQo=
        you take the base 64, and the python string
        echo "${code_in_base64}"|base64 --decode| python3 
        and merge them
        echo "cHJpbnQoImhlbGxvIG5vb3QiKQo="|base64 --decode| python3
        that is your code to send to the API 
        */
		const LangMAP = [
			{py : "python3"},
			{js : "node"},
			{c : "gcc -xc -o run1 - && ./run1"},
			{bash : "bash"}
		]

		try {
			let code = interaction.options.getString("argument");
			let lang = interaction.options.getString("langauge");

			const langMap = new Map();

			LangMAP.forEach(entry => {
				const key = Object.keys(entry)[0] //py
				const value = entry[key]; // Get the corresponding value accordingly like py -> python3
				langMap.set(key, value); // Add the entry to the Map

			})

			lang = (langMap.get(hasRegex[1])) //python3
			console.log(lang)
			
			//base64 encoding of code
			const base64 = btoa(code);

			let APIpayload = `cd /root;echo "${base64}"|base64 --decode| ${lang}`;
			//axios post to API

			let response = await axios.post(url, {
				code: APIpayload,
			});

			/*decode base64 and return */
			const decode = atob(response.data.res);
			//toDiscordChat(decode)
			await interaction.reply("```\n" + decode + "\n```");

			//await
		} catch(error){
			if (error.response)
			{
				//console.log(error.response.data); //html output
				//console.log(error.response.status); //status code 
				//console.log(error.response.headers); //http status header
				toDiscordChat("Error Code: " + error.response.status)
				toDiscordChat(error.response.statusText)
	
			}
			else if (error.request) {
				// The request was made but no response was received
				// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
				// http.ClientRequest in node.js
				console.log(error.request);
				toDiscordChat(error.request)
			}
			else {
					console.log(error)
					toDiscordChat(error)
			}
	
		}
	}
};
