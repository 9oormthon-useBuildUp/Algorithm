/* 통과했으나 반복문의 depth가 깊은 코드 (3)
const solution = (n, x, array) => {
  let answer = 0;

  for (let i = 0; i < n; i++) {
    let number = x - array[i];

    for (let j = i + 1; j < n; j++) {
      if (number === array[j]) answer += 1;
    }
  }

  return answer;
};
*/

const solution = (n, x, array) => {
  let start = 0;
  let end = n - 1;
  let answer = 0;

  while (start != end) {
    if (array[start] + array[end] === x) {
      answer += 1;
      start += 1;
    } else if (array[start] + array[end] > x) {
      end -= 1;
    } else if (array[start] + array[end] < x) {
      start += 1;
    }
  }

  return answer;
};

const input = require('fs').readFileSync('text.txt').toString().trim().split('\n');

const n = Number(input.shift());
const [a, [x]] = input.map((number) => number.split(' ').map(Number));

a.sort((a, b) => a - b);

console.log(solution(n, x, a));
