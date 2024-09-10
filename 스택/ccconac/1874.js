const pushToStack = (stack, currentNumber, answer) => {
  stack.push(currentNumber);
  answer.push('+');
};

const popToStack = (stack, answer) => {
  stack.pop();
  answer.push('-');
};

const solution = (array) => {
  const stack = [];
  const answer = [];

  let currentNumber = 1;
  let isPossible = true;

  array.forEach((number) => {
    while (currentNumber <= number) {
      pushToStack(stack, currentNumber, answer);
      currentNumber += 1;
    }

    const stackLastIndex = stack.length - 1;
    if (number === stack[stackLastIndex]) popToStack(stack, answer);
    else isPossible = false;
  });

  return isPossible ? answer.join('\n') : 'NO';
};

const input = require('fs').readFileSync(0).toString().trim().split('\n').map(Number);
input.shift();

const answer = solution(input);
console.log(answer);
