const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs
  .readFileSync(filePath, 'utf8')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

const divisor = (num) => {
  const yaksu = new Set();
  for (let i = 1; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      const multiplied = num / i;
      i !== 1 && yaksu.add(i);
      yaksu.add(multiplied);
    }
  }

  return yaksu;
};

const solution = (input) => {
  const [A, B] = input;
  let obj = {};

  for (let i = A; i <= B; i++) {
    const yaksu = divisor(i);

    yaksu.forEach((value) => {
      if (!obj[value]) {
        obj[value] = 0;
      }
      obj[value] += 1;
    });
  }

  return obj;
};

console.log(Object.keys(solution(input))[0]);
