const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	permissions: {
		roles: ['Whitelist Permission'],
		users: [792884837353652264],
	},
	data: new SlashCommandBuilder()
		.setName('paypal')
		.setDescription('Provides Paypal payment.')
		.addStringOption(option =>
			option.setName('amount')
				.setDescription('Amount due.')
				.setRequired(true)),
	async execute(client, interaction) {
		const amount = interaction.options.get('amount').value;
		interaction.reply({ content: 'Please send a payment of **' + amount + ' CAD** to: https://paypal.me/directpos \n**FEES** \n \nRemember to send this as friends / family, if not you will have to cover the fees. \nIf you are converting from another currency, you will have to cover the conversion fee. \n \nOnce paid, send us a screenshot, your first name or the transaction ID.', components: [] });
	},
};