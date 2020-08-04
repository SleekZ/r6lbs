const config = require("./config.json");
const Discord = require("discord.js");
const R6API = require('r6api.js');
const mysql = require("mysql");
const fs = require("fs");
const readline = require('readline');
const r6api = new R6API('email', 'pass');
const bot = new Discord.Client();
const prefix = "?"
bot.commands = new Discord.Collection();
bot.mutes = require("./mutes.json");

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.on('line', (input) => {
	if (!input) return;
	bot.channels.get('721792511944949842').send(input)
});

let using = [];
let using1 = [];

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
				bot.user.setActivity("darkghost paste", { type: 'WATCHING' });
			}
			await sleep(5000);
			if (continueit) {
				bot.user.setActivity("syndicate paste", { type: 'WATCHING' });
			}
			await sleep(5000);
			if (continueit) {
				bot.user.setActivity("riley paste", { type: 'WATCHING' });
			}
			await sleep(5000);
			if (continueit) {
				bot.user.setActivity("danny paste", { type: 'WATCHING' });
			}
			await sleep(5000);
			if (continueit) {
				bot.user.setActivity("jesus pray", { type: 'WATCHING' });
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
	},
	pushChange: async function(id, msg) {
		if (!using.includes(id) && !using1.includes(id)) {
			msg.author.send("This command is ONLY for people who are wishing to post a request for people to join their squad in #boosting, abuse of this command will be punished.\n**What chair are you using?**").catch((error) => {
				msg.channel.send(":x: I cannot message you!");
				return;
			});
			using.push(id);
		} else {
			msg.channel.send(":x: You've already requested boosting!")
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
	host: "localhost",
	user: "root",
	password: "passwd",
	database: "db"
});

