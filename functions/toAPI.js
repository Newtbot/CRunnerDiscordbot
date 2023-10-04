const axios = require('axios');
require("dotenv").config();
const url = process.env.API_URL;
const dev_url = process.env.DEV_API_URL;
const web_url = process.env.WEB_URL;
const dev_web_url = process.env.DEV_WEB_URL;
const { toDiscordChat , toReplyUser } = require("../functions/toDiscord.js");
const { toWeb } = require("../functions/toWeb.js");



async function toAPI(lang,code,messageID){
    /*  
    cHJpbnQoImhlbGxvIG5vb3QiKQo=
    you take the base 64, and the python string
    echo "${code_in_base64}"|base64 --decode| python3 
    and merge them
    echo "cHJpbnQoImhlbGxvIG5vb3QiKQo="|base64 --decode| python3
    that is your code to send to the API 
    */
    try{
    //base64 encoding of code
	const base64 = btoa(code);

    let APIpayload = `cd /root;echo "${base64}"|base64 --decode| ${lang}`;

    //axios post to API

    let response = await axios.post(url, {
        code: APIpayload,
    });

    /*decode base64 and return */
	const decode = atob(response.data.res);
    if (decode.includes("<@745387617239040001>")){
        //toDiscordChat(decode)
        toReplyUser(decode , messageID)
    }
    else if (decode.length > 1950)
    {
        let key = toWeb(decode)
        //toDiscordChat(dev_web_url + key )
        toReplyUser(web_url + key , messageID)
    }
    else if (decode){
    //toDiscordChat("```\n" + decode + "\n```")
    toReplyUser(decode , messageID)
    }
    //empty res 
    else{
        //toDiscordChat("```\n" + "empty output, but do not have any errors to report." + "\n```")
        toReplyUser("```\n" + "empty output, but do not have any errors to report." + "\n```" , messageID)

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
            toReplyUser("https://http.cat/" + error.response.status , messageID)

        }
        //axios 
        else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
            console.log(error.request);
            //toDiscordChat(error.request)
            toReplyUser(error.request , messageID)
        }
        else {
                console.log(error)
                toReplyUser(error , messageID)
        }
    }
}


module.exports = { toAPI };
