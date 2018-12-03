const { range } = require("lodash");

const fs = require("fs");

const re = /^#([0-9]+) @ ([0-9]+),([0-9]+): ([0-9]+)x([0-9]+)$/;

const input = fs
  .readFileSync("input03", "utf-8")
  .trim()
  .split("\n")
  .map(line => {
    const [_, n, x, y, w, h] = line.match(re).map(Number);
    return { n, x, y, w, h };
  });

const grid = range(1000).map(i => range(1000).map(j => 0));

input.forEach(({ x, y, w, h }) => {
  range(x, x + w).forEach(i => range(y, y + h).forEach(j => grid[i][j]++));
});

const olaps = grid.map(p => p.filter(n => n>=2).length).reduce((a,b) => a+b);
console.log(olaps);

input.forEach(({ n, x, y, w, h }) => {
  if (range(x, x + w).every(i => range(y, y + h).every(j => grid[i][j] === 1))) {
    console.log(n);
  }
});
