const fs = require('fs');
const path = require('path');
const { client } = require('./discordBot.js');

class DiscordEventHandler {
  constructor(client) {
    this.client = client;
    this.EventsPath = path.join(__dirname, '../event/discordEvent');
    this.EventFiles = fs
      .readdirSync(this.EventsPath)
      .filter((file) => file.endsWith('.js'));
  }

  loadEvents() {
    const eventsPath = path.join(__dirname, '../event/discordEvent');
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
      const event = require(path.join(eventsPath, file));
      if (event.name && event.execute) {
        if (event.name === 'messageCreate') {
          client.on(event.name, (message, ...args) => event.execute(this.client, message, ...args)); // Pass the 'mcBot' instance and message here
        } else {
          client.on(event.name, (...args) => event.execute(client, ...args)); // Pass the 'client' object for other events
        }
        //console.log(`Loaded event ${event.name}`);
      }
      if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args)); // Pass the 'client' object here for once events
      }
    }
  } 
}
module.exports = DiscordEventHandler;
