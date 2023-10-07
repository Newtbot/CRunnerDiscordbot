require("dotenv").config();
const { SlashCommandBuilder } = require('@discordjs/builders');
const { toDiscordChat } = require("../functions/toDiscord.js");
const axios = require('axios');
const url = process.env.API_RUNNER_URL;
const dev_url = process.env.DEV_API_RUNNER_URL;



module.exports = {

  data: new SlashCommandBuilder()
    .setName('show-all-runner') // no caps at beginning
    .setDescription('get all runners'),
    async execute(interaction) {        
        try {
            const response = await axios.get(url);
            const runners = response.data.runners.slice(0, 35); // Get the first 10 items
        
            // Create a formatted message
            let message = '```';
            runners.forEach(runner => {
                message += `Name: ${runner.name}, Last Status: ${runner.lastStatus}\n`;
            });
            message += '```';
        
            await interaction.reply({ content: message });
        } 
       catch(error){
            //axios 
            if (error.response)
            {
                //console.log(error.response.data); //html output
                //console.log(error.response.status); //status code 
                //console.log(error.response.headers); //http status header
                //toDiscordChat("https://http.cat/" + error.response.status)
                await interaction.reply("https://http.cat/" + error.response.status)
    
            }
            else{
                console.log(error)
            }

        }

    }
    };
