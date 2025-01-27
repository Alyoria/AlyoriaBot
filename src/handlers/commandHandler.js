const fs = require('fs');
const path = require('path');
const { Collection } = require('discord.js');

class CommandHandler {
    constructor(client, logger) {
        this.client = client;
        this.logger = logger;

        this.client.commands = new Collection();
    }

    loadCommands(commandsPath) {
        const absolutePath = path.resolve(commandsPath);
        const files = fs.readdirSync(absolutePath).filter(file => file.endsWith('.js'));

        for (const file of files) {
            const command = require(`${absolutePath}/${file}`);
            this.client.commands.set(command.data.name, command);
            
            this.logger.info(`Loaded command: ${command.data.name}`);
          }
    }
}

module.exports = CommandHandler;
