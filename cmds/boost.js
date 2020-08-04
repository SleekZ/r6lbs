const Discord = module.require("discord.js");
const fs = module.require("fs");
let main = require("../bot.js");

module.exports.run = async (bot, message, args, con) => {
	message.delete();
	
	if (message.member._roles.length > 1) {
		main.pushChange(message.author.id, message);
	} else {
		message.channel.send(":x: You don't appear to have a chair role!")
	}

}

module.exports.help = {
    name: "boosting"
}