const { prefix } = require("./../config.json");
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'help',
	alias: 'h',
	description: 'Displays the help menu',
	examples: ['help'],

	run(msg, args, client) {
		if (args.length > 0)
			if (client.commands.has(args[0])) {
				const command = client.commands.get(args[0]);
				let examples = `\`${command.examples[0]}\``;
				for (let i = 1; i < command.examples.length; i++)
					examples += `\n\`${command.examples[i]}\``;

				const alias = `\`${command.alias}\``;
				const embed = new MessageEmbed()
					.setTitle(command.name.toUpperCase().charAt(0) + command.name.substring(1))
					.addFields(
						{ name: 'Description', value: command.description, inline: false },
						{ name: 'Examples', value: examples, inline: false },
						{ name: 'Alias', value: alias, inline: false },
					);
				return msg.channel.send(embed);
			}
			else if (client.aliases.has(args[0])) {
				const command = client.aliases.get(args[0]);
				let examples = `\`${command.examples[0]}\``;
				for (let i = 1; i < command.examples.length; i++)
					examples += `\n\`${command.examples[i]}\``;

				const alias = `\`${command.alias}\``;
				const embed = new MessageEmbed()
					.setTitle(command.name.toUpperCase().charAt(0) + command.name.substring(1))
					.addFields(
						{ name: 'Description', value: command.description, inline: false },
						{ name: 'Examples', value: examples, inline: false },
						{ name: 'Alias', value: alias, inline: false },
					);
				return msg.channel.send(embed);
			}
			
		let string = `Current prefix: \`${prefix}\`\n\n`;
		for (const command of client.commands.array()) {
			string += `\`${command.name}\`, `;
		}

		string = string.substring(0, string.length - 2);
		string += '\n\nUse `help {command}` for more information about a command';

		const embed = new MessageEmbed()
			.setTitle(`Help`)
			.setDescription(string);
		msg.channel.send(embed);
		console.log(`Displayed help menu`);
	}
};