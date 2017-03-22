const utils = require('../utils');

exports.run = function (bot, msg, args) {
    if (args.length < 1) {
        msg.edit(':no_entry_sign: You must specify some text!').then(m => m.delete(2000));
        return;
    }

    msg.editEmbed(
        utils.getSimpleEmbed(bot.user.username, args.join(' ')).setFooter('[Created by XeliteXirish!]', 'https://www.shaunoneill.com/assets/logo.png')
    );
};

exports.info = {
    name: 'embed',
    usage: 'embed [text]',
    description: 'Sends a message via embeds'
};