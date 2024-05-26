const { SlashCommandBuilder } = require('discord.js');
const { changeaccount, getrobloxid, getgroupinfo } = require('../rbxaccounthandler.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('getuserid')
		.setDescription(`Get someone's user id on roblox.`)
		.addStringOption(option =>
			option.setName('user')
				.setDescription('User')
				.setRequired(true)),
	async execute(client, interaction) {
		changeaccount(interaction.guild.id).then((response) => {
			if (response == null) return interaction.reply({ content: 'Error: This guild has not been assigned a group/token.', components: [] })
			if (response.success == false) return interaction.reply({ content: `Failed to login to roblox account: \`\`\`${response.error}\`\`\``, components: [] })
			const username = interaction.options.get('user').value;
			getrobloxid(username, interaction).then((moduleresponse) => {
				if (moduleresponse.success === false) return interaction.reply({ content: `\`\`\`${moduleresponse.error}\`\`\``, components: [] })
				const id = String(moduleresponse.user);

				interaction.reply({ content: `${username}'s UserId is ${id}` })
			});
		});
	},
};
