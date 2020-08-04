const Discord = module.require("discord.js");
let main = require("../bot.js");

module.exports.run = async (bot, message, args, con) => {
		
	if (message.member.roles.find(r => r.name === "bot admin")) {} else {
		console.log("Member tried to use command (ban) but didn't have permission!");
		return;
	}	
	
	message.delete();
		
	console.log(`${message.author.id} used command ?ban content of message is ${message.content}`);
							
	function invalidArgs(erarg) {
		const embed = new Discord.RichEmbed()
			.setColor('#0099ff')
			.setAuthor("Command: ?ban")
			.setDescription(`**Error:** ${erarg}\n**Description:** Bans a member\n**Usage:** ?ban [\*user] [reason]\n**Example:**\n?ban @danny bad dev\n\*\*does not support ids or names, only mentions\*\*`)
			message.channel.send(embed);
	}
		
	if (!args[1]) {
		invalidArgs("No arguments provided!");
		return;
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
		
	if (!args[2]) {
		if (member.roles.find(r => r.name === "bot admin")) {
			message.channel.send(":x: I cannot ban that user!");
			return;
		}
		con.query(`INSERT INTO infractions (moderator, user, type, reason) VALUES ("${message.author.id}", "${member.user.id}", "ban", "No Reason")`);
		message.channel.send(`:white_check_mark: ***${member.user.username}#${member.user.discriminator} was banned***`);
		message.guild.ban(member)
			.catch(console.error);
		main.statusChange(member.user.username + " getting banned")
		setTimeout(() => main.statusChange("continue"), 10000);
	} else {
		if (member.roles.find(r => r.name === "bot admin")) {
			message.channel.send(":x: I cannot ban that user!");
			return;
		}
		let earg = message.content.slice(args[0].length + args[1].length + 2);
		con.query(`INSERT INTO infractions (moderator, user, type, reason) VALUES ("${message.author.id}", "${member.user.id}", "ban", "${earg}")`);
		message.channel.send(`:white_check_mark: ***${member.user.username}#${member.user.discriminator} was banned for ${earg}***`);
		message.guild.ban(member, { reason: `${earg}` })
			.catch(console.error);
		main.statusChange(member.user.username + " getting banned")
		setTimeout(() => main.statusChange("continue"), 10000);
	}
}

module.exports.help = {
    name: "ban"
}