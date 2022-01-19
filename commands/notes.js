const fs = require('fs');

module.exports = {
	name: 'notes',
	alias: 'n',
	description: 'Displays the notes in a track',
	examples: ['notes {track}'],

	async run(msg, args) {
		if (!args) return msg.channel.send('There\'s nothing here');

		const path = `songs/tracks/${args}.txt`;
		const content = fs.readFileSync(path, 'utf-8');
		if (content.length < 2000) {
			msg.channel.send(content);
		}
		else {
			msg.channel.send({ files: [path] });
		}

		console.log(`Displayed ${args}'s notes`);
	}
};