const MidiWriter = require('midi-writer-js');
const { exec } = require('child_process');
const tools = require('./tools.js');
const fs = require('fs');

module.exports = {
	name: 'merge',
	alias: 'm',
	description: 'Merge multiple tracks in parallel to create a song\n\n' +
		'The new song will preserve each individual track\'s tempo\n' +
		'One track can be used multiple times\n' +
		'*Theoretically* there is no limit to the number of tracks\n' + 
		'This will take a while',
	examples: ['merge {newsong} {track1} {track2}...'],

	async run(msg, args) {
		if (!args) return msg.channel.send('There\'s nothing here');

		const message = await msg.channel.send("Working on it...");
		
		var tracks = [];
		var sheetString = '';

		for (let i = 1; i < args.length; i++) {
			const path = `songs/tracks/${args[i]}.txt`;
			const content = fs.readFileSync(path, 'utf-8').split(' ');
			tracks[i - 1] = tools.getTrack(content.slice(1));
			sheetString += content.join(" ") + '\n';
		}

		for (let i = 0; i < tracks.length; i++) {
			const writer = new MidiWriter.Writer(tracks[i]);
			writer.saveMIDI(`songs/songs/${args[0]}${i}`);
			fs.writeFileSync(`songs/sheets/${args[0]}${i}.txt`, sheetString.trim());

			await new Promise(resolve => setTimeout(resolve, 5000));

			exec(`.\\timidity\\timidity.exe .\\songs\\songs\\${args[0]}${i}.mid -Ow -A400`, (err, stdout, stderr) => {
				if (err)
					return console.log(err);
				console.log(`stdout: ${stdout}\n`);
			});

			await new Promise(resolve => setTimeout(resolve, 5000));
		}
		
		await new Promise(resolve => setTimeout(resolve, 5000));

		let cmd = "ffmpeg ";

		for (let i = 0; i < tracks.length; i++) {
			cmd += `-i .\\songs\\songs\\${args[0]}${i}.wav `;
		}

		cmd += `-filter_complex amix=inputs=${tracks.length}:dropout_transition=0 .\\songs\\songs\\${args[0]}.wav`;

		exec(cmd, (err, stdout, stderr) => {
			if (err)
				return console.log(err);
			console.log(`stdout: ${stdout}\n`);
		});
		
		await new Promise(resolve => setTimeout(resolve, 5000));

		message.delete();
		msg.channel.send(`Merged tracks into song \`${args[0]}\``);
		console.log(`Merged tracks into song \`${args[0]}\``);
	}
};