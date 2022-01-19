const { MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports = {
	name: 'displaysongs',
	alias: 'ds',
	description: 'Displays all the songs',
	examples: ['displaysongs'],

	async run(msg, args) {

		const files = fs.readdirSync('songs/songs').filter(file => file.endsWith('.wav'));
		var songs = [];
		for (const file of files)
			songs.push(file);

		if (songs.length == 0)
			return msg.channel.send('There aren\'t any songs right now, you can help change that!');

		const embed = new MessageEmbed()
			.addFields(
				{ name: 'Songs', value: songs, inline: false }
			);
		msg.channel.send(embed);
		console.log('Song list sent');
	}
};