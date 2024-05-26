const { SlashCommandBuilder } = require('discord.js');
const Products = require('../Products.json');
var IntTable = []
for (const Producti in Products) {
	IntTable.push({ name: String(Products[Producti].ChoiceName), value: String(Producti) })
}

module.exports = {
	permissions: {
		roles: ['Whitelist Permission'],
		users: [792884837353652264],
	},
	data: new SlashCommandBuilder()
		.setName('robux')
		.setDescription('Provides robux payment.')
		.addStringOption(option =>
			option.setName('link')
			.setDescription('Item to purchase')
			.setRequired(true)
			.addChoices(...IntTable)
			),
	async execute(client, interaction) {
		const link = interaction.options.get('link').value;
		if (!Products[link]) return interaction.reply({ content: `Error: Product not found.`, components: [] })
		const whitelist = Products[link].Whitelist
		const productname = Products[link].Name
		if (Products[link].Guild !== interaction.guild.id) return interaction.reply({ content: `Error: Unable to handle ${productname} whitelist in this server.`, components: [] })
		
		const linkt = `https://www.roblox.com/catalog/${link}/link`
		interaction.reply({ content: 'Please purchase the following gamepass(es) \n \n' + linkt + ' \n \n Run /claimproducts once you have purchased the gamepass.', components: [] });
	},
};