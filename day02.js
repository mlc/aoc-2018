const fs = require("fs");

const input = fs
  .readFileSync("input02", "utf-8")
  .trim()
  .split("\n");

// const input = [
//   "abcdef",
//   "bababc",
//   "abbcde",
//   "abcccd",
//   "aabcdd",
//   "abcdee",
//   "ababab"
// ];

const finds = input.map(line => {
  const p = {};
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    p[ch] = (p[ch] || 0) + 1;
  }
  return p;
});

console.log(
  finds.filter(p => Object.values(p).includes(2)).length *
    finds.filter(p => Object.values(p).includes(3)).length
);

const pairs = [].concat(...input.map(i => input.map(j => [i,j])));

const p = pairs.find(([a,b]) => {
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      mismatch++;
    }
  }
  return mismatch === 1;
});

console.log(p[0]);
console.log(p[1]);
