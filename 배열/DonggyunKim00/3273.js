const fs = require('fs');

const filePath =
  process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs
  .readFileSync(filePath, 'utf8')
  .toString()
  .trim()
  .split('\n')
  .map((item, idx) => {
    if (idx === 1) {
      return item.split(' ').map(Number);
    } else {
      return Number(item);
    }
  });

const [n, arr, x] = input;

const solution = (n, arr, x) => {
  let count = 0;
  const set = new Set(arr);

  if (n === 1) {
    if (set.has(x)) count += 1;
    return count;
  } else {
    set.forEach((item) => {
      if (set.has(x - item)) count += 1;
    });

    // count/2 => 중복 제거
    // Math.floor => 자기 자신이 count 될때 제거
    return Math.floor(count / 2);
  }
};

console.log(solution(n, arr, x));
