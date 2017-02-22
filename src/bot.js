const Discord = require('discord.js');
const fs = require('fs');
const nodemon = require('nodemon');
const chalk = require('chalk');
const didYouMean = require('didyoumean2');
const simpleGit = require('simple-git')( __dirname + "/../");

const bot = exports.client = new Discord.Client();
const config = bot.config = require('./config.json');
const botSettings = bot.botSettings = require('./botSettings.json');
const utils = require('./utils');

const commands = bot.commands = {};
const needsSetup = [];

const db = bot.db = require('sqlite');
db.open('./selfbot.sqlite');

bot.on('ready', () => {

    console.log(`EliteSelfBot: Connected to ${bot.guilds.size} servers, for a total of ${bot.channels.size} channels and ${bot.users.size} users.`);

    delete bot.user.email;
    delete bot.user.verified;

    loadPlugins();

    console.log(chalk.green('\u2713') + ' Bot loaded');

    setInterval(function () {
        console.log("Automatically checking for updates!")
        updateBot().catch((err) => {
            console.error("Error while updating bot, please submit an error report, Error: " + err.stack);
        });
    }, 43200000)

    needsSetup.forEach((plugin) => {
        if (typeof plugin.setup === 'function'){
            plugin.setup(bot);
        }
    })
});

bot.on('message', msg => {
    if (msg.isMentioned(bot.user.id)){
        console.log(`[MENTION] ${msg.author.username} (${msg.author.id}) on ${msg.guild.name}/${msg.channel.name}:\n${msg.content}`);
    }

    if (msg.author.id !== bot.user.id) {
        if (msg.isMentioned(bot.user.id) && bot.afk) msg.reply(`${bot.user.username} is \u200bAFK`).then(m => m.delete(5000));
        return;
    }
    if (!msg.content.endsWith('is \u200bAFK') && bot.afk) bot.afk = false;
    if (!msg.content.startsWith(config.prefix)) return;

    let command = msg.content.split(' ')[0].substr(config.prefix.length);
    const args = msg.content.split(' ').splice(1);

    if (commands[command]) {
        msg.editEmbed = (embed) => {
            msg.edit('', {embed});
        };

        try {
            commands[command].run(bot, msg, args);
        } catch (e) {
            msg.edit(msg.author + `Error while executing command\n${e}`).then(m => m.delete(5000));
            console.error(e);
        }

    }else if (command == 'reload') {
        loadPlugins();

        msg.edit('', {
            embed: utils.embed('Reload', `Successfully reloaded all the plugins!`)
        }).then(m => m.delete(10000));

    }else if (command == 'update'){
        msg.edit(":arrows_counterclockwise: Checking for an update..");
        updateBot(msg).then(() => {
            msg.edit(':white_check_mark: Successfully updated EliteSelfBot!').then(m => m.delete(2000));
        }).catch((err) => {
            msg.edit(':no_entry_sign: Error occurred while trying to update!').then(m => m.delete(2000));
        });

    } else {
        var maybe = didYouMean(command, Object.keys(commands), {
            threshold: 5,
            thresholdType: 'edit-distance'
        });

        if (maybe) {
            msg.edit(`:question: Did you mean \`${config.prefix}${maybe}\`?`).then(m => m.delete(5000));

        } else {
            msg.edit(`:no_entry_sign: No commands were found that were similar to \`${config.prefix}${command}\``).then(m => m.delete(5000));
        }
    }
});

bot.login(config.botToken);

process.on('uncaughtException', (err) => {
    let errorMsg = err.stack.replace(new RegExp(`${__dirname}\/`, 'g'), './');
    console.error("Uncaught Exception" + errorMsg);
});

process.on('unhandledRejection', err => {
    console.error('Uncaught Promise Error: \n' + err.stack);
});

function loadPlugins() {
    fs.readdirSync(__dirname + '/commands/').forEach(file => {
        if (file.startsWith('_') || !file.endsWith('.js')) return;
        var command = require(`./commands/${file}`);
        if (typeof command.run !== 'function' || typeof command.info !== 'object' || typeof command.info.name !== 'string') {
            console.log(`Invalid command file: ${file}`);
            return;
        }
        commands[command.info.name] = command;

        if (typeof command.setup === 'function'){
            needsSetup.push(command);
        }
    });
}

function updateBot(msg) {

    return new Promise(function (resolve, reject) {
        console.info("Checking for update...");

        simpleGit.pull("https://github.com/XeliteXirish/EliteSelfBot.git", function (err, response) {
            if (err){
                console.error("Looks like an error occured while updating! Please contact XeltieXirish!");
                reject(err);
            }else {
                console.info("Looks like there was no errors! Nodemon should restart the application if needed!")
                resolve();
            }
        })
    })
}
