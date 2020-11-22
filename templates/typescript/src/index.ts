const chalk = require('chalk');
const boxen = require('boxen');

export const sum = (...a: number[]) => a.reduce((acc, val) => acc + val, 0);

console.log(boxen(chalk.blue('Hello world!'), { padding: 1, margin: 1 }));
