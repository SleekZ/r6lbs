const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
				
	if (!message.member.roles.find(r => r.name === "bot admin")) {
		console.log("NONE!!!");
		return;
	}
	
	message.delete();
									
	function invalidArgs(erarg) {
		const embed = new Discord.RichEmbed()
			.setColor('#0099ff')
			.setAuthor("Command: ?say")
			.setDescription(`**Error:** ${erarg}\n**Description:** Say a message as a bot\n**Usage:** ?say [\*message]\n**Example:**\n?say guus pastes`)
		message.channel.send(embed);
	}
		
	if (!args[1]) {
		invalidArgs("No arguments provided!");
		return;
	}
		
	message.channel.createWebhook(message.author.username, message.author.avatarURL).then(wb =>
		wb.send(args.slice(1).join(' ')).then(wb.delete())
	);
}

module.exports.help = {
    name: "say"
}