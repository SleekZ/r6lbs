const Discord = module.require("discord.js");
const fs = module.require("fs");

module.exports.run = async (bot, message, args, con) => {

	async function sleep(millis) {
		return new Promise(resolve => setTimeout(resolve, millis));
	}

	message.delete();

	let test = ["Topfrag", "on", "absolute", "top"]

	let embed0 = new Discord.RichEmbed()
		.setColor('#0099ff')
		.setAuthor("Picking event")
		.setDescription(`Please wait...`) 

	msg = await message.channel.send(embed0)

	function makeEmbed(option) {
		switch (option) {
			case "Topfrag":
				let embed = new Discord.RichEmbed()
					.setColor('#0099ff')
					.setAuthor("Picking event")
					.setDescription(`**Topfrag** on absolue top`)
				msg.edit(embed)
				break;
			case "on":
				let embed1 = new Discord.RichEmbed()
					.setColor('#0099ff')
					.setAuthor("Picking event")
					.setDescription(`Topfrag **on** absolute top`)
				msg.edit(embed1)
				break;
			case "absolute":
				let embed2 = new Discord.RichEmbed()
					.setColor('#0099ff')
					.setAuthor("Picking event")
					.setDescription(`Topfrag on **absolute** top`)
				msg.edit(embed2)
				break;
			case "top":
				let embed3 = new Discord.RichEmbed()
					.setColor('#0099ff')
					.setAuthor("Picking event")
					.setDescription(`Topfrag on absolute **top**`)
				msg.edit(embed3);
				break;
			case "done":
				let embed5 = new Discord.RichEmbed()
					.setColor('#32CD32')
					.setAuthor("Event Picked!")
					.setDescription(`--> **${last} Event** <--`)
				msg.edit(embed5)	
		}
	}

	sleep(1000)

	let last;

	for(i = 0; i < 5; i++) {
		let a = test[Math.floor(Math.random() * test.length)]
		if (last != a) {
			last = a;
			makeEmbed(a);
			await sleep(1000);
		} else {
			i = i-1;
		}
	}

	makeEmbed("done")

}

module.exports.help = {
    name: "smartiepastes"
}