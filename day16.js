const {
  chunk,
  clone,
  intersection,
  isEqual,
  range,
  remove,
} = require('lodash');
const fs = require('fs');

const input1 = fs
  .readFileSync('input16', 'utf-8')
  .trim()
  .split('\n');

const input2 = input1
  .splice(input1.lastIndexOf('') + 1)
  .map(l => l.split(' ').map(Number));

const groups = chunk(input1, 4).slice(0, -1);

const binops = {
  add: (a, b) => a + b,
  mul: (a, b) => a * b,
  ban: (a, b) => a & b,
  bor: (a, b) => a | b,
};

const replace = (inp, c, cval) => {
  const r = clone(inp);
  r[c] = cval;
  return r;
};

const ops = Object.assign(
  {},
  {
    setr: (regs, a, b, c) => replace(regs, c, regs[a]),
    seti: (regs, a, b, c) => replace(regs, c, a),
    gtir: (regs, a, b, c) => replace(regs, c, a > regs[b] ? 1 : 0),
    gtri: (regs, a, b, c) => replace(regs, c, regs[a] > b ? 1 : 0),
    gtrr: (regs, a, b, c) => replace(regs, c, regs[a] > regs[b] ? 1 : 0),
    eqir: (regs, a, b, c) => replace(regs, c, a === regs[b] ? 1 : 0),
    eqri: (regs, a, b, c) => replace(regs, c, regs[a] === b ? 1 : 0),
    eqrr: (regs, a, b, c) => replace(regs, c, regs[a] === regs[b] ? 1 : 0),
  },
  ...Object.entries(binops).map(([k, v]) => ({
    [`${k}r`]: (regs, a, b, c) => replace(regs, c, v(regs[a], regs[b])),
    [`${k}i`]: (regs, a, b, c) => replace(regs, c, v(regs[a], b)),
  }))
);

const matches = (inregs, [opcode, a, b, c], outregs) =>
  Object.keys(ops).filter(opcode =>
    isEqual(ops[opcode](inregs, a, b, c), outregs)
  );

const findNumber = /[0-9]+/g;
const parsedGroups = groups.map(g =>
  g.map(line => {
    const numbers = line.match(findNumber);
    return numbers && numbers.map(Number);
  })
);

console.log(parsedGroups.filter(g => matches(...g).length >= 3).length);

const poss = range(0, 16).map(() => Object.keys(ops));
parsedGroups.forEach(g => {
  const opind = g[1][0];
  poss[opind] = intersection(poss[opind], matches(...g));
});

const solved = [];
while (solved.length < 16) {
  const candidate = poss.findIndex(
    r => r.length === 1 && !solved.includes(r[0])
  );
  const foundOp = poss[candidate][0];
  solved.push(foundOp);
  poss.forEach((val, i) => {
    if (i !== candidate) {
      remove(val, x => x === foundOp);
    }
  });
}

const solvedOps = poss.map(([code]) => ops[code]);

console.log(
  input2.reduce((regs, [opcode, a, b, c]) => solvedOps[opcode](regs, a, b, c), [
    0,
    0,
    0,
    0,
  ])[0]
);
