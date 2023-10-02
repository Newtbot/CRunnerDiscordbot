const { SlashCommandBuilder } = require('@discordjs/builders');
const { toDiscordChat } = require("../functions/toDiscord.js");
let AcceptedLang = ["javascript"]

module.exports = {
  /*
  interpreters = {
        javascript': 'echo "${code_in_base64}"|base64 --decode| node',
        python': 'echo "${code_in_base64}"|base64 --decode| python3,
        c': 'echo "${code_in_base64}"|base64 --decode| gcc -xc -o run1 - && ./run1,
        bash': 'echo "${code_in_base64}"|base64 --decode| bash,
  }
   */
  data: new SlashCommandBuilder()
    .setName('show-all-langauge') // no caps at beginning
    .setDescription('Show all accepted language'),
    async execute(interaction) {        
        try{
            await interaction.reply("Javascript: node | python: python3 | C:  gcc -xc -o run1 - && ./run1 | bash: bash")
        }
        catch(error){
          console.log(error)
        }


    }
    };
