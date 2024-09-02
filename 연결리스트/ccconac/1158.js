const solution = (n, k) => {
  const queue = [];
  const answer = [];

  for (let i = 0; i < n; i++) queue.push(i + 1);

  let count = 1;
  while (queue.length) {
    const shiftItem = queue.shift();

    count % k === 0 ? answer.push(shiftItem) : queue.push(shiftItem);

    count += 1;
  }

  console.log(`<${answer.join(', ')}>`);
};

const [N, K] = require('fs').readFileSync('text.txt').toString().trim().split(' ').map(Number);

solution(N, K);
