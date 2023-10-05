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
        try{
            if (interaction){
                let response = await axios.get(url)
                let json = JSON.stringify(response.data, null, 2); // 2 spaces for indentation
                await interaction.reply(`\`\`\`json\n${json}\n\`\`\``);
                
            }
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
        }

    }
    };
