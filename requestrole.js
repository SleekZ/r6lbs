const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {

	if (message.channel.id !== "728768539938259005") {
		//return;
	}

	message.delete();
	
	function sendMessage(content, time) {
		message.channel.send(content)
		.then(msg => {
			msg.delete(time)
		})
	}
	
	function checkGuild(gid, sname, rid) {
		let guild = bot.guilds.get(gid);

		if (guild.member(message.author.id)) {
			let role = message.guild.roles.get(rid);
			message.member.addRole(role)
			sendMessage(":white_check_mark: Found you in **" + sname + "**!", 5000);
		}
	}
		
	function checkGuild2(gid) {
		let guild = bot.guilds.get(gid);

		if (guild.member(message.author.id)) {
			return true;
		}
	}
	
	checkGuild("614876145250205706", "SmartEye", "728993343790645293");
	checkGuild("712703476010057738", "nekocheat", "733770752398065718");

	if (!checkGuild2("614876145250205706") && !checkGuild2("712703476010057738")) {
		sendMessage(":x: Couldn't assign you any supported roles!", 7500);
	} else {
		sendMessage(":ballot_box_with_check: Properly assigned you to all supported roles!", 7500);
	}
	/*if (checkGuild("728756362665918476")) {
		message.channel.send(":white_check_mark: Found you in Sky.cc!");
		let role = message.guild.roles.find(role => role.name === "Sky.cc");
		message.member.addRole(role);
	}*/
}

module.exports.help = {
    name: "requestrole"
}