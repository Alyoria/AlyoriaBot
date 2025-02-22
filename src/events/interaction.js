const { Events } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
      if (!interaction.isCommand()) return;
  
      const command = interaction.client.commands.get(interaction.commandName);
  
      if (!command) return;
  
      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Une erreur s\'est produite lors de l\'exécution de cette commande.', ephemeral: true });
      }
    },
  };