const { MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports = {
	name: 'displaytracks',
	alias: 'dt',
	description: 'Displays all the tracks',
	examples: ['displaytracks'],

	async run(msg, args) {

		const files = fs.readdirSync('songs/tracks').filter(file => file.endsWith('.txt'));
		var tracks = [];
		for (const file of files)
			tracks.push(file);

		if (tracks.length == 0)
			return msg.channel.send('There aren\'t any tracks right now, you can help change that!');

		const embed = new MessageEmbed()
			.addFields(
				{ name: 'Tracks', value: tracks, inline: false }
			);
		msg.channel.send(embed);
		console.log('Track list sent');
	}
};