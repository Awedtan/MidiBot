const MidiWriter = require('midi-writer-js');
const { exec } = require('child_process');
const tools = require('./tools.js');
const fs = require('fs');

module.exports = {
	name: 'sing',
	alias: 's',
	description: 'Sings a track\n\n' +
		'Format:\n' +
		'\`sing {tempo} {instrument} length[pitch,pitch] length[pitch,pitch]c\`\n\n' +
		'\`sing {track}\`\n\n' +
		'\`c\` after notes indicates it is to be played as a chord\n' +
		'Once an instrument is set, it will continue to be used afterwards\n' +
		'Instrument defaults to piano\n' +
		'No flats, only sharps\n'+
		'Rests must be in their own group and do not stack with one another',
	examples: ['sing 120 4[e4,d4] 2[c4] flute 4[e4,d4] 2[c4] harp 8[c4,c4,c4,c4] distortedguitar 8[d4,d4,d4,d4] 4[e4,d4] violin 1[c4,e4,g4]c'],

	async run(msg, args) {
		if (!args) return msg.channel.send('There\'s nothing here');
		const voiceChannel = msg.member.voice.channel;
		if (!voiceChannel) return msg.channel.send('You need to be in a voice channel to use that');
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) return msg.channel.send('I don\'t have permission to speak in your voice channel');

		const path = `songs/tracks/${args.join(' ')}.txt`;
		
		if (fs.existsSync(path)) {
			const content = fs.readFileSync(path, 'utf-8');
			const values = content.split(' ');
			const name = values.shift();
			const track = tools.getTrack(values);
			const writer = new MidiWriter.Writer(track);

			writer.saveMIDI('songs/song');

			await new Promise(resolve => setTimeout(resolve, 500));

			exec(`.\\timidity\\timidity.exe .\\songs\\song.mid -Ow -A400`, (err, stdout, stderr) => {
				if (err)
					return console.log(err);
				console.log(`stdout: ${stdout}\n`);
			});

			await new Promise(resolve => setTimeout(resolve, 1000));

			tools.joinChannel(msg, `songs/song.wav`);
			msg.channel.send(`Now singing ${name}`);
			console.log(`Now singing ${name}`);
		} else {
			var track = tools.getTrack(args);
			const writer = new MidiWriter.Writer(track);
			writer.saveMIDI('songs/song');

			await new Promise(resolve => setTimeout(resolve, 500));

			exec(`.\\timidity\\timidity.exe .\\songs\\song.mid -Ow -A400`, (err, stdout, stderr) => {
				if (err)
					return console.log(err);
				console.log(`stdout: ${stdout}\n`);
			});

			await new Promise(resolve => setTimeout(resolve, 500));

			tools.joinChannel(msg, `songs/song.wav`);
			msg.channel.send(`Now singing a song by \`${msg.author.username}\``);
			console.log(`Now singing a song by \`${msg.author.username}\``);
		}
	}
};