const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs
  .readFileSync(filePath, 'utf8')
  .toString()
  .trim()
  .split('\n')
  .map(Number);
input.shift();

const solution = (input) => {
  const stack = [];

  input.forEach((num) => {
    if (num) {
      stack.push(num);
    } else {
      stack.pop();
    }
  });

  return stack;
};

console.log(solution(input).reduce((acc, cur) => acc + cur, 0));
