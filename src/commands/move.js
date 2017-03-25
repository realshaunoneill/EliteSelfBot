const utils = require('../utils');

exports.info = {
    name: 'move',
    usage: 'move [channel id]',
    description: 'Moves everyone thats in your voice channel into another room!'
};

exports.run = function (bot, msg, args) {

    if (!args.length > 0){
        return msg.channel.sendMessage(':no_entry_sign: You must enter something to search for!');
    }

    let channelId = args[0];
    let moveChannel = msg.guild.channels.get(channelId);

    if (moveChannel){
        let userChannel = msg.member.voiceChannel;

        if (!userChannel){
            return msg.channel.sendMessage(':no_entry_sign: You must be in a voice channel!');
        }

        Array.from(userChannel.members).forEach(member => {
            member.setVoiceChannel(moveChannel.id).catch(err => {
                console.error(`Error moving member into that channel, Error: ${err.stack}`);
                msg.reply(`Unable to move ${member.user.username} into that channel!`);
            })
        })
    }
};