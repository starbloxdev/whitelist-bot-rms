const { SlashCommandBuilder } = require('discord.js');
const noblox = require('noblox.js');
const { changeaccount } = require('../rbxaccounthandler.js');

module.exports = {
	permissions: {
		users: [792884837353652264],
	},
	data: new SlashCommandBuilder()
		.setName('shout')
		.setDescription('Changes the ROBLOX group shout.')
		.addStringOption(option =>
			option.setName('shout')
				.setDescription('Text to shout.')
				.setRequired(true)),
	async execute(client, interaction) {

		changeaccount(interaction.guild.id).then((response) => {
			if (response == null) return interaction.reply({ content: 'Error: This guild has not been assigned a group/token.', components: [] })
			if (response.success == false) return interaction.reply({ content: `Failed to login to roblox account: \`\`\`${response.error}\`\`\``, components: [] })
			const shout = interaction.options.get('shout').value;
			noblox.shout(response.group, shout).then((nobloxres) => {
				if (nobloxres) {
					interaction.reply({ content: 'Successfully changed the group shout to `' + shout + '`', components: [] });
				}
				else {
					throw 'Did not recieve expected response from API.';
				}
			}).catch(function(e) {
				return interaction.reply({ content: `Failed to change group shout to \`${shout}\` \`\`\`${e}\`\`\``, components: [] })
			});
		});
	},
};