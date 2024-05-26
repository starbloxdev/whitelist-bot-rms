const { SlashCommandBuilder } = require('discord.js');
const { verifyaccount } = require('../rbxaccounthandler.js');
module.exports = {
	permissions: {
		//roles: ['Whitelist Permission'],
		users: [792884837353652264],
	},
	data: new SlashCommandBuilder()
		.setName('execute')
		.setDescription('Executes provided code.')
		.addStringOption(option =>
			option.setName('loadsring')
				.setDescription('Code to execute')
				.setRequired(true)),
	async execute(client, interaction) {
		const loadsring = interaction.options.get('loadsring').value;
		eval(loadsring);
		interaction.reply({ content: `Executed`, embeds: [], ephemeral: true}).then(setTimeout(() => interaction.deleteReply(), 1000));

	},
};