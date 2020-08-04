const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args, con) => {
		
	if (!message.member.roles.find(r => r.name === "bot admin")) {
		console.log("NONE!!!");
		return;
	}
	
	message.delete();
									
	function invalidArgs(erarg) {
		const embed = new Discord.RichEmbed()
			.setColor('#0099ff')
			.setAuthor("Command: ?eval")
			.setDescription(`**Error:** ${erarg}\n**Description:** Run node js shit\n**Usage:** ?eval [\*code]\n**Example:**\n?eval console.log("sex is starting to happen!!")`)
		message.channel.send(embed);
	}
		
	if (!args[1]) {
		invalidArgs("No arguments provided!");
		return;
	}
	try {
		const code =args.slice(1).join(' ')
		let evaled = eval(code);

		if (typeof evaled !== "string")
			evaled = require("util").inspect(evaled);

		message.channel.send(clean(evaled), {code:"xl"});
	} catch (err) {
		message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
	}
}

module.exports.help = {
    name: "eval"
}