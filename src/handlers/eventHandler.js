const fs = require('fs');
const path = require('path');

class EventHandler {
  constructor(client, logger) {
    this.client = client;
    this.logger = logger;
  }

  loadEvents(eventsPath) {
    const absolutePath = path.resolve(eventsPath);
    const eventFiles = fs.readdirSync(absolutePath).filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
      const event = require(`${absolutePath}/${file}`);
      if (event.once) {
        this.client.once(event.name, (...args) => event.execute(...args));
      } else {
        this.client.on(event.name, (...args) => event.execute(...args));
      }
      this.logger.info(`Loaded event: ${event.name}`);
    }
  }
}

module.exports = EventHandler;