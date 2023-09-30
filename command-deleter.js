require('dotenv').config();
const {
	Client,
	GatewayIntentBits,
	Partials,
	Collection,
} = require("discord.js");
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
    allowedMentions: { parse: [] },
});
// init discord client 
client.commands = new Collection();
const commandName = 'test'; // Replace with the name of the command you want to get the ID of
const token = process.env.DISCORD_TOKEN;


async function deleteCommand() {
  // Assuming you already have a command object with the ID of the command you want to delete
  const commandId = '1093833892340977725';

  try {
    const deletedCommand = await client.application.commands.delete(commandId);
    console.log(`Command ${deletedCommand.name} (${deletedCommand.id}) deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting command: ${error}`);
  }
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  deleteCommand();
});

client.login();
