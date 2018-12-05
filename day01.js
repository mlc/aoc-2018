const fs = require('fs');

const ns = fs
  .readFileSync('input01', 'utf-8')
  .trim()
  .split('\n')
  .map(Number);

console.log(ns.reduce((a, b) => a + b));

const found = new Set();
let accum = 0;
while (
  !ns.some(n => {
    // console.log([accum, n]);
    if (found.has(accum)) {
      console.log(accum);
      return true;
    } else {
      found.add(accum);
    }
    accum += n;
    return false;
  })
);
