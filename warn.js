const Discord = module.require("discord.js");
let main = require("../bot.js");

module.exports.run = async (bot, message, args, con) => {
		
	if (!message.member.roles.find(r => r.name === "bot admin")) {
		console.log("Member tried to use command (warn) but didn't have permission!");
		return;
	}	
	
	message.delete();
		
	console.log(`${message.author.id} used command ?warn content of message is ${message.content}`);
			
	function invalidArgs(erarg) {
		const embed = new Discord.RichEmbed()
			.setColor('#0099ff')
			.setAuthor("Command: ?warn")
			.setDescription(`**Error:** ${erarg}\n**Description:** Warn a member\n**Usage:** ?warn [\*user] [reason]\n**Example:**\n?warn @danny sworning in chat why\n\*\*does not support ids or names, only mentions\*\*`)
		message.channel.send(embed);
	}
		
	let member;

	member = message.mentions.members.first();
	
	if (!member) {
		if (!message.guild.members.get(args[1])) {
			invalidArgs("No mention or id provided!");
			return;
		} else {
			member = message.guild.members.get(args[1]);
		}
	}
		
	if (!args[1]) {
		invalidArgs("No arguments provided!");
		return;
	}

	if (!args[2]) {
		if (member.roles.find(r => r.name === "bot admin")) {
			message.channel.send(":x: I cannot warn that user!");
			return;
		}
		con.query(`INSERT INTO infractions (moderator, user, type, reason) VALUES ("${message.author.id}", "${member.user.id}", "warn", "No Reason")`);
		message.channel.send(`:white_check_mark: ***${member.user.username}#${member.user.discriminator} has been warned***`);
		main.statusChange(member.user.username + " get warned")
		setTimeout(() => main.statusChange("continue"), 10000);
	} else {
		if (member.roles.find(r => r.name === "bot admin")) {
			message.channel.send(":x: I cannot warn that user!");
			return;
		}
		let earg = message.content.slice(args[0].length + args[1].length + 2);
		con.query(`INSERT INTO infractions (moderator, user, type, reason) VALUES ("${message.author.id}", "${member.user.id}", "warn", "${earg}")`);
		message.channel.send(`:white_check_mark: ***${member.user.username}#${member.user.discriminator} has been warned for ${earg}***`);
		main.statusChange(member.user.username + " get warned")
		setTimeout(() => main.statusChange("continue"), 10000);
	}
}

module.exports.help = {
    name: "warn"
}