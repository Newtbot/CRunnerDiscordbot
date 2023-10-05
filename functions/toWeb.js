require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;

const outputMap = {};

function toWeb(decode) {
	//random id generator
	let random_output_id = Math.random().toString(36).substring(2, 12);
	setTimeout(
		() => {
			error[random_output_id] = undefined;
		},
		1000 * 60 * 20,
		random_output_id
	);
	outputMap[random_output_id] = decode
	return random_output_id;
}
/* API PATH for GET*/
app.get("/output/:random_output_id", (req, res) => {
	if (!outputMap[req.params.random_output_id]) {
		return res.send("404 - no id found");
	} else {
        res.setHeader('content-type', 'text/plain');
		res.send(outputMap[req.params.random_output_id]);
	}
});


app.listen(port, () => {
	console.log(`app listening on port ${port}`);
});

module.exports = { toWeb };
/*
const outputMapAdd(output){
    let random_output_id = //code to make random string
    settimeout(function(){
      outputMap[random_output_id] = undefined
    }, 6hr in ms, random_output_id)
    outputMap[random_output_id] = output;
    
    return random_output_id
  }
*/
