const { Client, GatewayIntentBits, Partials, REST, Routes } = require("discord.js");
const fs = require('fs');
const path = require('path');

const Logger = require('./utils/logger.js');
const Config = require('./config/config');

const CommandHandler = require('./handlers/commandHandler.js');
const EventHandler = require('./handlers/eventHandler.js');

class Alyoria {
    constructor() {
        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.GuildInvites,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.MessageContent
            ],
            partials: [
                Partials.Channel,
                Partials.Message,
                Partials.User
            ],
            presence: {
                activities: [{
                    name: Config.PRESENCE.ACTIVITY[0].NAME,
                    type: Config.PRESENCE.ACTIVITY[0].TYPE
                }],
                status: Config.PRESENCE.STATUS
            }
        });
        this.config = Config;
        this.logger = Logger;

        this.commandHandler = new CommandHandler(this.client, this.logger);
        this.eventHandler = new EventHandler(this.client, this.logger);
    }

    async deployCommands() {
        try {
            const commands = [];
            const commandsPath = path.resolve('./src/commands');
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                const command = require(`${commandsPath}/${file}`);
                commands.push(command.data.toJSON());
            }

            const rest = new REST({ version: '10' }).setToken(this.config.CLIENT.TOKEN);

            await rest.put(
                Routes.applicationGuildCommands(this.config.CLIENT.ID, this.config.SUPPORT.ID),
                { body: commands }
            );

            this.logger.info('Successfully deployed commands!');
        } catch (error) {
            this.logger.error(`Error while deploying commands: ${error}`);
        }
    }

    async start() {
        try {
            this.logger.clear();
            this.logger.info(`Connecting to Discord...`);

            await this.deployCommands();

            this.commandHandler.loadCommands('./src/commands');
            this.eventHandler.loadEvents('./src/events');

            await this.client.login(this.config.CLIENT.TOKEN);

            this.logger.info(`${this.client.user.username} is now online!`);
        } catch (err) {
            this.logger.error(err);
        }
    }
}

const bot = new Alyoria();
bot.start();

module.exports = bot;
