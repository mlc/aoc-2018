const { range, sum } = require('lodash');
const fs = require('fs');
const input = fs
  .readFileSync('input08', 'utf-8')
  .trim()
  .split(' ')
  .map(Number);

// const input = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2'.split(' ').map(Number);

// parsing

const readTree = () => {
  const childrenCount = input.shift();
  const metadataCount = input.shift();
  const children = range(0, childrenCount).map(readTree);
  const metadata = input.splice(0, metadataCount);
  return { children, metadata };
};

const tree = readTree();

// PART 1

const treeSum = ({ metadata, children }) =>
  sum(metadata) + sum(children.map(treeSum));

console.log(treeSum(tree));

// PART 2

const treeSumAdv = ({ metadata, children }) =>
  children.length === 0
    ? sum(metadata)
    : sum(
        metadata.map(i =>
          i <= children.length ? treeSumAdv(children[i - 1]) : 0
        )
      );

console.log(treeSumAdv(tree));
