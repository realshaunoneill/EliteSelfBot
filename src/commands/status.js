const utils = require('../utils');

let statuses = {
    "online": "online",
    "away": "idle",
    "busy": "dnd",
    "invisible": "invisible",
};

exports.info = {
    name: 'status',
    usage: 'status [online] | [away] | [busy] | [invisible]',
    description: 'Changes the online status of the bot!'
};

exports.run = function (bot, msg, args) {

    let status = statuses[args[0].toLowerCase()];
    if(!status) {
        return msg.edit(`:no_entry_sign: ${status} isn't a valid status!`).then(msg.delete(2000));
    }

    bot.user.setStatus(status).then(u => {
        msg.edit(`Status has been changed to ${status}`).then(m => {m.delete(2000)})
    }).catch(err => {
        console.error(`Error while changing the bot status, Error: ${err.stack}`)
    })

};