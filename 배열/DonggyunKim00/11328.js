const fs = require('fs');

const filePath =
  process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs
  .readFileSync(filePath, 'utf8')
  .toString()
  .trim()
  .split('\n')
  .map((item, idx) => (idx ? item.split(' ') : Number(item)));
input.shift();

const solution = (input) => {
  const answer = [];
  input.forEach(([first, second]) => {
    // 1. 길이비교
    if (first.length !== second.length) answer.push('Impossible');
    else {
      // 2. obj key값 카운트를 이용한 내부 알파벳 비교
      let obj = {};

      first.split('').forEach((char) => {
        if (obj[char] === undefined) obj[char] = 1;
        else obj[char] += 1;
      });

      second.split('').forEach((char) => {
        if (obj[char]) obj[char] -= 1;
      });

      let sum = 0;
      for (const key in obj) {
        sum += obj[key];
      }

      if (sum > 0) answer.push('Impossible');
      else answer.push('Possible');
    }
  });

  return answer;
};

console.log(solution(input).join('\n'));
