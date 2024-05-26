const { ActivityType } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const config = require('../config.json');
const { StripIndents } = require('common-tags')
var fs = require("fs");
function getGuildById(ID) {
	return client.guilds.cache.get(config.logsChannel);
}

const startEmbed = new EmbedBuilder()
    .setColor(0xe64f2f)
    .setTitle('DirectPOS Whitelist Manager')
    .setDescription('Starting up DIRECTPOS_WHITELIST_VERS_3.2.7')

    .setTimestamp()
    .setFooter({ text: 'DirectPOS Systems'});

//---------------------------------------------------------------------\\

async function checkboot(client) {
	let rawdata = fs.readFileSync("./memory.json");
	let data = await JSON.parse(rawdata);
	var logchannel = client.channels.cache.get(config.logsChannel)
	if (data.rebooted === true) {
		var channel = client.channels.cache.get(data.channel)

		channel.send({ content: `Bot successfully rebooted.`, embeds: [] })
		logchannel.send({ content: `Bot successfully rebooted.`, embeds: [] })
		data = {
			"rebooted": false,
			"guild": 0,
			"channel": 0
		}
		const raw = await JSON.stringify(data, null, 2);
		await fs.writeFileSync("./memory.json", raw)
	} else {
		logchannel.send({ embeds: [startEmbed] });
	}
}

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		// client.user.setActivity(config.status.text, { type: config.status.type });
		//client.user.setPresence({ activities: [{ name: config.status.text, type: config.status.type }], status: config.status.online });
		client.user.setPresence(
			{
				activities: [
					{
						name: config.status.text,
						type: ActivityType[config.status.type],
					}
				],
				status: config.status.online
			}
		)
		console.log(`Bot started with ${client.users.cache.size} users, In ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds \nServers:
		`)

		client.guilds.cache.forEach(guild => {
			console.log(`- ${guild.name}`)
		})
		checkboot(client)
	},
};
