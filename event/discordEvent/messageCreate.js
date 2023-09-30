require("dotenv").config();
const channelID = process.env.CHANNEL_ID;
const { toDiscordChat } = require("../../functions/toDiscord.js");

module.exports = {
	name: "messageCreate",
	once: false,
	async execute(message) {
		// Send message to the Minecraft server if the message is not from the bot
		try {
			if (message.user.bot) return;
			//todiscord ?
		} catch (error) {
			console.log(error);
		}
	},
};
