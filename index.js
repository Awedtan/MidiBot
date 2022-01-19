const { prefix, token } = require("./config.json");
const Discord = require('discord.js');
const fs = require('fs');

Discord.Structures.extend('Guild', Guild => {
	class SongGuild extends Guild {
		constructor(client, data) {
			super(client, data);
			this.voiceData = {
				connection: null,
				dispatcher: null,
				voiceChannel: null
			};
		}
	}
	return SongGuild;
});

const client = new Discord.Client();

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.aliases = new Discord.Collection();
for (const command of client.commands.array()) {
	client.aliases.set(command.alias, command);
}

client.on('message', msg => {
	if (msg.author.bot) return;
	if (!msg.content.startsWith(prefix)) return;

	try {
		const command = msg.content.slice(prefix.length);
		const args = command.split(" ");
		const commandName = args.shift().toLowerCase();

		if (commandName == 'help')
			require('./commands/help.js').run(msg, args, client);
		else if (client.commands.has(commandName))
			client.commands.get(commandName).run(msg, args);
		else if (client.aliases.has(commandName))
			client.aliases.get(commandName).run(msg, args);
		else return;

		console.log(commandName);
		console.log(args);
	} catch (err) {
		msg.channel.send('😔 Something went wrong');
		console.log(err);
	}
});

client.on('ready', () => {
	client.user.setActivity('a song');
	console.log(`midibot Ready!`);
});

client.login(token);