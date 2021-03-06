const MidiWriter = require('midi-writer-js');
const fs = require('fs');

module.exports = {

	getTrack(args) {
		const track = new MidiWriter.Track();
		const tempo = parseInt(args[0]);
		track.setTempo(tempo);
		let wait = "0";

		for (let i = 1; i < args.length; i++) {
			
			const instrument = this.getInstrument(args[i]);
			if (instrument != -1) {
				track.addEvent(new MidiWriter.ProgramChangeEvent({ instrument: instrument }));
				continue;
			}

			const values = args[i].split(/[\[\],]+/);
			const duration = values[0];
			const notes = values.slice(1, values.length - 1);

			if (notes.includes('r')) {
				wait = duration;
				continue;
			}

			const sequential = values[values.length - 1] != 'c';
			const note = new MidiWriter.NoteEvent({ pitch: notes, duration: duration, wait: wait, sequential: sequential });
			track.addEvent(note);
			wait = "0";
		}
		return track;
	},

	async joinChannel(msg, file) {
		if (!fs.existsSync(file)) return msg.channel.send('That song doesn\'t exist');
		
		const voiceChannel = msg.member.voice.channel;
		msg.guild.voiceData.voiceChannel = voiceChannel;
		msg.guild.voiceData.connection = await voiceChannel.join();
		msg.guild.voiceData.dispatcher = msg.guild.voiceData.connection
			.play(file, { highWaterMark: 64 })
			.on('finish', () => {
				console.log("finished");
			})
			.on('error', error => console.error(error));
	},

	leaveChannel(msg) {
		msg.guild.voiceData.voiceChannel.leave();
		msg.guild.voiceData = { connection: null, dispatcher: null, voiceChannel: null };
	},

	getInstrument(text) {
		switch (String(text)) {
			default:
				return -1;
			case ('grandpiano'):
				return 0;
			case ('brightpiano'):
				return 1;
			case ('electricpiano'):
				return 2;
			case ('harpsipiano'):
				return 3;
			case ('synthpiano'):
				return 4;
			case ('synthpiano2'):
				return 5;
			case ('harpsichord'):
				return 6;
			case ('clavinet'):
				return 7;
			case ('celesta'):
				return 8;
			case ('glockenspiel'):
				return 9;
			case ('musicbox'):
				return 10;
			case ('vibraphone'):
				return 11;
			case ('marimba'):
				return 12;
			case ('xylophone'):
				return 13;
			case ('bells'):
				return 14;
			case ('dulcimer'):
				return 15;
			case ('organ'):
				return 16;
			case ('percussiveorgan'):
				return 17;
			case ('rockorgan'):
				return 18;
			case ('churchorgan'):
				return 19;
			case ('reedorgan'):
				return 20;
			case ('accordian'):
				return 21;
			case ('harmonica'):
				return 22;
			case ('tangoaccordian'):
				return 23;
			case ('nylonguitar'):
				return 24;
			case ('steelguitar'):
				return 25;
			case ('jazzguitar'):
				return 26;
			case ('cleanguitar'):
				return 27;
			case ('mutedguitar'):
				return 28;
			case ('electricguitar'):
				return 29;
			case ('distortedguitar'):
				return 30;
			case ('harmonicguitar'):
				return 31;
			case ('acousticbass'):
				return 32;
			case ('fingerbass'):
				return 33;
			case ('pickbass'):
				return 34;
			case ('slapbass1'):
				return 36;
			case ('slapbass2'):
				return 37;
			case ('synthbass1'):
				return 38;
			case ('synthbass2'):
				return 39;
			case ('violin'):
				return 40;
			case ('viola'):
				return 41;
			case ('cello'):
				return 42;
			case ('doublebass'):
				return 43;
			case ('tremolo'):
				return 44;
			case ('pizzicato'):
				return 45;
			case ('harp'):
				return 46;
			case ('timpani'):
				return 47;
			case ('strings1'):
				return 48;
			case ('string2'):
				return 49;
			case ('synthstrings1'):
				return 50;
			case ('synthstrings2'):
				return 51;
			case ('aahchoir'):
				return 52;
			case ('oohchoir'):
				return 53;
			case ('synthvoice'):
				return 54;
			case ('orchestrahit'):
				return 55;
			case ('trumpet'):
				return 56;
			case ('trombone'):
				return 57;
			case ('tuba'):
				return 58;
			case ('frenchhorn'):
				return 60;
			case ('brass'):
				return 61;
			case ('synthbrass1'):
				return 62;
			case ('synthbrass2'):
				return 63;
			case ('sopranosax'):
				return 64;
			case ('altosax'):
				return 65;
			case ('tenorsax'):
				return 66;
			case ('baritonesax'):
				return 67;
			case ('oboe'):
				return 68;
			case ('englishhorn'):
				return 69;
			case ('bassoon'):
				return 70;
			case ('clarinet'):
				return 71;
			case ('piccolo'):
				return 72;
			case ('flute'):
				return 73;
			case ('recorder'):
				return 74;
			case ('panflute'):
				return 75;
			case ('bottle'):
				return 76;
			case ('shakuhachi'):
				return 77;
			case ('whistle'):
				return 78;
			case ('ocarina'):
				return 79;
			case ('squarelead'):
				return 80;
			case ('sawlead'):
				return 81;
			case ('calliopelead'):
				return 82;
			case ('chifflead'):
				return 83;
			case ('charanglead'):
				return 84;
			case ('voicelead'):
				return 85;
			case ('fifthslead'):
				return 86;
			case ('basslead'):
				return 87;
			case ('newpad'):
				return 88;
			case ('warmpad'):
				return 89;
			case ('polypad'):
				return 90;
			case ('choirpad'):
				return 91;
			case ('bowedpad'):
				return 92;
			case ('metalpad'):
				return 93;
			case ('halopad'):
				return 94;
			case ('sweeppad'):
				return 95;
			case ('rainfx'):
				return 96;
			case ('soundtrackfx'):
				return 97;
			case ('crystalfx'):
				return 98;
			case ('atmospherefx'):
				return 99;
			case ('brightnessfx'):
				return 100;
			case ('goblinsfx'):
				return 101;
			case ('echoesfx'):
				return 102;
			case ('scififx'):
				return 103;
			case ('sitar'):
				return 104;
			case ('banjo'):
				return 105;
			case ('shamisen'):
				return 106;
			case ('koto'):
				return 107;
			case ('kalimba'):
				return 108;
			case ('bagpipe'):
				return 109;
			case ('fiddle'):
				return 110;
			case ('shanai'):
				return 111;
			case ('twinklebell'):
				return 112;
			case ('agogo'):
				return 113;
			case ('steeldrums'):
				return 114;
			case ('woodblock'):
				return 115;
			case ('taikodrums'):
				return 116;
			case ('tomtom'):
				return 117;
			case ('synthdrum'):
				return 118;
			case ('reversecymbal'):
				return 119;
			case ('guitarfret'):
				return 120;
			case ('breath'):
				return 121;
			case ('seashore'):
				return 122;
			case ('birdtweet'):
				return 123;
			case ('ringtone'):
				return 124;
			case ('helicopter'):
				return 125;
			case ('applause'):
				return 126;
			case ('gun'):
				return 127;
		}
	}
};