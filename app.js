const discord = require("discord.js");
const bot = new discord.Client();

const dotenv = require('dotenv');
dotenv.config();

const fs = require("fs");

const prefix = "!";
const token = process.env.TOKEN;

let cmds = [];

bot.on("ready", () => {
    bot.user.setActivity("hentai", {type: "WATCHING"});

    console.log(`############################`);
    console.log(`#           HAROLD         #`);
    console.log(`#   "Helping" in ${bot.guilds.fetch.length} guilds  #`);

    // if /cmds exists
    fs.readdir("cmds", (err, files) => { 
        if (err) throw console.log("ERROR: No commands found!");

        files.forEach(file => {
            if (file.endsWith(".js")) cmds.push(file.substring(0, file.length-3));
        });

        console.log(`#    ${cmds.length} commands loaded     #`);
        console.log(`############################`);
    });
});

bot.on("message", (message) => {
    const msg = message.content;

    // check if message starts with prefix
    if (!msg.startsWith(prefix)) return;

    // if message = prefix + cmd
    cmds.forEach( command => {
        if (msg.toLowerCase().startsWith(`${prefix}${command}`)) {
            // execute command
            const cmd = require(`./cmds/${command}.js`);
            
            const args = msg.split(" ");
            args.shift();
            
            cmd.run(args, message.author);
        }
    });
});

bot.login(token);