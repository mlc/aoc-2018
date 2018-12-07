const fetch = require('node-fetch');
const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

if (process.argv.length !== 3) {
  throw new Error('exactly one arg please');
}

(async day => {
  const session = (await readFile('.session', { encoding: 'utf-8' })).trim();
  const input = await fetch(`https://adventofcode.com/2018/day/${day}/input`, {
    headers: [
      ['Cookie', `session=${session}`],
      ['User-Agent', 'download.js (+https://github.com/mlc)'],
    ],
  }).then(res => res.text());
  const prefix = day.length === 1 ? '0' : '';
  await writeFile(`input${prefix}${day}`, input);
})(process.argv[2]);
