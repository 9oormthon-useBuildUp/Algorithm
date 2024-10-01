const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs
  .readFileSync(filePath, 'utf8')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(''));

const small = ['(', ')'];
const big = ['[', ']'];

const solution = (input) => {
  const answer = [];

  input.forEach((string) => {
    const stack = [];

    for (let i = 0; i < string.length; i++) {
      const char = string[i];

      if (char === small[0] || char === big[0]) {
        stack.push(char);
      }

      if (char === small[1]) {
        if (stack[stack.length - 1] === small[0]) stack.pop();
        else {
          stack.push(char);
          break;
        }
      }

      if (char === big[1]) {
        if (stack[stack.length - 1] === big[0]) stack.pop();
        else {
          stack.push(char);
          break;
        }
      }
    }

    answer.push(stack.length ? 'no' : 'yes');
  });

  return answer;
};

input.pop();
const answer = solution(input).join('\n');
console.log(answer);
