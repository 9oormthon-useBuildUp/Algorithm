const Solution = (input) => {
  const answer = new Array(10).fill(0);
  const calResult = String(input[0] * input[1] * input[2]).split('');

  calResult.forEach((number) => answer[number]++);

  console.log(answer.join('\n'));
};

const input = require('fs').readFileSync(0).toString().split('\n').map(Number);

Solution(input);
