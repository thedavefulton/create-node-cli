const readline = require('readline');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const boxen = require('boxen');

export const readFile = async (fileName = 'data.txt') => {
  const lines: string[] = [];
  const instream = fs.createReadStream(path.resolve(process.cwd(), fileName));
  const rl = readline.createInterface({ input: instream });

  for await (const line of rl) {
    lines.push(line);
  }

  return lines;
};

export function shout(message: string | number) {
  if (typeof message === 'number') {
    message = message.toString();
  }
  console.log(boxen(chalk.blue(message), { padding: 1, margin: 1 }));
}
