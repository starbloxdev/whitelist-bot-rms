const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	permissions: {
		roles: ['Whitelist Permission'],
		users: [792884837353652264],
	},
	data: new SlashCommandBuilder()
		.setName('cashapp')
		.setDescription('Provides Cashapp payment.')
		.addStringOption(option =>
			option.setName('amount')
				.setDescription('Amount due.')
				.setRequired(true)),
	async execute(client, interaction) {
		const amount = interaction.options.get('amount').value;
		interaction.reply({ content: 'Please send a payment of **' + amount + ' USD** to: http://cash.app/$DirectPOS \n \nOnce paid, please provide us with a screenshot, and wait for confirmation', components: [] });
	},
};