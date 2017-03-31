const utils = require('../utils');
const fs = require('fs');

const shutdownUsers = require('./../data/shutdown_users.json');

exports.info = {
    name: 'shutdown',
    usage: 'shutdown [Message] | shutdown add [user] | shutdown del [user] | shutdown list',
    description: 'Allows people to shutdown the bot safely with a custom message!'
};

exports.run = function (bot, msg, args) {

    if (!args.length > 0) {
        return msg.channel.sendMessage(':no_entry_sign: You must specify a reason or a parameter!');
    }

    let param = args[0];

    if (param == 'add') {
        // Add
        if (msg.mentions.users.array().length == 0) {
            shutdownUsers.allowedUsers.push(args[1]);

            let embed = utils.getSimpleEmbed('List Updated!', `You have successfully added ${args[1]}!`, utils.randomColor());
            msg.channel.sendEmbed(embed).then(m => {m.delete(20000)})

        }else {
            msg.mentions.users.array().forEach(user => {
                shutdownUsers.allowedUsers.push(user.id);

                let embed = utils.getSimpleEmbed('List Updated!', `You have successfully added ${user.username}!`, utils.randomColor());
                msg.channel.sendEmbed(embed).then(m => {m.delete(20000)})
            })
        }

        updateJson();

    } else if (param == 'del') {
        // Del
        if (msg.mentions.users.array().length == 0) {
            let index = shutdownUsers.allowedUsers.indexOf(args[1]);

            if (index > -1) {
                shutdownUsers.allowedUsers.splice(index, 1);

                let embed = utils.getSimpleEmbed('List Updated!', `You have successfully removed ${args[1]}!`, utils.randomColor());
                msg.channel.sendEmbed(embed).then(m => {
                    m.delete(20000)
                })
            } else {

            }
        } else {
            msg.mentions.users.array().forEach(user => {

                let index = shutdownUsers.allowedUsers.indexOf(user.id);
                if (index > -1) {
                    shutdownUsers.allowedUsers.splice(index, 1);

                    let embed = utils.getSimpleEmbed('List Updated!', `You have successfully removed ${user.username}!`, utils.randomColor());
                    msg.channel.sendEmbed(embed).then(m => {
                        m.delete(20000)
                    })
                }
            });
        }
        updateJson();

    }else if (param == 'list'){
        // List
        if (shutdownUsers.allowedUsers.length > 0) {

            let embed = utils.getSimpleEmbed("Shutdown Users", 'These users have the power to shut down the bot!', utils.randomColor(), utils.randomFooter());
            shutdownUsers.allowedUsers.forEach(member => {
                embed.addField(member.username, member.id, true);
            });
            msg.editEmbed(embed);

        }else {
            msg.reply(':no_entry_sign: No users are currently listed!').then(msg => {msg.delete(2000)});
        }

    } else {
        // Shutdown
        let authorId = msg.author.id;

        if (shutdownUsers.allowedUsers.indexOf(authorId) > -1){
            msg.reply(':ballot_box_with_check: EliteSelfBot is turning off...');

            console.info(`The bot has been shut down by ${msg.author.username}, Reason: ${param}`)
            process.exit(0);
        }else {
            let embed = utils.getSimpleEmbed("Unauthorised!", 'Sorry but you dont have permission to use this command!', utils.randomColor());
            msg.channel.sendEmbed(embed).then(m => {m.delete(20000)})
        }
    }
};

function updateJson() {
    fs.writeFile(`${__dirname}/../data/shutdown_users.json`, JSON.stringify(shutdownUsers, null, 2), function (err) {
        if (err) return console.log(err);

    });
}