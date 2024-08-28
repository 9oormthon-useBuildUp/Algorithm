const fs = require('fs');

const filePath =
  process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath, 'utf8').split('\n').map(Number);

const [A, B, C] = input;
const digit = Array.from({ length: 10 }).fill(0);

(A * B * C)
  .toString()
  .split('')
  .forEach((num) => {
    digit[Number(num)] += 1;
  });

console.log(digit.join('\n'));
