const Discord = module.require("discord.js");
const ms = require("ms");
const fs = require("fs");
let main = require("../bot.js");

function hasNumber(myString) {
	return /\d/.test(myString);
}

module.exports.run = async (bot, message, args, con) => {
	
	if (!message.member.roles.find(r => r.name === "bot admin")) return;
	
	message.delete();
			
	let member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
	
	if (!member) return invalidArgs("No member provided"); 

	let mutedRole = message.guild.roles.find(role => role.name == "Muted");
	let verifiedRole = message.guild.roles.find(role => role.name == "Verified");
					
	function invalidArgs(erarg) {
		const embed = new Discord.RichEmbed()
			.setColor('#0099ff')
			.setAuthor("Command: ?mute")
			.setDescription(`**Error:** ${erarg}\n**Description:** Mute a member so they can not speak, time limit in minutes.\n**Usage:** ?mute [\*user] [limit in minutes] [reason]\n**Example:**\n?mute @danny 10m Shitposting\n?mute @danny Shitposting\n\*\*does not support ids or names, only mentions**\n**does not support one word mutes ex ?mute @danny Spam**`)
		message.channel.send(embed);
	}
		
	function muteMember(timeMute) {
		if (timeMute) {
			member.addRole(mutedRole);
			member.removeRole(verifiedRole);
			bot.mutes[member.id] = {
				guild: message.guild.id,
				time: Date.now() + ms(timeMute)
			}
			fs.writeFileSync("./mutes.json", JSON.stringify(bot.mutes, null, 4)), err => {
				if (err) throw err;
			}
		} else {
			member.addRole(mutedRole);
			member.removeRole(verifiedRole);
		}
	}
	
	function insertDB(reason, time) {
		con.query(`INSERT INTO infractions (moderator, user, type, reason, time) VALUES ("${message.author.id}", "${member.user.id}", "mute", "${reason}", "${time}")`);
		main.statusChange(member.user.username + " get muted")
		setTimeout(() => main.statusChange("continue"), 10000);
	}
	
	if (args[2] && hasNumber(args[2]) && args[3]) { //time and reason
		muteMember(args[2]);
		insertDB(args.slice(3).join(' '), (ms(ms(args[2]), { long: true})));
		message.channel.send(`:white_check_mark: ***${member.user.username}#${member.user.discriminator} has been muted for ${(ms(ms(args[2]), { long: true}))}***`);
	} else if (args[2] && hasNumber(args[2])) { //time no reason
		muteMember(args[2]);
		insertDB("No reason", (ms(ms(args[2]), { long: true})));
		message.channel.send(`:white_check_mark: ***${member.user.username}#${member.user.discriminator} has been muted for ${(ms(ms(args[2]), { long: true}))}***`);
	} else if (args[2] && !hasNumber(args[2])) { //no time reason
		muteMember();
		insertDB(args.slice(2).join(' '), "Forever");
		message.channel.send(`:white_check_mark: ***${member.user.username}#${member.user.discriminator} has been muted***`);
	} else { //mute no reason no time
		muteMember();
		insertDB("No reason", "Forever");
		message.channel.send(`:white_check_mark: ***${member.user.username}#${member.user.discriminator} has been muted***`);
	}
	
}

module.exports.help = {
    name: "mute"
}