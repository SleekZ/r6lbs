const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {

	message.delete();
	
	//checking if a member existings in a guild
	function checkGuild(gid) {
		let guild = bot.guilds.get(gid);

		if (guild.member(message.author.id)) {
			return true;
		}
	}
		
	/*if (checkGuild("728756362665918476")) {
		message.channel.send(":white_check_mark: Found you in Sky.cc!");
		let role = message.guild.roles.find(role => role.name === "Sky.cc");
		message.member.addRole(role);
	}*/
	
	//add checkGuild2, pass through guild name and role id on the check to save time?
}

module.exports.help = {
    name: "requestrole"
}
