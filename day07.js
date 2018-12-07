const { groupBy, range, remove, uniq } = require('lodash');
const fs = require('fs');

const re = /^Step (.) must be finished before step (.) can begin.$/;

const input = fs
  .readFileSync('input07', 'utf-8')
  .trim()
  .split('\n')
  .map(str => {
    const [_, a, b] = str.match(re);
    return [a, b];
  });

const steps = uniq([].concat(...input)).sort();
let prereqs = Object.assign({}, ...steps.map(s => ({ [s]: [] })));
input.forEach(([a, b]) => prereqs[b].push(a));
let done = [];

while (Object.keys(prereqs).length > 0) {
  const [letter] = Object.entries(prereqs).find(
    ([_, prereq]) => prereq.length === 0
  );
  done.push(letter);
  delete prereqs[letter];
  Object.keys(prereqs).forEach(k => {
    remove(prereqs[k], a => a === letter);
  });
}

console.log(done.join(''));

prereqs = Object.assign({}, ...steps.map(s => ({ [s]: [] })));
input.forEach(([a, b]) => prereqs[b].push(a));
done = [];
let t = 0;
const workers = range(0, 5).map(r => ({ id: r }));

while (Object.keys(prereqs).length > 0 || workers.some(w => w.task)) {
  // console.log(workers);
  workers.forEach(worker => {
    if (worker.task) {
      worker.time -= 1;
      if (worker.time === 0) {
        done.push(worker.task);
        Object.keys(prereqs).forEach(k => {
          remove(prereqs[k], a => a === worker.task);
        });
        delete worker.task;
      }
    }
  });

  workers.forEach(worker => {
    if (!worker.task) {
      const candidate = Object.entries(prereqs).find(
        ([_, prereq]) => prereq.length === 0
      );
      if (candidate) {
        const [letter] = candidate;
        delete prereqs[letter];
        worker.time = letter.charCodeAt(0) - 4;
        worker.task = letter;
      }
    }
  });
  t++;
}

console.log(t - 1);
