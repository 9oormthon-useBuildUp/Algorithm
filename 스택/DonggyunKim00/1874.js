const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs
  .readFileSync(filePath, 'utf8')
  .toString()
  .trim()
  .split('\n')
  .map(Number);

const n = input.shift();
const solution = (n, input) => {
  const arr = Array.from({ length: n }, (_, idx) => idx + 1).reverse();
  const stack = [];
  const answer = [];

  input.forEach((value) => {
    const idx = stack.indexOf(value);

    if (idx === -1) {
      let popValue = 0;
      while (arr.length && value !== popValue) {
        popValue = arr.pop();
        stack.push(popValue);
        answer.push('+');
      }
      stack.pop();
      answer.push('-');
    } else {
      if (stack[stack.length - 1] !== value) return;
      stack.pop();
      answer.push('-');
    }
  });

  return stack.length ? 'NO' : answer.join('\n');
};

console.log(solution(n, input));
