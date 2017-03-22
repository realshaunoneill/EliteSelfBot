const utils = require('../utils');

const test = `
\`
this is a bot test
\`
`;
const tests = `
\`
test
\`
`;
exports.run = function (bot, msg) {
    msg.edit(test)
	
	.then(msg.edit(tests))
	.then(m => m.delete(2000));
};

exports.info = {
    name: 'test',
    usage: 'test',
    description: 'test message that deletes itself after 10 seconds'
};