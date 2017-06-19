const utils = require('../utils');

exports.info = {
    name: 'copyembed',
    usage: 'copyembed [message id] | [channel mention]',
    description: 'Copies an embed and sends the exact same one in the current channel!'
};

exports.run = function (bot, msg, args) {

    if (args.length > 0) {

        if (msg.mentions.channels.array().length > 0) {
            let messageId = args[0];
            let message = msg.channel.fetchMessage(messageId).then(copied => {

                if (msg.embeds.length > 0) {
                    msg.mentions.channels.array()[0].send({embed: msg.embeds[0]});
                }else {
                    msg.edit(`Sorry but that message doesn't appear to be an embed in that message!`)
                }
            }).catch(err => {
                msg.edit(`Unable to find a message with that id in this channel!`)
            })

        } else {

            let messageId = args[0];
            let message = msg.channel.fetchMessage(messageId).then(copied => {
                if (msg.embeds.length > 0) {
                    msg.mentions.channels.array()[0].send({embed: msg.embeds[0]});
                }else {
                    msg.edit(`Sorry but that message doesn't appear to be an embed in that message!`)
                }
            }).catch(err => {
                msg.edit(`Unable to find a message with that id in this channel!`)
            })
        }
    } else {
        msg.edit(`You need to specify a message id to search for an embed!`);
    }
};