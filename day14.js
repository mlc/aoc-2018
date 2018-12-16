const fs = require('fs');

const rawInput = process.argv[2] || fs.readFileSync('input14', 'utf-8').trim();
const input = Number(rawInput);
const inputDigits = rawInput.split('').map(Number);

function findSubarray(arr, subarr) {
  for (var i = 0; i < 1 + (arr.length - subarr.length); i++) {
    var j = 0;
    for (; j < subarr.length; j++) if (arr[i + j] !== subarr[j]) break;
    if (j == subarr.length) return i;
  }
  return -1;
}

const r = [3, 7];
let e0 = 0;
let e1 = 1;
let done = false;

while (r.length < input + 10 || !done) {
  if (r.length % 100000 === 0) {
    const s = findSubarray(r, inputDigits);
    if (s !== -1) {
      done = true;
    }
  }
  const sum = r[e0] + r[e1];
  if (sum >= 10) {
    r.push(1);
    r.push(sum - 10);
  } else {
    r.push(sum);
  }
  e0 = (e0 + r[e0] + 1) % r.length;
  e1 = (e1 + r[e1] + 1) % r.length;
}

console.log(r.slice(input, input + 10).join(''));
console.log(findSubarray(r, inputDigits));
//fs.writeFileSync("output14", r.join(''));
