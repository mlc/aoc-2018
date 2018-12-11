const { range, sum } = require('lodash');
const fs = require('fs');

const serNum = Number(fs.readFileSync('input11', 'utf-8').trim());

const power = (x, y) => {
  const rackId = x + 10;
  const plevel = (rackId * y + serNum) * rackId;
  return (Math.floor(plevel / 100) % 10) - 5;
};

let best = -999;
let bestC = [0, 0];

const square = (x, y, size) =>
  sum(
    range(x, x + size).map(tx =>
      sum(range(y, y + size).map(ty => power(tx, ty)))
    )
  );

range(0, 298).forEach(x => {
  range(0, 298).forEach(y => {
    const cand = square(x, y, 3);

    if (cand > best) {
      best = cand;
      bestC = [x, y];
    }
  });
});

console.log(bestC.join(','));

best = -999;
bestC = [0, 0, 0];

range(0, 300).forEach(x => {
  range(0, 300).forEach(y => {
    range(1, Math.min(20, 300 - Math.max(x, y))).forEach(size => {
      const cand = square(x, y, size);

      if (cand > best) {
        best = cand;
        bestC = [x, y, size];
      }
    });
  });
});

console.log(bestC.join(','));
