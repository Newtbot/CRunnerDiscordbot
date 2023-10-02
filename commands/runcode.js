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
		//await interaction.reply("**Will run code in the future**");
		/* curl https://dev.crunner.vm42.us/ -X POST -d '{"code": "echo 'hi'"}' */

		/* To do 
        1) add options for programming options
        2) pass args accordingly
        */

		/*  
        cHJpbnQoImhlbGxvIG5vb3QiKQo=
        you take the base 64, and the python string
        echo "${code_in_base64}"|base64 --decode| python3 
        and merge them
        echo "cHJpbnQoImhlbGxvIG5vb3QiKQo="|base64 --decode| python3
        that is your code to send to the API 
        */

		try {
			let code = interaction.options.getString("argument");
			let lang = interaction.options.getString("langauge");

			//base64 encoding of code
			const base64 = btoa(code);

			let APIpayload = `echo "${base64}"|base64 --decode| ${lang}`;
			//axios post to API
			let url = "https://dev.crunner.vm42.us/";

			let response = await axios.post(url, {
				code: APIpayload,
			});

			/*decode base64 and return */
			const decode = atob(response.data.res);
			//toDiscordChat(decode)
			await interaction.reply(decode);

			//await
		} catch (error) {
			console.log(error);
		}
	},
};
