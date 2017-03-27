const request = require('request');
const utils = require('../utils');

const maxIter = 10;

exports.info = {
    name: 'redirect',
    usage: 'redirect [url]',
    description: 'Displays the redirects of a url!'
};

const urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

exports.run = function (bot, msg, args) {

    try {
        let matchs = msg.content.match(urlRegex);
        if (!matchs || matchs.length == 0){
            return;
        }

        for (let link of matchs){

            getRedir(link, (redirs) => {
                let temp = [];
                let alrd = [];

                let c = 1, counter = 1;

                outer: for (let x of redirs) {
                    for (let x2 of alrd) {
                        if (x.replaceAll('/', '').replaceAll('www.', '').trim() === x2.replaceAll('/', '').replaceAll('www.', '').trim())
                            continue outer;
                    }
                    temp.push(`**#${c++}**: \`${x}\``);
                    alrd.push(x);
                }

                if (temp.length <= 1)return;

                let embed = utils.getSimpleEmbed("Redirects", 'That links redirects to the following links, be careful!', utils.randomColor());
                temp.forEach(item => {
                    embed.addField(`Redirect ${counter}`, item);
                    counter++;
                });

                msg.editEmbed(embed);
            })

        }
    }
};

let getRedir = function(url, callback, cur = [], iter = 0) {

    iter++;
    request({ url: url, followRedirect: false }, (err, res, body) => {
        if(!res.headers.location || iter >= maxIter)
            return callback(cur);
        cur.push(res.headers.location);
        getRedir(res.headers.location, callback, cur, iter);
    });
}