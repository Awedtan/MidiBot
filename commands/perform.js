const tools = require('./tools.js');

module.exports = {
	name: 'perform',
	alias: 'p',
	description: 'Performs a song',
	examples: ['perform {song}'],

	async run(msg, args) {
		if (!args) return msg.channel.send('There\'s nothing here');
		const voiceChannel = msg.member.voice.channel;
		if (!voiceChannel) return msg.channel.send('You need to be in a voice channel to use that');
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) return msg.channel.send('I don\'t have permission to speak in your voice channel');

		const name = args.join(' ');
		tools.joinChannel(msg, `songs/songs/${name}.wav`)

		if (msg.guild.voiceData.voiceChannel) {
			msg.channel.send(`Now performing ${name}`);
			console.log(`Now performing ${name}`);
		}
	}
};