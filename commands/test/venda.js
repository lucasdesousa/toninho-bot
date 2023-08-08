const fs = require("node:fs");
const path = require("node:path");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("venda")
    .setDescription("Cria uma nova venda no nome do Toninho!")
    .addIntegerOption((option) =>
      option
        .setName("quantidade")
        .setDescription("Quantidade")
        .setRequired(true)
    ),
  async execute(interaction) {
    const quantidade = interaction.options.getInteger("quantidade");
    const user = interaction.user.username;
    let userVendas = 0;

    const mainPath = path.join(__dirname, "database.json");
    const file = fs.readFileSync(mainPath, "utf8");
    const jsonContent = JSON.parse(file);

    jsonContent.total = jsonContent.total + quantidade;
    jsonContent.vendas.push({
      user,
      quantidade,
    });

    jsonContent.vendas.forEach((venda) => {
      if (venda.user == user) userVendas += venda.quantidade;
    });

    fs.writeFileSync(mainPath, JSON.stringify(jsonContent));

    const embed = new EmbedBuilder()
      .setTitle("Venda adicionada")
      .setDescription(`${user} vendeu ${quantidade}`)
      .addFields(
        {
          name: "Vendedor",
          value: `${user}`,
          inline: true,
        },
        {
          name: "Quantidade",
          value: `${quantidade}`,
          inline: true,
        },
        {
          name: "Total do vendedor",
          value: `${userVendas}`,
          inline: true,
        },
        {
          name: "Total da fac",
          value: `${jsonContent.total}`,
          inline: true,
        }
      );

    await interaction.reply({
      embeds: [embed],
    });
  },
};
