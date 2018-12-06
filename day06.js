const { max, min, range, sumBy } = require('lodash');
const fs = require('fs');

const input = fs
  .readFileSync('input06', 'utf-8')
  .trim()
  .split('\n')
  .map(line => line.split(', ').map(Number));

const minX = min(input.map(([x]) => x));
const minY = min(input.map(([x, y]) => y));
const maxX = max(input.map(([x]) => x));
const maxY = max(input.map(([x, y]) => y));

const manDist = ([x1, y1], [x2, y2]) => Math.abs(x1 - x2) + Math.abs(y1 - y2);

// PART 1

// find size of each island's territory

const counts = Array(input.length);

range(minX + 1, maxX).forEach(x =>
  range(minY + 1, maxY).forEach(y => {
    const p = [x, y];
    const dists = input.map(island => manDist(island, p));
    const minDist = min(dists);
    const islands = dists.filter(dist => dist === minDist);
    if (islands.length === 1) {
      const idx = dists.indexOf(minDist);
      counts[idx] = (counts[idx] || 0) + 1;
    }
  })
);

// filter out islands with infinite size.
const badIdx = new Set();

range(minX + 1, maxX).forEach(x => {
  const p = [x, minY];
  const dists = input.map(island => manDist(island, p));
  const minDist = min(dists);
  badIdx.add(dists.indexOf(minDist));
});
range(minX + 1, maxX).forEach(x => {
  const p = [x, maxY];
  const dists = input.map(island => manDist(island, p));
  const minDist = min(dists);
  badIdx.add(dists.indexOf(minDist));
});
range(minY + 1, maxY).forEach(y => {
  const p = [minX, y];
  const dists = input.map(island => manDist(island, p));
  const minDist = min(dists);
  badIdx.add(dists.indexOf(minDist));
});
range(minY + 1, maxY).forEach(y => {
  const p = [maxX, y];
  const dists = input.map(island => manDist(island, p));
  const minDist = min(dists);
  badIdx.add(dists.indexOf(minDist));
});

badIdx.forEach(i => (counts[i] = 0));
console.log(max(counts));

// PART 2

let count = 0;

range(minX - 100, maxX + 100).forEach(x => {
  range(minY - 100, maxY + 100).forEach(y => {
    const p = [x, y];
    if (sumBy(input, island => manDist(island, p)) < 10000) {
      count++;
    }
  });
});

console.log(count);
