const MidiWriter = require('midi-writer-js');
const { exec } = require('child_process');
const tools = require('./tools.js');
const fs = require('fs');

module.exports = {
	name: 'save',
	alias: 'sv',
	description: 'Saves a track as a song',
	examples: ['save {newsong} {track}'],

	async run(msg, args) {
		if (!args) return msg.channel.send('There\'s nothing here');

		const path = `songs/tracks/${args[0]}.txt`;
		const content = fs.readFileSync(path, 'utf-8').split(' ');
		track = tools.getTrack(content.slice(1));

		const writer = new MidiWriter.Writer(track);
		writer.saveMIDI(`songs/songs/${args[0]}`);
		fs.writeFileSync(`songs/sheets/${args[0]}.txt`, content.join(' '));

		await new Promise(resolve => setTimeout(resolve, 500));

		exec(`.\\timidity\\timidity.exe .\\songs\\songs\\${args[0]}.mid -Ow -A400`, (err, stdout, stderr) => {
			if (err)
				return console.log(err);
			console.log(`stdout: ${stdout}\n`);
		});
		
		await new Promise(resolve => setTimeout(resolve, 500));
		
		msg.channel.send(`Merged tracks into song \`${args[0]}\``);
		console.log(`Merged tracks into song \`${args[0]}\``);
	}
};