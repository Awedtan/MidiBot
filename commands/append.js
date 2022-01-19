const fs = require('fs');

module.exports = {
	name: 'append',
	alias: 'a',
	description: 'Append multiple tracks in series to create a new track\n\n' +
		'The new track will take the tempo of the first track\n' +
		'One track can be used multiple times\n' +
		'*Theoretically* there is no limit to the number of tracks',
	examples: ['append {newtrack} {track1} {track2}...'],

	run(msg, args) {
		if (!args) return msg.channel.send('There\'s nothing here');

		let trackString = args[0] + ' ';

		for (let i = 1; i < args.length; i++) {
			const path = `songs/tracks/${args[i]}.txt`
			const content = fs.readFileSync(path, 'utf-8').split(' ');
			if (i == 1)
				trackString += parseInt(content[1]) + ' ';
			trackString += content.slice(2).join(' ') + ' ';
		}

		fs.writeFileSync(`songs/tracks/${args[0]}.txt`, trackString.trim());
		msg.channel.send(`Appended tracks to create track \`${args[0]}\``);
		console.log(`Appended tracks to create track \`${args[0]}\``);
	}
};