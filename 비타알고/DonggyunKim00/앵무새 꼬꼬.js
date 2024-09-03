// 비타알고 - 앵무새 꼬꼬 ★1

const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath, 'utf8').toString().split('\n');
input.shift();

const moum = new Set(['a', 'e', 'i', 'o', 'u']);

const solution = (input) => {
  const answer = input.map((item) => {
    const newString = item
      .split('')
      .filter((char) => moum.has(char) || moum.has(char.toLowerCase()))
      .join('');

    if (newString) return newString;
    else return '???';
  });

  return answer;
};

console.log(solution(input).join('\n'));
