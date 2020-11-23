const readline = require('readline');
const fs = require('fs');
const path = require('path');

export const readFile = async (fileName = 'data.txt') => {
  const lines = [];
  const instream = fs.createReadStream(path.resolve(process.cwd(), fileName));
  const rl = readline.createInterface({ input: instream });

  for await (const line of rl) {
    lines.push(line);
  }

  return lines;
};
