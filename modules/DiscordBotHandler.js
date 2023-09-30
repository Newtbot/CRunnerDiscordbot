require("dotenv").config();
const { client, commands } = require("./discordBot.js");
const discordEventHandler = require("./discordEventHandler");
const { commandshandler } = require("./commandhandler.js");
const { toDiscordChat } = require("../functions/toDiscord.js");


async function start() {
		// Discord event handler
		const discordHandler = new discordEventHandler(client);
		discordHandler.loadEvents();

		//clear discordbot cache
		client.commands.clear();

		// Discord command handler
		commandshandler(client);
	}


module.exports = { start };
