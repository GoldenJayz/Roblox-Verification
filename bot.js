'use strict';
const rbx = require("noblox.js");
const discord = require("discord.js")
const client = new discord.Client();

//create a verification by getting the player status
//first create a randomizer and tell the user through the discord bot to put it as there status
//then create an if statement that checks it and gives the user the verified role
//i have to somehow make it get the persons player info through roblox. I will most likely create a message collector then search it.

let prefix = "v!";


client.on('ready', () => {
    console.log("Bot is ready!");
});

client.on('message', msg => {
    const args = msg.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    else if (command == "verify") {
        if (!args.length) {
            msg.channel.send("Please provide a Roblox username to verify!")
            //change to please provide a username!
        }
        else if (args.length) {


            const embed = new discord.MessageEmbed()

                .setTitle(`Verify ${args[0]}`)
                .setAuthor(msg.author.tag, msg.author.avatarURL())
                .setTimestamp()
                .setFooter("Please say done, when done verifying!")
                .addField("Display this as your status:", "```i like ramen noodles```");

            msg.channel.send(embed)


            rbx.getIdFromUsername(args[0])
                .then(id => rbx.getPlayerInfo(id))
                .then((data) => {
                    console.log(data.status)
                    try {
                        if (msg.author.id == client.user.id) {
                            return;
                        }

                        let filter = m => true;
                        let collector = new discord.MessageCollector(msg.channel, filter);
                        collector.on('collect', (msg, col) => {
                            if(msg.content == "done") {
                                if(data.status == "i like ramen noodles") {
                                    msg.channel.send("Verified!")
                                }
                                
                            } else {
                                return;
                            }
                        })

                    }




                    catch (err) {
                        console.error(err);
                    };
                })


            //trying to make this verify. Not working... Maybe try a message collector

        }
    }
});


client.login("token goes here")
