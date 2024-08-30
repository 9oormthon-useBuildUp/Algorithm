const fs = require('fs');

const filePath =
  process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs
  .readFileSync(filePath, 'utf8')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map(Number));
const [_, K] = input.shift();

const solution = (K, students) => {
  // 모든 학생을 담을 객체 gender와 grade로 나눔
  let obj = {
    w: {},
    m: {},
  };

  students.forEach(([gender, grade]) => {
    const key = gender ? 'm' : 'w';

    // 초기화
    if (obj[key][grade] === undefined) {
      obj[key][grade] = 0;
    }
    // 값 넣기
    obj[key][grade] += 1;
  });

  let sum = 0;
  for (const gender in obj) {
    for (const grade in obj[gender]) {
      const value = obj[gender][grade];
      if (value % K) sum += Math.floor(value / K) + 1;
      else sum += value / K;
    }
  }

  return sum;
};

console.log(solution(K, input));
