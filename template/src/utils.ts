const readline = require('readline');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const boxen = require('boxen');

export const readFile = async (fileName = 'input.txt') => {
  const lines: string[] = [];
  const instream = fs.createReadStream(path.resolve(process.cwd(), fileName));
  const rl = readline.createInterface({ input: instream });

  for await (const line of rl) {
    lines.push(line);
  }

  return lines;
};

export const readTestFile = async () => await readFile('test.txt');

export function shout(message: string | number) {
  if (typeof message === 'number') {
    message = message.toString();
  }
  console.log(boxen(chalk.blue(message), { padding: 1, margin: 1 }));
}
