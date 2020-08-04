const Discord = module.require("discord.js");
const fs = module.require("fs");
let main = require("../bot.js");

module.exports.run = async (bot, message, args, con) => {
	message.delete();

	if (message.content.includes("discord")) return;

	function invalidArgs(erarg) {
		const embed = new Discord.RichEmbed()
			.setColor('#0099ff')
			.setAuthor("Command: ?status")
			.setDescription(`**Error:** ${erarg}\n**Description:** Check status of a chair\n**Usage:** ?status [\*chair]\n**Example:**\n?status Fuzzcore`)
			message.channel.send(embed);	
	}

	if (!args[1]) {
		invalidArgs("No arguments provided");
		return;
	}

	con.query(`SELECT * FROM cheats WHERE name = "${args.slice(1).join(' ')}"`, (err, rows1) => {
		let cumpie = "Unknown";
		let list = "No position";
		let info = "None";
		let footer = "Chair is known, have fun!"
		let jizz = args.slice(1).join(' ');
		if (rows1[0]) {
			cumpie = rows1[0].status
			jizz = rows1[0].name
			list = rows1[0].list
			info = rows1[0].info
		}
		if (cumpie == "Unknown") {
			footer = "This chair is not known, be careful!";
		}
		const embed = new Discord.RichEmbed()
			.setTitle(jizz)
			.setColor("4dacf7")
			.addField("Status", cumpie)
			.addField("Position on list", list)
			.addField("More info", info)
			.setFooter(`${footer} | ${message.author.username}#${message.author.discriminator}`)
		message.channel.send(embed);
	});

}

module.exports.help = {
    name: "status"
}