const { SlashCommandBuilder } = require('@discordjs/builders');
const { toDiscordChat } = require("../functions/toDiscord.js");

module.exports = {

  data: new SlashCommandBuilder()
    .setName('reboot-crunner') // no caps at beginning
    .setDescription('reboots the crunenr bot'),
    async execute(interaction) {        
        try{
            await interaction.reply("**rebooting the discord bot!**")
            process.exit()
        }
        catch(error){
          console.log(error)
        }


    }
    };
