const utils = require('../utils');

exports.info = {
    name: 'quote',
    usage: 'quote [message id]',
    description: 'Quotes a users message'
};

exports.run = function (bot, msg, args) {
    if (args.length < 1) {
        msg.edit(':no_entry_sign: You must specify a message id!').then(m => m.delete(2000));
        return;
    }

    let messageId = args[0];
    console.log(messageId)

    let message = msg.channel.fetchMessages({around: messageId, limit: 1}).then(function (messages) {

        let firstMessage = messages.first();

        msg.editEmbed(
            utils.getSimpleEmbed(firstMessage.author.username, message.content).setFooter("Date: " + message.createdAt.toDateString())
        );

    }).catch(function (err) {
        msg.edit(':no_entry_sign: No message found!').then(m => m.delete(2000));
    });
};