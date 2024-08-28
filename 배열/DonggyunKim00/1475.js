const fs = require('fs');

const filePath =
  process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs
  .readFileSync(filePath, 'utf8')
  .toString()
  .trim()
  .split('')
  .map(Number);

let set = new Array(9).fill(0);
input.forEach((num) => {
  if (num === 9) set[6] += 1;
  else set[num] += 1;
});
set[6] = Math.ceil(set[6] / 2);

console.log(Math.max(...set));
