const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'instruments',
	alias: 'i',
	description: 'Displays the instrument list',
	examples: ['instruments [group]'],

	run(msg, args) {
		const groups = ['piano', 'chromaticpercussion', 'organ', 'guitar', 'bass', 'strings', 'ensemble', 'brass', 'reed', 'pipe', 'synthlead', 'synthpad', 'synthfx', 'ethnic', 'percussive', 'sfx'];

		const piano = ['grandpiano', 'brightpiano', 'electricpiano', 'harpsipiano', 'synthpiano', 'synthpiano2', 'harpsichord', 'clavinet'];
		const pitchedpercussion = ['celesta', 'glockenspiel', 'musicbox', 'vibraphone', 'marimba', 'xylophone', 'bells', 'dulcimer'];
		const organ = ['organ', 'percussiveorgan', 'rockorgan', 'churchorgan', 'reedorgan', 'accordian', 'harmonica', 'tangoaccordian'];
		const guitar = ['nylonguitar', 'steelguitar', 'jazzguitar', 'cleanguitar', 'mutedguitar', 'electricguitar', 'distortedguitar', 'harmonicguitar'];
		const bass = ['acousticbass', 'fingerbass', 'pickbass', 'slapbass1', 'slapbass2', 'synthbass1', 'synthbass2'];
		const strings = ['violin', 'viola', 'cello', 'doublebass', 'tremolo', 'pizzicato', 'harp', 'timpani'];
		const ensemble = ['strings1', 'string2', 'synthstrings1', 'synthstrings2', 'aahchoir', 'oohchoir', 'synthvoice', 'orchestrahit'];
		const brass = ['trumpet', 'trombone', 'tuba', 'frenchhorn', 'brass', 'synthbrass1', 'synthbrass2'];
		const reed = ['sopranosax', 'altosax', 'tenorsax', 'baritonesax', 'oboe', 'englishhorn', 'bassoon', 'clarinet'];
		const pipe = ['piccolo', 'flute', 'recorder', 'panflute', 'bottle', 'shakuhachi', 'whistle', 'ocarina'];
		const synthlead = ['squarelead', 'sawlead', 'calliopelead', 'chifflead', 'charanglead', 'voicelead', 'fifthslead', 'basslead'];
		const synthpad = ['newpad', 'warmpad', 'polypad', 'choirpad', 'bowedpad', 'metalpad', 'halopad', 'sweeppad'];
		const synthfx = ['rainfx', 'soundtrackfx', 'crystalfx', 'atmospherefx', 'brightnessfx', 'goblinsfx', 'echoesfx', 'scififx'];
		const ethnic = ['sitar', 'banjo', 'shamisen', 'koto', 'kalimba', 'bagpipe', 'fiddle', 'shanai'];
		const percussive = ['twinklebell', 'agogo', 'steeldrums', 'woodblock', 'taikodrums', 'tomtom', 'synthdrum', 'reversecymbal'];
		const sfx = ['guitarfret', 'breath', 'seashore', 'birdtweet', 'ringtone', 'helicopter', 'applause', 'gun'];

		if (groups.includes(args[0])) {
			const embed = new MessageEmbed();
			eval(`embed.addFields({ name: args[0].toUpperCase().charAt(0) + args[0].substring(1), value: ${args[0].toLowerCase() }})`);
			msg.channel.send(embed);
		}
		else if (args != 2) {
			const embed = new MessageEmbed()
				.setTitle('Instruments (1/2)')
				.setDescription(`Use\`i [group]\` to list only instruments belonging to that group\n` +
					`Use \`i 2\` to view page 2`)
				.addFields(
					{ name: 'Piano', value: piano, inline: true },
					{ name: 'Pitched Percussion', value: pitchedpercussion, inline: true },
					{ name: 'Organ', value: organ, inline: true },
					{ name: 'Guitar', value: guitar, inline: true },
					{ name: 'Bass', value: bass, inline: true },
					{ name: 'Strings', value: strings, inline: true },
					{ name: 'Ensemble', value: ensemble, inline: true },
					{ name: 'Brass', value: brass, inline: true },
					{ name: 'Reed', value: reed, inline: true }
				);
			msg.channel.send(embed);
		}
		else {
			const embed = new MessageEmbed()
				.setTitle('Instruments (2/2)')
				.setDescription(`Use\`i [group]\` to list only instruments belonging to that group\n` +
					`Use \`i\` to view page 1`)
				.addFields(
					{ name: 'Pipe', value: pipe, inline: true },
					{ name: 'Synth Lead', value: synthlead, inline: true },
					{ name: 'Synth Pad', value: synthpad, inline: true },
					{ name: 'Synth FX', value: synthfx, inline: true },
					{ name: 'Ethnic', value: ethnic, inline: true },
					{ name: 'Percussive', value: percussive, inline: true },
					{ name: 'SFX', value: sfx, inline: true },
				);
			msg.channel.send(embed);
		}
	}
};