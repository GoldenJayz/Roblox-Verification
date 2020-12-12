'use strict';
const rbx = require("noblox.js");
const discord = require("discord.js")
const client = new discord.Client();



let prefix = "v!"; //set this to whatever u want


client.on('ready', () => {
    console.log("Bot is ready!");
});

client.on('message', msg => {
    const args = msg.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase(); //allows user to add their username

    if (!msg.content.startsWith(prefix) || msg.author.bot) return; //so the bot doesnt respond to themself

    else if (command == "verify") {
        if (!args.length) {
            msg.channel.send("Please provide a Roblox username to verify!")

        }
        else if (args.length) {

            var randa = ["pepper", "onion", "ravioli", "chesse", "pizza", "french", "light", "bulb", "cricket"];


            var rande = randa[Math.floor(Math.random()*randa.length)];
            
            var randr = randa[Math.floor(Math.random()*randa.length)];

            var randt = randa[Math.floor(Math.random()*randa.length)];

            var randy = randa[Math.floor(Math.random()*randa.length)];

            var bruh = `${rande} ${randr} ${randt} ${randy}`

            const embed = new discord.MessageEmbed()
            
            //word randomizer

                .setTitle(`Verify ${args[0]}`)
                .setAuthor(msg.author.tag, msg.author.avatarURL())
                .setTimestamp()
                .setFooter("Please say done, when done verifying!")
                .addField("Display this as your status:", "```" + bruh + "```");
            msg.channel.send(embed)

            var theid = args[0];

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
                                //when user types done it checks the status again
                                rbx.getIdFromUsername(theid)
                                .then(id => rbx.getPlayerInfo(id))
                                .then((data) => {
                                    console.log(data.status)
                                    if(data.status == bruh) {
                                        //if the status is equivalent to the one given by the bot then message verified
                                        console.log(data.status);
                                        msg.channel.send("Verified!");
                                    } else {
                                        //if not then write it doesnt match inside the terminal
                                        console.log(bruh);
                                        console.log("The status does not match!");
                                    }
                                })                           
                            }
                        })

                    }




                    catch (err) {
                        console.error(err);
                    };
                })




        }
    }
});


client.login("token goes here")
