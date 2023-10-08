const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

  data: new SlashCommandBuilder()
    .setName('show-manager') // no caps at beginning
    .setDescription('send link for manager'),
    async execute(interaction) {        
        try{
            await interaction.reply("https://718it.codeland.us/")
        }
        catch(error){
          console.log(error)
        }


    }
    };
