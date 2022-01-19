const fs = require('fs');

module.exports = {
	name: 'sheet',
	alias: 'sh',
	description: 'Displays the notes in a song',
	examples: ['sheet {song}'],

	async run(msg, args) {
		if (!args) return msg.channel.send('There\'s nothing here');

		const path = `songs/sheets/${args}0.txt`;
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