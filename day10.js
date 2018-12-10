const { cloneDeep, min, max, range } = require('lodash');
const fs = require('fs');

const re = /^position=< ?(-?[0-9]+), +(-?[0-9]+)> velocity=< ?(-?[0-9]+), +(-?[0-9]+)>$/;

const input = fs
  .readFileSync('input10', 'utf-8')
  .trim()
  .split('\n')
  .map(line => {
    const m = line.match(re);
    if (!m) {
      throw new Error(line);
    }
    const [_, a, b, c, d] = m.map(Number);
    return { position: [a, b], velocity: [c, d] };
  });

const pts = cloneDeep(input);

while (true) {
  const minX = min(pts.map(({ position: [x] }) => x));
  const maxX = max(pts.map(({ position: [x] }) => x));
  const minY = min(pts.map(({ position: [x, y] }) => y));
  const maxY = max(pts.map(({ position: [x, y] }) => y));
  //console.log(maxX-minX, maxY-minY, minX, maxX, minY, maxY);

  if (minX === 199) {
    console.log(
      range(minX, maxX + 1)
        .map(x =>
          range(maxY, minY - 1, -1)
            .map(y =>
              pts.some(({ position: [x1, y1] }) => x === x1 && y === y1)
                ? '#'
                : '.'
            )
            .join('')
        )
        .join('\n')
    );
    process.exit(0);
  }

  pts.forEach(pt => {
    const {
      position: [x, y],
      velocity: [dx, dy],
    } = pt;
    pt.position = [x + dx, y + dy];
  });
}
