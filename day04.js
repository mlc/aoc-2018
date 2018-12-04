const { countBy, mapValues, maxBy, range } = require("lodash");
const fs = require("fs");

const input = fs
  .readFileSync("input04", "utf-8")
  .trim()
  .split("\n")
  .sort();

const guards = {};

const newshift = /^\[[0-9 :-]+\] Guard #([0-9]+) begins shift$/;
const asleep = /^\[[0-9-]+ 00:([0-9][0-9])\] falls asleep$/;
const awake = /^\[[0-9-]+ 00:([0-9][0-9])\] wakes up$/;

let curguard = "0";
let asleeptime = 0;
input.forEach(line => {
  const m1 = line.match(newshift);
  const m2 = line.match(asleep);
  const m3 = line.match(awake);
  if (m1) {
    curguard = m1[1];
  } else if (m2) {
    asleeptime = Number(m2[1]);
  } else if (m3) {
    guards[curguard] = (guards[curguard] || []).concat(
      range(asleeptime, Number(m3[1]))
    );
  } else {
    throw new Error(line);
  }
});

const findSleepiestMinute = st =>
  maxBy(Object.entries(countBy(st)), ([k, v]) => v);

const [sleepiestGuard, sleepTimes] = maxBy(
  Object.entries(guards),
  ([k, v]) => v.length
);
const [sneakMin] = findSleepiestMinute(sleepTimes);
console.log(Number(sleepiestGuard) * Number(sneakMin));

const ppp = mapValues(guards, findSleepiestMinute);
const [g2, [m2]] = maxBy(Object.entries(ppp), ([g2, [_, m3]]) => m3);
console.log(Number(g2) * Number(m2));
