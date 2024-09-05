const input = require('fs')
  .readFileSync('text.txt')
  .toString()
  .trim()
  .split('\n')
  .map((value) => value.split(' ').map(Number));

const [N, towerHeights] = input;
const stack = [];
const answer = Array.from({ length: N[0] }, () => 0);

towerHeights.forEach((height, index) => {
  while (stack.length) {
    const [targetIndex, targetHeight] = stack[stack.length - 1];

    if (targetHeight > height) {
      answer[index] = targetIndex;
      break;
    }

    stack.pop();
  }

  stack.push([index + 1, height]);
});

console.log(answer.join(' '));
