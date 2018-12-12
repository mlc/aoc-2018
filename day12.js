const { createCanvas } = require('canvas');
const { range, sum } = require('lodash');
const fs = require('fs');

const input = fs
  .readFileSync('input12', 'utf-8')
  .trim()
  .split('\n');

const istate = input[0].substring(15).split('');

const rules = Object.assign(
  {},
  ...input.slice(2).map(rule => ({ [rule.substring(0, 5)]: rule[9] }))
);

let state = istate;
let min = 0;
let iter499 = 0;

const score = () => sum(range(min, state.length).filter(i => state[i] === '#'));

const canvas = createCanvas(1300, 1000);
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#ffffff';
ctx.fillRect(0, 0, 1300, 1000);
ctx.fillStyle = '#007f00';

range(1, 501).forEach(iter => {
  const newState = [];
  range(min - 2, state.length + 2).forEach(i => {
    newState[i] =
      rules[
        range(i - 2, i + 3)
          .map(i => state[i] || '.')
          .join('')
      ] || '.';
  });
  state = newState;
  if (newState[min - 2] === '#') {
    min -= 2;
  } else if (newState[min - 1] === '#') {
    min -= 1;
  }
  // console.log(
  //   range(min, state.length)
  //     .map(i => state[i])
  //     .join('')
  // );
  if (iter === 20) {
    console.log(score());
  } else if (iter === 499) {
    iter499 = score();
  }

  range(min, state.length).forEach(i => {
    if (state[i] === '#') {
      ctx.fillRect(2 * i + 20, 2 * (iter - 1), 2, 2);
    }
  });
});

const dscore = score() - iter499;
console.log((50000000000 - 499) * dscore + iter499);

fs.writeFileSync('vis12.png', canvas.toBuffer('image/png'));
