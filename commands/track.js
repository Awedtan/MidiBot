const fs = require('fs');

module.exports = {
	name: 'track',
	alias: 't',
	description: 'Saves as a track\n\n' +
		'Format:\n' +
		'\`track {name} {tempo} {instrument} length[pitch,pitch] length[pitch,pitch]c\`\n\n' +
		'\`c\` after notes indicates it is to be played as a chord\n' +
		'Once an instrument is set, it will continue to be used afterwards\n' +
		'Instrument defaults to piano\n' +
		'No flats, only sharps\n',
	examples: ['track hotcrossbuns 120 4[e4,d4] 2[c4] flute 4[e4,d4] 2[c4] harp 8[c4,c4,c4,c4] distortedguitar 8[d4,d4,d4,d4] 4[e4,d4] violin 1[c4,e4,g4]c'],

	run(msg, args) {
		if (!args) return msg.channel.send('There\'s nothing here');
		
		const text = args.join(' ');
		fs.writeFileSync(`songs/tracks/${args[0]}.txt`, text);
		msg.channel.send(`Created track \`${args[0]}\``);
		console.log(`Created track \`${args[0]}\``);
	}
};