function checkBugged() {
	if (bot.user.presence.game.name) {
		let botp = bot.user.presence.game.name;
		if (botp == laststatus) {
			if (bugged >= 1) {
				console.log("restarting");
				//module.exports.statusChange("start");
				let today = new Date();
				bot.channels.get('733802934835347537').send(`***Status changer restarted*** ${(today.getMonth()+1)}/${today.getDate()} ${today.getHours()}:${today.getMinutes()}`);
				bugged = 0;
				laststatus = botp;
				process.exit(22)
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

function attachIsImage(msgAttach) {
	var url = msgAttach.url.toLowerCase();
	return url.indexOf("exe", url.length - "exe".length /*or 3*/) !== -1;
}

bot.on("message", async message => {

	console.log("[" + message.channel.name + "] " + message.author.username + "#" + message.author.discriminator + " (" + message.author.id + "): " + message);;
	
	if (message.author.bot) return;
	if (message.channel.type == "dm") {
		if (using.includes(message.author.id)) {
			let server = bot.guilds.get("720615746010611752");
			if (server.members.get(message.author.id).roles.find(r => r.name.toLowerCase() == message.content.toLowerCase())) {
				message.channel.send(`:white_check_mark: Chair successfully logged!`).then(msg => {
					msg.delete(2500)
				});
				con.query(`DELETE FROM users WHERE id= "${message.author.id}";`)
				await con.query(`INSERT INTO users (id, chair) VALUES ("${message.author.id}", "${message.content}");`)
				message.channel.send("**What's your Username (in game)?**");
				using = using.filter(e => e !== `${message.author.id}`);
				using1.push(message.author.id, message.content);
			} else {
				message.channel.send(":x: You don't appear to have that chair, see <#734174379726078063> for a list of valid chairs!");
			}
		} else if (using1.includes(message.author.id)) {
			let username = message.content,
				platform = 'uplay';
			try {
				let id = await r6api.getId(platform, username).then(el => el[0].userId);
				let stats = await r6api.getRank(platform, id, { seasons:18, regions: "ncsa"}).then(el => el[0]);
				let orwhat = "!";
				let orwhat1 = "None";
				if (stats.seasons[18].regions.ncsa.current.mmr >= 4000) {
					orwhat = ", this means you can only play with people above 3400 elo!"
					orwhat1 = "3400+ elo"
				}
				message.channel.send("You appear to be **" + stats.seasons[18].regions.ncsa.current.name + "**" + orwhat + "\nClick :white_check_mark: to confirm your booster request.").then(msg => {
					msg.react("✅");
					bot.on('messageReactionAdd', async (reaction, user) => {
						if(reaction.emoji.name !== "✅") return;
						if(user === bot.user) return;
						if (using1.includes(user.id)) {
							await msg.delete();
							await user.send(":white_check_mark: Message sent!");
							con.query(`SELECT * FROM users WHERE id = "${message.author.id}"`, (err, rows) => {
								con.query(`SELECT * FROM cheats WHERE name = "${rows[0].chair}"`, (err, rows1) => {
									let cumpie = "Unknown";
									if (rows1[0]) {
										cumpie = rows1[0].status
									}
									const embed = new Discord.RichEmbed()
										.setTitle(`${message.author.username} is boosting!`)
										.setColor("32CD32")
										.addField("Username (in game)", `${message.content} (<@${message.author.id}>)`)
										.addField("Requirements", orwhat1)
										.addField("Chair", `${rows[0].chair} (${cumpie})`)
										.setTimestamp()
									bot.channels.get('736535825101226017').send(embed);
								});
							});
							using1 = using1.filter(e => e !== `${message.author.id}`);
							return;
						}
					});
				});
			} catch(err) {
				message.channel.send(":x: No account found with that username!");
				return;
			}
		}
		return;
	}
	
	if (message.guild.id !== "720615746010611752") return;
	//if (message.content.match(/<:.+?:\d+>/g))
	
	let messageArray = message.content.split(" ");
	let command = messageArray[0];			
	let args = messageArray;
	
	let cmd = bot.commands.get(command.slice(prefix.length));
	if(cmd) cmd.run(bot, message, args, con)
	if (args[0] == "?status") return;
	
	if (message.member.hasPermission("ADMINISTRATOR")) return;

	if (message.attachments.size > 0) {
	    if (message.attachments.every(attachIsImage)){
		        message.delete();
	    }
	}  

	if (message.content.toLowerCase().match(/.*\.exe/)) {
		message.delete();
	};
	
	let parse = message.content.toLowerCase();
	let parse1 = parse.replace(/\s/g, '');
		
	/* if (message.content.match(/[^\x00-\x7F]/g)) {
		message.delete();
		return;
	}*/
	if (parse1.includes("@everyone") || parse1.includes("@here")) {
		message.delete();
		bot.channels.get('733908971613716510').send(`***Party Filter***\n${message.author.username} pinged everyone or here`);
		return;
	}
	
	if (parse1.includes("exican") || (parse1.includes("ican") && parse1.includes("alex")) || parse1.includes("beaner") || (parse1.includes("bean") && parse1.includes("alex")) || parse1.includes("deadgrandma")) {
		message.delete();
		bot.channels.get('733908971613716510').send(`***Mexican Filter***\n**User**: ${message.author.username}\nMessage content (unparsed): \`${parse}\`\nMessage content (parsed): \`${parse1}\``);
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
		   nigger:"brown person",
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
	bot.channels.get('733802934835347537').send(`*Started status changer* ${(today.getMonth()+1)}/${today.getDate()} ${today.getHours()}:${today.getMinutes()}`)
	module.exports.statusChange("start");
}

bot.on("ready", () => {
	let today = new Date();	
	console.log('Bot successfully loaded!')
	bot.setInterval(() => {
		for (let i in bot.mutes) {
			let time = bot.mutes[i].time;
			let member = bot.guilds.get(bot.mutes[i].guild).members.get(i);
			let mutedRole = bot.guilds.get(bot.mutes[i].guild).roles.find(r => r.name === "Muted");
			let verifiedRole = bot.guilds.get(bot.mutes[i].guild).roles.find(r => r.name === "Verified");
			if(!mutedRole || !verifiedRole || !member) continue;
			if (Date.now() > time) {
				console.log("unmute lol");
				member.removeRole(mutedRole)
				member.addRole(verifiedRole);
				delete bot.mutes[i];
				
				fs.writeFileSync("./mutes.json", JSON.stringify(bot.mutes));
			}
		}
	}, 5000)
	bot.channels.get('733802934835347537').send(`**Bot restarted** ${(today.getMonth()+1)}/${today.getDate()} ${today.getHours()}:${today.getMinutes()}`)
	bot.user.setActivity("SEX IS STARTING TO HAPPEN", { type: 'WATCHING' });
	let changing = setTimeout(startChange, 5000);
	checkBugged();
	let bugging = setInterval(checkBugged, 15000);
});

bot.on("guildMemberUpdate", async function(oldMember, newMember) {
	if (newMember._roles.length > oldMember._roles.length) {
		const fetchedLogs = await oldMember.guild.fetchAuditLogs({
			limit: 1,
			type: 'MEMBER_ROLE_UPDATE',
		});

		const roleAddLog = fetchedLogs.entries.first();
		if (!roleAddLog ) return;
		if (roleAddLog.executor.id == "501982335076532224") {
			let verifiedRole = oldMember.guild.roles.find(role => role.name == "Verified");
			if (roleAddLog.changes[0].new[0].name == "Muted") {
				console.log("removing verified role ok ok ok");
				oldMember.removeRole(verifiedRole);
			}
		}
	} else if (newMember._roles.length < oldMember._roles.length) {
		const fetchedLogs = await oldMember.guild.fetchAuditLogs({
			limit: 1,
			type: 'MEMBER_ROLE_UPDATE',
		});

		const roleRemoveLog = fetchedLogs.entries.first();
		if (!roleRemoveLog ) return;
		if (roleRemoveLog.executor.id == "501982335076532224") {
			let verifiedRole = oldMember.guild.roles.find(role => role.name == "Verified");
			if (roleRemoveLog.changes[0].new[0].name == "Muted") {
				console.log("giving back verified role ok ok ok");
				oldMember.addRole(verifiedRole);
			}
		}
	}
});


bot.on("disconnect", () => {
	process.exit(22)
});

bot.login(config.token, {disableEveryone: true});
