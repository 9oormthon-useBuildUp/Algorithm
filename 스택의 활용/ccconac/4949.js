const isValidPair = (open, close) => {
  return (open === '(' && close === ')') || (open === '[' && close === ']');
};

const solution = (line) => {
  const stack = [];
  const lineLength = line.length;

  let result = 'yes';

  for (let j = 0; j < lineLength; j++) {
    if (line[j] === '(' || line[j] === '[') stack.push(line[j]);
    else if (line[j] === ')' || line[j] === ']') {
      if (stack.length > 0 && isValidPair(stack[stack.length - 1], line[j])) stack.pop();
      else {
        result = 'no';
        break;
      }
    }
  }

  if (stack.length) result = 'no';

  return result;
};

const input = require('fs').readFileSync('text.txt').toString().trim().split('\n');
input.pop();

input.forEach((line) => {
  const answer = solution(line);
  console.log(answer);
});
