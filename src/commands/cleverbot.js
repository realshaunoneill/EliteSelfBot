const utils = require('../utils');
let enableCleverBot = true;

let cleverbot = require('cleverbot-node');
let talkbot = new cleverbot();

exports.info = {
    name: 'clever',
    usage: 'clever [text]',
    description: 'Asks cleverbot a question!'
};

exports.run = function (bot, msg, args) {

    if (args.length < 1) {
        msg.edit(':no_entry_sign: You must specify some text!').then(m => m.delete(2000));
        return;
    }

    let question = args.join(' ');
    talkbot.write(question, res => {
        console.log(JSON.stringify(res))
        let embed = utils.getSimpleEmbed('', res, utils.randomColor()).setAuthor('Clever Bot', 'http://img.shaunoneill.com/images/2017/03/26/opera_2017-03-26_17-58-34.png').setFooter(utils.randomFooter());
        msg.channel.sendEmbed(embed).then(msg => {
            msg.react('👌');
        });
    })

};