const axios = require('axios');
const { toDiscordChat } = require("../functions/toDiscord.js");

async function toAPI(lang,code){
    /*  
    cHJpbnQoImhlbGxvIG5vb3QiKQo=
    you take the base 64, and the python string
    echo "${code_in_base64}"|base64 --decode| python3 
    and merge them
    echo "cHJpbnQoImhlbGxvIG5vb3QiKQo="|base64 --decode| python3
    that is your code to send to the API 
    */

    //base64 encoding of code
	const base64 = btoa(code);

    let APIpayload = `cd /root;echo "${base64}"|base64 --decode| ${lang}`;

    //axios post to API
	let url = "https://dev.crunner.vm42.us/";

    let response = await axios.post(url, {
        code: APIpayload,
    });

    /*decode base64 and return */
	const decode = atob(response.data.res);


    toDiscordChat("```\n" + decode + "\n```")


}


module.exports = { toAPI };
