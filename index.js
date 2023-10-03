require("dotenv").config();
const { client, commands } = require("./modules/discordBot.js");
const discordbothandler = require("./modules/DiscordBotHandler.js")



/*Move commandhandler to discordbot handler */

//call the function DiscordbotHandler
discordbothandler.start()

client.login(process.env.TOKEN)
