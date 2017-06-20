const utils = require('../utils');
const RichEmbed = require('discord.js').RichEmbed;

exports.info = {
    name: 'copyembed',
    usage: 'copyembed [message id] | [channel mention]',
    description: 'Copies an embed and sends the exact same one in the current channel!'
};

exports.run = function (bot, msg, args) {
    try {
        if (args.length > 0) {

            if (msg.mentions.channels.array().length > 0) {

                let messageId = args[0];

                msg.channel.fetchMessage(messageId).then(messageCopy => {
                    if (messageCopy.embeds.length > 0) {

                        let copied = messageCopy.embeds[0];

                        let embed = new RichEmbed();
                        if (copied.author) embed.setAuthor(copied.author);
                        if (copied.color) embed.setColor(copied.color);
                        if (copied.description) embed.setDescription(copied.description);
                        copied.fields.forEach(field => {
                            embed.addField(field);
                        });
                        if (copied.footer) embed.setFooter(copied.footer);
                        if (copied.image) embed.setImage(copied.image);
                        if (copied.thumbnail) embed.setThumbnail(copied.thumbnail);
                        if (copied.title) embed.setTitle(copied.title);
                        if (copied.url) embed.setURL(copied.url);

                        msg.mentions.channels.first().send({embed}).catch(err => {
                            msg.edit(`Sorry but you need to specify a channel to send the embed too!`)
                        }).catch(err => {
                            console.error(`Unable to send embed, Error: ${err.stack}`);
                        });
                    } else {
                        msg.edit(`Sorry but that message doesn't appear to be an embed in that message!`)
                    }
                }).catch(err => {

                    msg.edit(`Unable to find a message with that id in this channel!`);
                })
            } else {

                let messageId = args[0];

                msg.channel.fetchMessage(messageId).then(messageCopy => {
                    if (messageCopy.embeds.length > 0) {
                        let copied = messageCopy.embeds[0];

                        let embed = new RichEmbed();
                        if (copied.author) embed.setAuthor(copied.author);
                        if (copied.color) embed.setColor(copied.color);
                        if (copied.description) embed.setDescription(copied.description);
                        copied.fields.forEach(field => {
                            embed.addField(field);
                        });
                        if (copied.footer) embed.setFooter(copied.footer);
                        if (copied.image) embed.setImage(copied.image);
                        if (copied.thumbnail) embed.setThumbnail(copied.thumbnail);
                        if (copied.title) embed.setTitle(copied.title);
                        if (copied.url) embed.setURL(copied.url);

                        msg.channel.send({embed}).catch(err => {
                            console.error(`Unable to send embed, Error: ${err.stack}`);
                        });
                    } else {
                        msg.edit(`Sorry but that message doesn't appear to be an embed in that message!`);
                    }
                }).catch(err => {
                    msg.edit(`Unable to find a message with that id in this channel!`);
                    console.log(err.stack)
                })
            }
        } else {
            msg.edit(`You need to specify a message id to search for an embed!`);
        }
    }catch (err){
        console.error(`Error running command, Error: ${err.stack}`);
    }
};