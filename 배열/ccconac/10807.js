const Solution = (numbers, v) => {
  let answer = 0;

  numbers.forEach((number) => {
    if (number === v) answer += 1;
  });

  console.log(answer);
};

const input = require('fs').readFileSync('input.txt').toString().split('\n');

input.shift();
const numbers = input.map((n) => n.split(' ').map(Number))[0];
const v = Number(input[1]);

Solution(numbers, v);
