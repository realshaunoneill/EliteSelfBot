const utils = require('../utils');

exports.info = {
    name: 'roulette',
    usage: 'roulette [wait time]',
    description: 'Plays ban roulette with a user!'
};

exports.run = function (bot, msg, args) {

    msg.mentions.users.array().forEach(user => {

        let waitTime = 30;
        if (args.length > 0) waitTime = args[0];

        msg.channel.send(`-ban ${user.toString()}`);
        msg.channel.send(`Ban roulette fun!`);

        setTimeout(function () {
            msg.channel.send('1')
        }, (Math.floor(Math.random() * waitTime * 1000) + 1))
    })
};