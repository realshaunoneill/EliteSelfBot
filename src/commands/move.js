const utils = require('../utils');

exports.info = {
    name: 'move',
    usage: 'move [channel id]',
    description: 'Moves everyone thats in your voice channel into another room!'
};

exports.run = function (bot, msg, args) {

    if (!args.length > 0) {
        return msg.channel.sendMessage(':no_entry_sign: You must enter something to search for!');
    }

    let staffOnly = false;
    args.forEach(arg => {
        if (arg == '-s' || arg == '-staff'){
            staffOnly = true;
        }
    });

    let channelId = args[args.length - 1];
    let moveChannel = msg.guild.channels.get(channelId);

    if (!moveChannel || moveChannel.type !== 'voice') {
        return msg.reply(':no_entry_sign: The move-to channel must be a voice channel!');
    }

    let userChannel = msg.member.voiceChannel;

    if (!userChannel) {
        return msg.channel.sendMessage(':no_entry_sign: You must be in a voice channel!');
    }

    userChannel.members.array().forEach(member => {

        if (staffOnly){
            if (member.roles.exists('name', 'Staff' || member.roles.exists('name', 'staff'))){
                member.setVoiceChannel(moveChannel).catch(err => {
                    console.error(`Error moving member into that channel, Error: ${err.stack}`);
                    msg.reply(`Unable to move ${member.user.username} into that channel!`);
                });
            }
        }else {

            member.setVoiceChannel(moveChannel).catch(err => {
                console.error(`Error moving member into that channel, Error: ${err.stack}`);
                msg.reply(`Unable to move ${member.user.username} into that channel!`);
            });
        }

        msg.delete();
    })
};