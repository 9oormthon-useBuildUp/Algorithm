const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs
  .readFileSync(filePath, 'utf8')
  .toString()
  .trim()
  .split('')
  .map(Number);

const solution = (input) => {
  // '21','12' 를 저장할 store 선언
  const store = new Set();

  for (let i = 0; i < input.length; i++) {
    // 모두 찾은 경우 미리 for문을 탈출
    if (store.size === 2) break;

    const num = `${input[i]}${input[i + 1]}`;
    if (store.has(num)) continue;
    if (num === '12' || num === '21') {
      store.add(num);
      i += 1;
    }
  }

  return store.size === 2 ? 'YES' : 'NO';
};

console.log(solution(input));
