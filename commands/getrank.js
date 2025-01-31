const { SlashCommandBuilder } = require('discord.js');
const noblox = require('noblox.js');
const { changeaccount, getrobloxid } = require('../rbxaccounthandler.js');

module.exports = {
	permissions: {
		roles: ['Whitelist Permission'],
		users: [792884837353652264],
	},
	data: new SlashCommandBuilder()
		.setName('getrank')
		.setDescription('Gets the rank of a ROBLOX user.')
		.addStringOption(option =>
			option.setName('username')
				.setDescription('Roblox Username')
				.setRequired(true)),
	async execute(client, interaction) {

		changeaccount(interaction.guild.id).then((response) => {
			if (response == null) return interaction.reply({ content: 'Error: This guild has not been assigned a group/token.', components: [] })
			if (response.success == false) return interaction.reply({ content: `Failed to login to roblox account: \`\`\`${response.error}\`\`\``, components: [] })
			const username = interaction.options.get('username').value;

			getrobloxid(username, interaction).then((moduleresponse) => {
				if (moduleresponse.success === false) return interaction.reply({ content: `Failed to find ${username}'s rank. \`\`\`${moduleresponse.error}\`\`\``, components: [] })
				const id = moduleresponse.user;
				noblox.getRankInGroup(response.group, Number(id)).then((rankid) => {
					if (rankid) {
						noblox.getRankNameInGroup(response.group, Number(id)).then((rankname) => {
							if (rankname) {
								interaction.reply({ content: `${username}'s rank: \`${rankname}\` \`${rankid}\``, components: [] });
							}
							else {
								throw 'Did not recieve expected response from API. Try again later.';
							}
						});
					}
					else {
						throw 'Did not recieve expected response from API.';
					}
				}).catch(function(e) {
					return interaction.reply({ content: `Failed to find ${username}'s rank. \`\`\`${e}\`\`\``, components: [] })
				});
			});
		});
	},
};