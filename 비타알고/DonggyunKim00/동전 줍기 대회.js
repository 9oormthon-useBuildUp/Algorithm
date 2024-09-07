const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs
  .readFileSync(filePath, 'utf8')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map(Number));

const [N, ...coins] = input;

const solution = (N, coins) => {
  let currMax = coins[0];
  let sum = coins[0];

  for (let i = 1; i < N; i++) {
    // 더해진 요소들과 현재 요소 사이에 더 큰것을 선택
    sum = Math.max(coins[i], sum + coins[i]);

    // 현재까지의 최대값 갱신
    currMax = Math.max(currMax, sum);
  }

  return currMax;
};

const answer = solution(...N, ...coins);
console.log(answer);
