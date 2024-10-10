const solution = (p, n, numbers) => {
  let start = 0;
  let end = n;
  let isReverse = false;
  let isError = false;

  [...p].forEach((char) => {
    if (char === 'R') isReverse = !isReverse;
    if (char === 'D') {
      if (start - end === 0) isError = true;
      isReverse ? (end -= 1) : (start += 1);
    }
  });

  if (isError) return 'error';
  else {
    const result = isReverse ? numbers.slice(start, end).reverse() : numbers.slice(start, end);
    return JSON.stringify(result);
  }
};

const input = require('fs').readFileSync('text.txt').toString().split('\n');

const T = Number(input.shift());

for (let i = 0; i < T * 3; i += 3) {
  const [p, n, numbers] = [input[i], input[i + 1], JSON.parse(input[i + 2])];
  const answer = solution(p, n, numbers);

  console.log(answer);
}
