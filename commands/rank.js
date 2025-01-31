/* eslint-disable max-nested-callbacks */
const { SlashCommandBuilder } = require('discord.js');
const noblox = require('noblox.js');
const { changeaccount, getrobloxid } = require('../rbxaccounthandler.js');
const { logaction } = require('../commandlog.js');

module.exports = {
	permissions: {
		roles: ['Whitelist Permission'],
		users: [792884837353652264],
	},
	data: new SlashCommandBuilder()
		.setName('rank')
		.setDescription('Changes the rank of a ROBLOX user.')
		.addStringOption(option =>
			option.setName('username')
				.setDescription('Roblox Username')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('rank')
				.setDescription('Name of the rank')
				.setRequired(true)),
	async execute(client, interaction) {

		changeaccount(interaction.guild.id).then((response) => {
			if (response == null) return interaction.reply({ content: 'Error: This guild has not been assigned a group/token.', components: [] })
			if (response.success == false) return interaction.reply({ content: `Failed to login to roblox account: \`\`\`${response.error}\`\`\``, components: [] })
			const rank = interaction.options.get('rank').value;
			const username = interaction.options.get('username').value;
			const speaker = interaction.member;
			getrobloxid(username, interaction).then((moduleresponse) => {
				if (moduleresponse.success === false) return interaction.reply({ content: '**Error** ' + moduleresponse.error, components: [] })
				const targetid = moduleresponse.user;
				getrobloxid('<@' + speaker.id + '>', interaction).then((moduleresponse2) => {
					if (moduleresponse2.success === false) return interaction.reply({ content: '**Error** ' + moduleresponse2.error, components: [] })
					const speakerid = moduleresponse2.user;
					noblox.getRankInGroup(response.group, Number(speakerid)).then((speakerrank) => {
						noblox.getRankInGroup(response.group, Number(targetid)).then((targetrank) => {
							if (speakerrank === targetrank || speakerrank < targetrank) return interaction.reply({ content: `Failed to change ${username}'s rank to \`${rank}\` \`\`\`Error: 403-B You do not have permission to manage this member.\`\`\``, components: [] }).then(setTimeout(() => interaction.deleteReply(), 10000));
							noblox.getRoles(response.group).then((res44) => {
								let roleid = null;
								const searching = rank;
								for (const i in res44) {
									if (res44[i].name === searching) {
										roleid = res44[i].rank;
									}
								}
								logaction(interaction.member,"Ranked "+String(username)+" "+targetid+" to "+rank)
								if (roleid == null) return interaction.reply({ content: 'Failed to find ROBLOX rank, did you enter the correct rank name?', components: [] })
								if (speakerrank === Number(roleid) || speakerrank < Number(roleid)) return interaction.reply({ content: `Failed to change \`${username}'s\` rank to \`${rank}\` \`\`\`Error:  You do not have permission to assign this role.\`\`\``, components: [] }).then(setTimeout(() => interaction.deleteReply(), 10000));
								noblox.setRank({ group: response.group, target: Number(targetid), rank: Number(roleid) }).then((nobloxres) => {
									if (nobloxres) {
										interaction.reply({ content: 'Successfully changed ' + username + '\'s rank to `' + rank + '`', components: [] });
									}
									else {
										throw 'Did not recieve expected response from API.';
									}
								}).catch(function(e) {
									return interaction.reply({ content: `Failed to change ${username}'s rank to \`${rank}\` \`\`\`${e}\`\`\``, components: [] })
								});
							});
						});
					});
				});
			});
		});
	},
};