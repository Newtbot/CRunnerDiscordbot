require('dotenv').config();
// node:fs and node:path are aliases for the built-in modules fs and path
const fs = require('node:fs');
const path = require('node:path');
// discord.js-commando is a command framework for Discord.js
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const token = process.env.TOKEN;
const guildId = process.env.GUILD_ID;
const botId = process.env.BOT_ID;

const commands = [];
// get the path to the command folder
const commandsPath = path.join(__dirname, 'commands');
// read all files in the command folder ending with .js
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	console.log(`Importing command file: ${filePath}`);
	const command = require(filePath);
	console.log(`Imported command: ${command}`);
	console.log(`Imported command data: ${command.data}`);
	commands.push(command.data.toJSON());
  }
  


const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(botId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);