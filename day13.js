const fs = require('fs');

const input = fs
  .readFileSync('input13', 'utf-8')
  .split('\n')
  .map(line => line.split(''));

const carts = [];

input.forEach((line, y) => {
  line.forEach((ch, x) => {
    if (ch === '<') {
      carts.push({ pos: [x, y], v: [-1, 0], op: 0 });
      input[y][x] = '-';
    } else if (ch === '>') {
      carts.push({ pos: [x, y], v: [1, 0], op: 0 });
      input[y][x] = '-';
    } else if (ch === '^') {
      carts.push({ pos: [x, y], v: [0, -1], op: 0 });
      input[y][x] = '|';
    } else if (ch === 'v') {
      carts.push({ pos: [x, y], v: [0, 1], op: 0 });
      input[y][x] = '|';
    }
  });
});

const applyOp = ([dx, dy], op) => {
  switch (op) {
    case 0:
      return [dy, -dx];

    case 1:
      return [dx, dy];

    case 2:
      return [-dy, dx];
  }
};

while (true) {
  carts.sort(({ pos: [x1, y1] }, { pos: [x2, y2] }) => y1 - y2 || x1 - x2);
  //console.log(carts);
  carts.forEach(cart => {
    if (!cart.dead) {
      const [dx, dy] = cart.v;
      cart.pos[0] = cart.pos[0] + dx;
      cart.pos[1] = cart.pos[1] + dy;
      const [x, y] = cart.pos;

      if (
        carts.some(
          tc => tc !== cart && !tc.dead && tc.pos[0] === x && tc.pos[1] === y
        )
      ) {
        console.log(`crash! ${x},${y}`);
        while (true) {
          let io = carts.findIndex(
            tc => !tc.dead && tc.pos[0] === x && tc.pos[1] === y
          );
          if (io === -1) break;
          carts[io].dead = true;
        }
      }

      switch (input[y][x]) {
        case '\\':
          cart.v = [dy, dx];
          break;
        case '/':
          cart.v = [-dy, -dx];
          break;
        case '+':
          cart.v = applyOp(cart.v, cart.op);
          cart.op = (cart.op + 1) % 3;
          break;
      }
    }
  });

  const live = carts.filter(tc => !tc.dead);
  if (live.length === 1) {
    console.log(`done! ${live[0].pos.join(',')}`);
    break;
  }
}
