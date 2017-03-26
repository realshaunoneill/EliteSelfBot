const utils = require('../utils');
let enableCleverBot = true;

var cleverBot;

exports.info = {
    name: 'clever',
    usage: 'clever [text]',
    description: 'Asks cleverbot a question!'
};

exports.setup = function (bot) {
    if (!bot.config.cleverBot_API_USER && !bot.config.cleverBot_API_KEY){
        console.log("CleverBot API keys are not set, disabling feature");
        enableCleverBot = false;
        return;
    }
    const cleverbot = require('cleverbot.io');
    cleverBot = new cleverbot(bot.config.cleverBot_API_USER, bot.config.cleverBot_API_KEY);
    cleverBot.create();
}

exports.run = function (bot, msg, args) {
    if (!enableCleverBot && !cleverBot){
        msg.edit(`:no_entry_sign: CleverBot api details havn't been set yet!`).then(m => m.delete(2000));
        return;
    }

    if (args.length < 1) {
        msg.edit(':no_entry_sign: You must specify some text!').then(m => m.delete(2000));
        return;
    }

    let question = args.join(' ');
    cleverBot.ask(question, (err, res) => {
        if (err){
            console.log(`An error occured while retieving data from CleverBot, Error: ${err.stack}`);
            return;
        }

        console.log(JSON.stringify(res))
        let embed = utils.getSimpleEmbed('', res, utils.randomColor()).setAuthor('Clever Bot', 'http://img.shaunoneill.com/images/2017/03/26/opera_2017-03-26_17-58-34.png').setFooter(utils.randomFooter());
        msg.channel.sendEmbed(embed).then(msg => {
            msg.react('👌');
        });
    })

};