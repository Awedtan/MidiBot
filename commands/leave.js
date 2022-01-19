const tools = require('./tools.js');

module.exports = {
	name: 'leave',
	alias: 'l',
	description: 'Leaves the current voice channel',
	examples: ['leave'],

	run(msg, args) {
		const name = msg.guild.voiceData.voiceChannel.name;
		tools.leaveChannel(msg);
		msg.channel.send(`🚪 Left \`${name}\``);
		console.log(`Left \`${name}\``);
	}
};