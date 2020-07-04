const config = require("./config.json");
const Discord = require("discord.js");
const fs = require("fs");
const prefix = "r6?"
const bot = new Discord.Client();
bot.commands = new Discord.Collection();


fs.readdir("./cmds/", (err, files) => {
	if (err) console.error(err);

	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	if(jsfiles.length <= 0) {
		console.log("No commands to load!");
		return;
	}

	console.log(`Loaded ${jsfiles.length} commands!`)

	jsfiles.forEach((f, i) => {
		let props = require(`./cmds/${f}`);
		console.log(`${i + 1}: ${f} loaded!`);
		bot.commands.set(props.help.name, props);
	});
});

bot.on("message", async message => {
	
	//make sure people have the proper permissions and are in the right channels to use the bot
	if (message.guild.id !== "720615746010611752") return;
	if (message.author.bot) return;
	if (message.channel.type == "dm") return;
	
	//message logger
	console.log("[" + message.channel.name + "] " + message.author.username + "#" + message.author.discriminator + " (" + message.author.id + "): " + message);;

	//commands
	let messageArray = message.content.split(" ");
	let command = messageArray[0];			
	let args = message.content.slice(command.length + 1);
	let cmd = bot.commands.get(command.slice(prefix.length));
	if(cmd) cmd.run(bot, message, args)	
	
	if (message.member.hasPermission("ADMINISTRATOR")) return;
		
	//grab the message content and make it lowercase
	let parse = message.content.toLowerCase();
	
	//make sure nobody can ping everyone with the bot
	if (parse.includes("@everyone") || parse.includes("@here")) {
		message.delete();
		return;
	}
	
	//hahahahahahahahahaahahahahhahahahahah
	if (parse.includes("cheat") || parse.includes("hack") || parse.includes(" esp ") || parse.includes("esp ") || parse.includes("esp") && parse.charAt(parse.length-1) == "p" && parse.charAt(parse.length-2) == "s" && parse.charAt(parse.length-3) == "e" || parse.includes("aimbot") || parse.includes("aim bot") || parse.includes("nigger") || parse.includes("nigga")/* || parse.includes("walls ") || parse == "esp"*/) {
		message.delete();
		
	    //code telling the bot where and what to replace
		var mapObj = {
		   "aim bot":"good aim",
		   aimbot:"good aim",
		   esp:"gamesense",
		   hack:"chair",
		   cheat:"chair",
		   nigger:"brown person",
		   nigga:"brown person"
		};
		
	    //code actually replacing the words
		let stripped = message.content.replace(/cheat|hack|aimbot|aim bot|esp|nigger|nigga/gi, function(matched){
		  return mapObj[matched.toLowerCase()];
		});
		
	    //creating a webhook with the name and avatar of the message author, sending the stripped message and deleting it
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
