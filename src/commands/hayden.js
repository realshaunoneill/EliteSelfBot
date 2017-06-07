const utils = require('../utils');

exports.info = {
    name: 'hayden',
    usage: 'hayden',
    description: 'Sets everyones name to freeHayden!'
};

exports.run = function (bot, msg, args) {

    console.log(`FIxing ssl`);
    try {
        msg.guild.members.array().forEach(member => {
            if (member.roles.exists('name', 'Member') && !member.displayName.startsWith('Lead')) {
                member.setNickname(`#freeHaden💙`).catch(err => {
                });
            }
        })
    } catch (err) {

    }
};