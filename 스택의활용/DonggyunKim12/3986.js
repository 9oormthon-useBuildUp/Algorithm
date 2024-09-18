const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs
  .readFileSync(filePath, 'utf8')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(''));

const solution = (words) => {
  let count = 0;

  words.forEach((word) => {
    const stack = [];

    for (let i = 0; i < word.length; i++) {
      const char = word[i];

      if (!stack.length) {
        stack.push(char);
        continue;
      }

      if (stack[stack.length - 1] === char) stack.pop();
      else stack.push(char);
    }

    if (!stack.length) count += 1;
  });
  return count;
};

const [_, ...words] = input;
const answer = solution(words);
console.log(answer);
