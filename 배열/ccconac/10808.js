const Solution = (input, alphabet) => {
  const answer = new Array(26).fill(0);
  input.forEach((i) => answer[alphabet.indexOf(i)]++);

  console.log(answer.join(' '));
};

const input = require('fs').readFileSync(0).toString().split('');

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

Solution(input, alphabet);
