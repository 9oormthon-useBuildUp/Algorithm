const solution = (input) => {
  let answer = 0;

  input.forEach((char) => {
    const stack = [];

    for (let i = 0; i < char.length; i++) {
      stack[stack.length - 1] === char[i] ? stack.pop() : stack.push(char[i]);
    }

    answer = stack.length ? answer : answer + 1;
  });

  return answer;
};

const input = require('fs').readFileSync(0).toString().trim().split('\n');
input.shift();

const answer = solution(input);

console.log(answer);
