const utils = require('../utils');

exports.run = function (bot, msg, args) {
    if (args.length < 1) {
        msg.edit(':no_entry_sign: You must specify a message id!').then(m => m.delete(2000));
        return;
    }

    let messageId = args[0];
    let message = msg.channel.fetchMessage(messageId);

    if (message) {
        msg.editEmbed(
            utils.embed(bot.user.username, message.content, [], {
                footer: true,
                url: "https://www.shaunoneill.me/",
                image: message.user.avatarURL
            }).addField("Date", message.createdAt.toDateString())
        );
    }else {
        msg.edit(':no_entry_sign: No message found!').then(m => m.delete(2000));
    }
};

exports.info = {
    name: 'quote',
    usage: 'quote [message id]',
    description: 'Quotes a users message'
};