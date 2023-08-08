const { SlashCommandBuilder } = require("discord.js");

const apelidos = ["Borboleto", "Calabreso", "Fanto Laranjo", "Caga tronco"];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("apelido")
    .setDescription("Manda um apelido aleatório usado pelo Toninho!"),
  async execute(interaction) {
    const randomApelido = apelidos[Math.floor(Math.random() * apelidos.length)];

    await interaction.reply(`E aí, ${randomApelido}`);
  },
};
