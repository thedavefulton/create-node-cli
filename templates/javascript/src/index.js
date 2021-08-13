const { shout } = require('./utils');

const sum = (...a) => a.reduce((acc, val) => acc + val, 0);

shout('Hello world!');

module.exports = { sum };
