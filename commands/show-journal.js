const { SlashCommandBuilder } = require('@discordjs/builders');
const { toDiscordChat } = require("../functions/toDiscord.js");
const { execSync } = require('child_process');


module.exports = {

  data: new SlashCommandBuilder()
    .setName('show-journal') // no caps at beginning
    .setDescription('shows prod service journal logs'),
    async execute(interaction) {        
        try{
            const journaloutput = execSync('journalctl -u CrunnerDiscordBot.service -n 50', { encoding: 'utf-8' });
            await interaction.reply(journaloutput)
        }
        catch(error){
          console.log(error)
          toDiscordChat(error)
        }


    }
    };



/* 
const { execSync } = require('child_process');
const commandOutput = execSync('tail /var/log/syslog', { encoding: 'utf-8' });
console.log(commandOutput);

*/