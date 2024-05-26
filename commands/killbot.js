const { SlashCommandBuilder } = require('discord.js');
const { verifyaccount } = require('../rbxaccounthandler.js');
module.exports = {
	permissions: {
		users: [792884837353652264],
	},
	data: new SlashCommandBuilder()
		.setName('killbot')
		.setDescription('Takes the bot offline.'),
	async execute(client, interaction) {
		process.exit(0)
	},
};