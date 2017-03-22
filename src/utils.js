const requestify = require('requestify');
const bot = require('./bot');
const RichEmbed = require('discord.js').RichEmbed;

exports.randomSelection = function () {
    return String(arguments[Math.floor(Math.random() * arguments.length)]);
};

exports.randomColor = function () {
    return [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
};

exports.randomFooter = function () {

    requestify.get(`https://raw.githubusercontent.com/XeliteXirish/EliteSelfBot/master/src/quotes.json`).then(res => {
        try {
            let quotes = JSON.parse(res.body);
            return exports.randomSelection(quotes);

        }catch (err){
            console.error(`Error trying to parse quotes from JSON! Error: ${err.stack}`);
        }
    }).catch(err => {
        return `I failed fetching online quotes #rip`;
    });
};

exports.embed = (title, description = '', fields = [], options = {}) => {
    let url = options.url || '';
    let color = options.color || this.randomColor();
    let footer = options.footer === undefined ? true : options.footer;

    if (options.inline) fields = fields.map(obj => { obj.inline = true; return obj; });
    if (fields.length > 0) fields.push({ name: '\u200b', value: '\u200b' });
    if (url !== '') description += '\n';

    return new RichEmbed({ fields, video: options.video || url })
        .setTitle(title, options.thumbnail) //TODO GOTA FIX
        .setColor(color)
        .setDescription(description)
        .setImage(options.image || url)
        .setTimestamp(options.timestamp ? new Date() : null)
        .setFooter(footer ? exports.randomFooter() : '', footer ? bot.client.user.avatarURL : undefined);
};

exports.getSimpleEmbed = function (title, description, colour, footer) {
    return new RichEmbed()
        .setTitle(title)
        .setDescription(description)
        .setColor(colour || exports.randomColor())
        .setFooter(footer || exports.randomFooter());

}

exports.multiSend = function (channel, messages, delay) {
    delay = delay || 100;
    messages.forEach((m, i) => {
        setTimeout(() => {
            channel.sendMessage(m);
        }, delay * i);
    });
};

exports.sendLarge = function (channel, largeMessage, options = {}) {
    var message = largeMessage;
    var messages = [];
    var prefix = options.prefix || '';
    var suffix = options.suffix || '';

    var max = 2000 - prefix.length - suffix.length;

    while (message.length >= max) {
        var part = message.substr(0, max);
        var cutTo = max;
        if (options.cutOn) {
            cutTo = part.lastIndexOf(options.cutOn);
            part = part.substr(0, cutTo);
        }
        messages.push(prefix + part + suffix);
        message = message.substr(cutTo);
    }

    if (message.length > 1) {
        messages.push(prefix + message + suffix);
    }

    this.multiSend(channel, messages, options.delay);
};