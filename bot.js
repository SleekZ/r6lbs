const config = require("./config.json");
const Discord = require("discord.js");
const bot = new Discord.Client();

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type == "dm") return;
	if (message.member.hasPermission("ADMINISTRATOR")) return;
		
	let parse = message.content.toLowerCase();
	
	if (parse.includes("@everyone") || parse.includes("@here")) {
		message.delete();
		return;
	}
	
    if (parse.includes("cheat") || parse.includes("hack") || parse.includes(" esp ") || parse.includes("esp ") || parse.includes("esp") && parse.charAt(parse.length-1) == "p" && parse.charAt(parse.length-2) == "s" && parse.charAt(parse.length-3) == "e" || parse.includes("aimbot") || parse.includes("aim bot") || parse.includes("nigger") || parse.includes("nigga")/* || parse.includes("walls ") || parse == "esp"*/) {
		message.delete();
		
		var mapObj = {
		   "aim bot":"good aim",
		   aimbot:"good aim",
		   esp:"gamesense",
		   hack:"chair",
		   cheat:"chair",
		   nigger:"brown person",
		   nigga:"brown person"
		};
		
		let stripped = message.content.replace(/cheat|hack|aimbot|aim bot|esp|nigger|nigga/gi, function(matched){
		  return mapObj[matched.toLowerCase()];
		});
		
		message.channel.createWebhook(message.author.username, message.author.avatarURL).then(wb =>
			wb.send(stripped).then(wb.delete())
		);
    }
});

bot.on("ready", () => {
    console.log('Bot successfully loaded!')
	bot.user.setActivity("guus pasting", { type: 'WATCHING' });
});

bot.login(config.token);
