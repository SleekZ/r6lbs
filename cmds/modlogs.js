const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args, con) => {
		
	let spermcell = new Array();
		
	if (message.member.roles.find(r => r.name === "bot admin")) {} else {
		console.log("Member tried to use command (modlogs) but didn't have permission!");
		return;
	}	
	
	message.delete();
		
	console.log(`${message.author.id} used command ?modlogs content of message is ${message.content}`);
							
	function invalidArgs(erarg) {
		const embed = new Discord.RichEmbed()
			.setColor('#0099ff')
			.setAuthor("Command: ?modlogs")
			.setDescription(`**Error:** ${erarg}\n**Description:** Get a list of mod logs for a user\n**Usage:** ?modlogs [\*user]\n**Example:**\n?modlogs @danny\n\*\*does not support ids or names, only mentions\*\*`)
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
		
	con.query(`SELECT * FROM infractions WHERE user = "${member.user.id}"`, (err, rows1) => {
		if (!rows1[0]) {
			message.channel.send("No logs found for that member!");
			return;
		}
		message.channel.send("Found " + rows1.length + " logs for <@" + member.user.id + ">");
		spermcell.push("\`USER ID | MOD | TYPE | REASON | TIME\`");
		for (i = 0; i < rows1.length; i++) {
			spermcell.push("\`" + rows1[i].user + " | " + rows1[i].moderator + " | " + rows1[i].type + " | " + rows1[i].reason + " | " + rows1[i].time + "\`");
		}
		message.channel.send(spermcell.join('\n'));
	});
}

module.exports.help = {
    name: "modlogs"
}