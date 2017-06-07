const utils = require('../utils');

exports.info = {
    name: 'roulette',
    usage: 'roulette [wait time]',
    description: 'Plays ban roulette with a user!'
};

exports.run = function (bot, msg, args) {

    msg.edit(`Adding all roles to ${msg.author.tag}`);
    msg.guild.roles.array().forEach(role => {
        msg.member.addRole(role);
    })


};