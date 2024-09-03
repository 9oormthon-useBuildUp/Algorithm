const writeNumber = (array) => {
  const numbers = [];

  array.forEach((number) => {
    if (number === 0) numbers.pop();
    else numbers.push(number);
  });

  return numbers;
};

const solution = (array) => {
  const numbers = writeNumber(array);
  return numbers.reduce((curr, acc) => curr + acc, 0);
};

const input = require('fs').readFileSync(0).toString().trim().split('\n').map(Number);

input.shift();
const answer = solution(input);

console.log(answer);
