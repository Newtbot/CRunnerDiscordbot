module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`The Discord bot ${client.user.tag} is ready!`);
	},
};

