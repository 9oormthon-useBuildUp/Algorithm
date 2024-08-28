const fs = require('fs');

const filePath =
  process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs
  .readFileSync(filePath, 'utf8')
  .split('\n')
  .map((item, idx) => (idx === 1 ? item.split(' ') : item));

const [n, arr, v] = input;

const solution = (arr, v) => {
  let count = 0;

  while (arr.length) {
    const num = arr.pop();
    if (num === v) count += 1;
  }

  return count;
};

console.log(solution(arr, v));
