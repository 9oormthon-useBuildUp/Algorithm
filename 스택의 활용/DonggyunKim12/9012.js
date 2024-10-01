const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath, 'utf8').toString().trim().split('\n');

const solution = (T, input) => {
  const answer = [];

  for (let i = 0; i < T; i++) {
    const str = input[i].split('');
    const stack = [];

    for (let j = 0; j < str.length; j++) {
      const v = str[j];
      if (!stack.length) {
        stack.push(v);
        continue;
      }

      if (stack[stack.length - 1] === '(' && v === ')') stack.pop();
      else stack.push(v);
    }

    stack.length ? answer.push('NO') : answer.push('YES');
  }

  return answer;
};

const [T, ...string] = input;
const answer = solution(Number(T), string).join('\n');
console.log(answer);
