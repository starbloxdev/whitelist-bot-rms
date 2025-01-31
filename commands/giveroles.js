const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { logaction } = require('../commandlog.js');
const Products = require('../Products.json');
var IntTable = []
for (const Producti in Products) {
	IntTable.push({name: String(Products[Producti].ChoiceName), value: String(Producti)})
}
//interaction.guild.roles.cache.find(role => role.name === "Head of Staff").edit({name: "CEO"})
function giverole(member,rolename) {
var role = member.guild.roles.cache.find(role => role.name === rolename);
//if (!role) return;
member.roles.add(role);
}
//var role = interaction.guild.roles.cache.find(role => role.name === "Support Team");
//interaction.member.roles.add(role)
module.exports = {
	permissions: {
		roles: ['Whitelist Permission'],
		users: [792884837353652264],
	},
	data: new SlashCommandBuilder()
		.setName('giveroles')
		.setDescription('Gives roles to buyers.')
		.addMentionableOption(option =>
			option.setName('user')
			.setDescription('User to give roles')
			.setRequired(true)
			)
		.addStringOption(option =>
			option.setName('role')
			.setDescription('Item to purchase')
			.setRequired(true)
			.addChoices(...IntTable)),
	async execute(client, interaction) {
		const productid = interaction.options.get('role').value;
		const memberid = interaction.options.get('user').value;
		const member = interaction.guild.members.cache.get(memberid)

		if (!Products[productid]) return interaction.reply({ content: `Error: Product not found.`, components: [] })
		const role = Products[productid].Role
		const productname = Products[productid].Name
		if (Products[productid].Guild !== interaction.guild.id) return interaction.reply({ content: `Error: Unable to handle ${productname} roles in this server.`, components: [] })

		var name = member.nickname || member.username
		var given = "Customer\n"
		giverole(member,"Customer")

		giverole(member,role)
		given = given + `${role}\n`

		const rolesembed = new EmbedBuilder()
		.setTitle(`Gave ${member.name} roles`)
		.addFields(
			{ name: 'Given Roles', value: `\n\n${given}` }
		)
		
		logaction(client,interaction.member,'Gave '+ '<@' + member.id + '>' +' roles: \n\n'+ given);
		//interaction.reply({ content: 'Gave '+ '<@' + member.id + '>' +' roles: \n\n'+ given, components: [] });
		interaction.reply({ embed: rolesembed })
	},
};
