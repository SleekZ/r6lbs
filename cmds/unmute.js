const Discord = module.require("discord.js");
let main = require("../bot.js");

module.exports.run = async (bot, message, args, con) => {
	
	if (!message.member.roles.find(r => r.name === "bot admin")) {
		console.log("Member tried to use command (unmute) but didn't have permission!");
		return;
	}	
			
	console.log(`${message.author.id} used command ?mute content of message is ${message.content}`);
	
	message.delete();
		
	let mutedRole = message.guild.roles.find(role => role.name == "Muted");
	
	let verifiedRole = message.guild.roles.find(role => role.name == "Verified");
					
	function invalidArgs(erarg) {
		const embed = new Discord.RichEmbed()
			.setColor('#0099ff')
			.setAuthor("Command: ?unmute")
			.setDescription(`**Error:** ${erarg}\n**Description:** Unmute a member\n**Usage:** ?mute [\*user]\n**Example:**\n?unmute @danny\n\*\*does not support ids or names, only mentions\*\*`)
			message.channel.send(embed);
	}
		
	if (!mutedRole) {
		message.channel.send("No muted role, muted role name should be named Muted!");
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
		
	if (!args[1]) {
		invalidArgs("No arguments provided!");
		return;
	}
		
	if (member.roles.find(r => r.name === "Muted")) {
		con.query(`INSERT INTO infractions (moderator, user, type, reason) VALUES ("${message.author.id}", "${member.user.id}", "unmute", "No Reason")`);
		message.channel.send(`:white_check_mark: ***${member.user.username}#${member.user.discriminator} was unmuted***`);
		member.removeRole(mutedRole);
		member.addRole(verifiedRole);
		main.statusChange(member.user.username + " get unmuted")
		setTimeout(() => main.statusChange("continue"), 10000);
	} else {
		message.channel.send(`:x: I can't unmute ${member.user.username}#${member.user.discriminator}, they aren't muted`);
		return;
	}
}

module.exports.help = {
    name: "unmute"
}