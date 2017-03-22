const utils = require('../utils');

exports.info = {
    name: 'stats',
    usage: 'stats',
    description: 'Shows you stats about EliteSelfBot!'
};

exports.run = function (bot, msg) {

    msg.editEmbed(utils.getSimpleEmbed(`EliteSelfBot Stats`, `This message will disappear shortly!`).addField(`**Servers: **`, bot.guilds.size).addField(`**Users: **`, bot.users.size).addField(`**RAM USAGE: **`, `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`))

};