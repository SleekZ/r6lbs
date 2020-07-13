const Discord = module.require("discord.js");
let main = require("../bot.js");

module.exports.run = async (bot, message, args, con) => {

	if (message.member.roles.find(r => r.name === "bot admin")) {} else {
		console.log("Member tried to use command (purge) but didn't have permission!");
		return;
	}	
	
	message.delete();

	const args1 = message.content.split(' ').slice(1);
	const amount = args1.join(' ');

	if (!amount) return message.reply('no amount messages fuck idot');
	if (isNaN(amount)) return message.reply('NaNNaNNaN NaN NaNv NaN NaN NaN NaN NaN NaN NaN NaN shitty paster');

	if (amount > 100) return message.reply('pls no rate limit my bot :(');
	if (amount < 1) return message.reply('pls no break my bot :(');

	message.channel.bulkDelete(parseInt(amount));
	
	message.channel.send(`:white_check_mark: Deleted ${amount.toString()} messages!`)
		.then(msg => {
			msg.delete(5000)
		})
		
	main.statusChange(message.author.username + " purge " + amount + " messages")
	setTimeout(() => main.statusChange("continue"), 10000);
}

module.exports.help = {
    name: "purge"
}