const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Tests the whitelist action.'),
	async execute(client, interaction) {
		await interaction.reply(require("fs").writeFileSync("./whitelists/Starter.json", JSON.stringify({Players: {}, Groups: {}})));
	},
};