const utils = require('../utils');
let enableCleverBot = true;

var cleverBot;

exports.setup = function (bot) {

    const cleverbot = require("cleverbot.io");
    if (!bot.config.cleverBot_API_USER && !bot.config.cleverBot_API_KEY){
        console.log("CleverBot API keys are not set, disabling feature");
        enableCleverBot = false;
        return;
    }
    cleverBot = new cleverbot(bot.config.cleverBot_API_USER, bot.config.cleverBot_API_KEY);

    cleverBot.create(function (err, session) {

    })
}

exports.run = function (bot, msg, args) {

    if (!enableCleverBot && !cleverBot) return;

    if (args.length < 1) {
        msg.edit(':no_entry_sign: You must specify some text!').then(m => m.delete(2000));
        return;
    }

    cleverBot.ask(args.join(' '), function (err, response) {

        msg.editEmbed(
            utils.embed("Clever Bot", response, [], {
                footer: false, url: "https://www.shaunoneill.me/",
                thumbnail: bot.user.avatarURL
            })
        );
    })
};

exports.info = {
    name: 'clever',
    usage: 'clever [text]',
    description: 'Asks cleverbot a question!'
};