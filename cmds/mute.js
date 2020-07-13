const Discord = module.require("discord.js");
let main = require("../bot.js");

module.exports.run = async (bot, message, args, con) => {
	
	if (message.member.roles.find(r => r.name === "bot admin")) {} else {
		console.log("Member tried to use command (mute) but didn't have permission!");
		return;
	}	
	
	message.delete();
	
	console.log(`${message.author.id} used command ?mute content of message is ${message.content}`);
		
	let mutedRole = message.guild.roles.find(role => role.name == "Muted");
	
	let verifiedRole = message.guild.roles.find(role => role.name == "Verified");
					
	function invalidArgs(erarg) {
		const embed = new Discord.RichEmbed()
			.setColor('#0099ff')
			.setAuthor("Command: ?mute")
			.setDescription(`**Error:** ${erarg}\n**Description:** Mute a member so they can not speak, time limit in minutes.\n**Usage:** ?mute [\*user] [limit in minutes] [reason]\n**Example:**\n?mute @danny 10m Shitposting\n?mute @danny Shitposting\n\*\*does not support ids or names, only mentions**\n**does not support one word mutes ex ?mute @danny Spam**`)
		message.channel.send(embed);
	}
		
	function mute(dur, dur1) {
		if (dur1 == "m") {
			mute2(dur, 60000);
		}
		if (dur1 == "h") {
			mute2(dur, 3600000);
		}
		if (dur1 == "d") {
			mute2(dur, 86400000);
		}
		if (!dur) {
			mute2();
		}
	}
		
	function mute2(time, duration) {
		main.statusChange(member.user.username + " getting muted")
		setTimeout(() => main.statusChange("continue"), 10000);
		if (!time) {
			console.log("Muted someone!");
			member.addRole(mutedRole);
			member.removeRole(verifiedRole);
		} else {
			console.log("Muted someone (temp)!");
			member.removeRole(verifiedRole);
			member.addRole(mutedRole);
			setTimeout(() => {
				member.removeRole(mutedRole, `Mute expired.`);
				member.addRole(verifiedRole);
				console.log("Tempmute expired for a user!");
			}, time * duration);
		}
	}
		
	if (!mutedRole) {
		message.channel.send("No muted role, muted role name should be named Muted!");
		return;
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
		
	if (args[2]) {
		let checkint = parseInt(args[2].slice(0, -1));
			
		let rarg = message.content.slice(args[0].length + args[1].length + args[2].length + 3);
		
		let earg = message.content.slice(args[0].length + args[1].length + 2);
							
		if (!Number.isInteger(checkint)) {
			if (!rarg) {
				invalidArgs("Invalid time (time is in minutes, ex ?mute @danny 60m is one hour)");
				return;
			} else {
				con.query(`INSERT INTO infractions (moderator, user, type, reason) VALUES ("${message.author.id}", "${member.user.id}", "mute", "${earg}")`);
				mute();
				message.channel.send(`:white_check_mark: ***${member.user.username}#${member.user.discriminator} was muted for ${earg}***`);
				return;
			}
		}
			
		if (args[2].substr(-1) == "m" || args[2].substr(-1) == "h" || args[2].substr(-1) == "d") {console.log(args[2].substr(-1))} else { 
			if (!rarg) {
				invalidArgs("Invalid time 2 (time is in minutes, hours or days, ex ?mute @danny 1h = one hour)");
				return;
			} else {
				con.query(`INSERT INTO infractions (moderator, user, type, reason) VALUES ("${message.author.id}", "${member.user.id}", "mute", "${earg}")`);
				mute();
				message.channel.send(`:white_check_mark: ***${member.user.username}#${member.user.discriminator} was muted***`);
				return;
			}
		}
			
		if (args[3]) {
			con.query(`INSERT INTO infractions (moderator, user, type, reason, time) VALUES ("${message.author.id}", "${member.user.id}", "mute", "${rarg}", "${args[2]}")`);
			mute(checkint, args[2].substr(-1));
			message.channel.send(`:white_check_mark: ***${member.user.username}#${member.user.discriminator} was muted for ${rarg}***`);
			return;
		} else {
			con.query(`INSERT INTO infractions (moderator, user, type, time) VALUES ("${message.author.id}", "${member.user.id}", "mute", "${args[2]}")`);
			mute(checkint, args[2].substr(-1));
			message.channel.send(`:white_check_mark: ***${member.user.username}#${member.user.discriminator} was muted***`);
			return;
		}
	}
		
	con.query(`INSERT INTO infractions (moderator, user, type) VALUES ("${message.author.id}", "${member.user.id}", "mute")`);
	mute();
	message.channel.send(`:white_check_mark: ***${member.user.username}#${member.user.discriminator} was muted***`);
}

module.exports.help = {
    name: "mute"
}