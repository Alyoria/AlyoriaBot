const { Client, GatewayIntentBits, Partials } = require("discord.js");
const Logger = require('./utils/logger.js');
const Config = require('./config/config');

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
    }

    async start() {
        try {
            this.logger.clear();
            this.logger.info(`Connecting to Discord...`);

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
