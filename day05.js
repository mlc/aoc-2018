const { min } = require('lodash');
const fs = require('fs');

const input = fs.readFileSync('input05', 'utf-8').trim();

const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
const re = new RegExp(
  letters.map(l => `${l}${l.toUpperCase()}|${l.toUpperCase()}${l}`).join('|'),
  'g'
);

const react = okay => {
  let i = okay;
  while (true) {
    const j = i.replace(re, '');
    if (i === j) {
      return i;
    }
    i = j;
  }
};

console.log(react(input).length);

console.log(
  min(
    letters.map(l => {
      const i = input.replace(new RegExp(l, 'ig'), '');
      return react(i).length;
    })
  )
);
