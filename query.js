const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args, con) => {

	function sperseString(n, str) {

		let ret = [], remaining = str;

		while (remaining) {
			let v = remaining.slice(0, n);
			remaining = remaining.slice(v.length);
			ret.push(v);
		}

		return ret;
	};

				
	if (!message.member.roles.find(r => r.name === "bot admin")) return;
	
	let spermcell = new Array();
									
	function invalidArgs(erarg) {
		const embed = new Discord.RichEmbed()
			.setColor('#0099ff')
			.setAuthor("Command: ?query")
			.setDescription(`**Error:** ${erarg}\n**Description:** Run an sql command\n**Usage:** ?query [\*command]\n`)
		message.channel.send(embed);
	}
		
	if (!args[1]) {
		invalidArgs("No arguments provided!");
		return;
	}

	let cumdumpster = args.slice(1).join(' ')
	cumdumpster = cumdumpster.replace("-print", "")

	con.query(cumdumpster, (err, rows) => {
		if (err) {
			message.channel.send(":x: MySQL returned `" + err.message + "`, check console for more logs")
			console.log(err);
		} else if (rows) {
			message.channel.send(":white_check_mark: MySQL returned OK")
			message.delete();
			if (args[args.length - 1] != "-print") return;
			for (i = 0; i < rows.length; i++) { 
				spermcell.push(JSON.stringify(rows[i]));
			}
			let str = spermcell.join('\n');
			str = sperseString(1990, str);
			for (i = 0; i < str.length; i++) { 
				message.channel.send("``` " + (i + 1) + "\n" + str[i] + "```")
			}
		}
	});
}

module.exports.help = {
    name: "query"
}