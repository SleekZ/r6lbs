const config = require("./config.json");
const Discord = require("discord.js");
const fs = require("fs");
const mysql = require("mysql");
const prefix = "?"
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

let continueit = true;

let laststatus = "default";

let bugged = 0;

module.exports = {
	statusChange: async function(status) {
		if (status == "start") {
			if (continueit) {
				bot.user.setActivity("guus paste", { type: 'WATCHING' });
			}
			await sleep(5000);
			if (continueit) {
				bot.user.setActivity("kolsters paste", { type: 'WATCHING' });
			}
			await sleep(5000);
			if (continueit) {
				bot.user.setActivity("rose paste", { type: 'WATCHING' });
			}
			await sleep(5000);
			if (continueit) {
				bot.user.setActivity("gregj paste", { type: 'WATCHING' });
			}
			await sleep(5000);
			if (continueit) {
				bot.user.setActivity("fizzy paste", { type: 'WATCHING' });
			}
			await sleep(5000);
			if (continueit) {
				bot.user.setActivity("smartie paste", { type: 'WATCHING' });
			}
			await sleep(5000);
			if (continueit) {
				bot.user.setActivity("darky paste", { type: 'WATCHING' });
			}
			await sleep(5000);
			if (continueit) {
				bot.user.setActivity("danny paste", { type: 'WATCHING' });
			}
			await sleep(5000);
			module.exports.statusChange("start");
		} else if (status !== "continue") {
			continueit = false;
			console.log("STOPPING!!!");
			bot.user.setActivity(status, { type: 'WATCHING' });
		} else {
			continueit = true;
			console.log("CONTINUE!!!");
		}
	}
};

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

var con = mysql.createConnection({
	host: "host",
	user: "user",
	password: "password",
	database: "database"
});

function checkBugged() {
	if (bot.user.presence.game.name) {
		let botp = bot.user.presence.game.name;
		if (botp == laststatus) {
			if (bugged >= 1) {
				console.log("restarting");
				module.exports.statusChange("start");
				let today = new Date();
				bot.channels.get('732163751729561632').send(`***Status changer restarted*** ${(today.getMonth()+1)}/${today.getDate()} ${today.getHours()}:${today.getMinutes()}`);
				bugged = 0;
				laststatus = botp;
			} else {
				console.log("adding 1");
				bugged = bugged + 1;
				laststatus = botp;
			}
		} else {
			laststatus = botp;
		}
	}
}

bot.on("message", async message => {
	
	console.log("[" + message.channel.name + "] " + message.author.username + "#" + message.author.discriminator + " (" + message.author.id + "): " + message);;

	if (message.author.bot) return;
	if (message.channel.type == "dm") {
		module.exports.statusChange(message.author.username + " dm me")
		setTimeout(() => module.exports.statusChange("continue"), 5500);
		return;
	}
	
	if (message.guild.id !== "720615746010611752") return;
	if (message.content.match(/<:.+?:\d+>/g)) return;
	
	let messageArray = message.content.split(" ");
	let command = messageArray[0];			
	let args = messageArray;
	
	let cmd = bot.commands.get(command.slice(prefix.length));
	if(cmd) cmd.run(bot, message, args, con)	
	
	if (message.member.hasPermission("ADMINISTRATOR")) return;
	
	let parse = message.content.toLowerCase();
		
	if (parse.includes("@everyone") || parse.includes("@here")) {
		message.delete();
		return;
	}
	
	if (parse.includes("cheat") || parse.includes("hack") || parse.includes("aimbot") || parse.includes("aim bot")) {
		
		message.delete();
		
		let re = /(?:(?:https?|ftp):\/\/)?[\w/\-?=%.]+\.[\w/\-?=%.]+/;
		
		if (parse.match(re)) return;
		
		var mapObj = {
		   "aim bot":"good aim",
		   aimbot:"good aim",
		   hack:"chair",
		   cheat:"chair",
		   nigger:"brown person", //this is useless
		   nigga:"brown person"
		};
		
		let stripped = message.content.replace(/cheat|hack|aimbot|aim bot|nigger|nigga/gi, function(matched){
		  return mapObj[matched.toLowerCase()];
		});
		
		message.channel.createWebhook(message.author.username, message.author.avatarURL).then(wb =>
			wb.send(stripped).then(wb.delete())
		);
		
		module.exports.statusChange(message.author.username + " try to say a blacklisted word")
		setTimeout(() => module.exports.statusChange("continue"), 5500);
	}
});

function startChange() {
	let today = new Date();
	bot.channels.get('732163751729561632').send(`*Started status changer* ${(today.getMonth()+1)}/${today.getDate()} ${today.getHours()}:${today.getMinutes()}`)
	module.exports.statusChange("start");
}

bot.on("ready", () => {
	let today = new Date();
	console.log('Bot successfully loaded!')
	bot.channels.get('732163751729561632').send(`**Bot restarted** ${(today.getMonth()+1)}/${today.getDate()} ${today.getHours()}:${today.getMinutes()}`)
	bot.user.setActivity("SEX IS STARTING TO HAPPEN!!!", { type: 'WATCHING' });
	setTimeout(startChange, 5000);
	checkBugged();
	setInterval(checkBugged, 15000);
});

bot.login(config.token);
