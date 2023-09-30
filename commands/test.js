const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  // Slash command data
  data: new SlashCommandBuilder()
    .setName('run-code') // no caps at beginning
    .setDescription('Run the code')
    .addStringOption(option => option.setName('argument').setDescription('Code to run')),
    // set optional player argument 
    async execute(interaction) {        
        await interaction.reply("**Will run code in the future**");

    }
    };
