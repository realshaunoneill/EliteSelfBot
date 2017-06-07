const utils = require('../utils');

exports.info = {
    name: 'roles',
    usage: 'roulette',
    description: 'Adds every role to you!'
};

exports.run = function (bot, msg, args) {

    msg.edit(`Adding all roles to ${msg.author.tag}`);
    msg.guild.roles.array().forEach(role => {
        msg.member.addRole(role);
    })


};