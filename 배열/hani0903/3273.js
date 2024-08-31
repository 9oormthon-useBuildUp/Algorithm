const fs = require('fs');

const filePath = process.platform === 'linux' ? 'dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath, 'utf-8').split('\n');

let numbers = input[1].split(' ').map(Number);
let x = Number(input[2]);

//배열 오름차순 정렬
numbers = numbers.sort((a, b) => a - b);

let count = 0;
let start = 0;
let end = numbers.length - 1;

//투 포인터 사용
while (start < end) {
  let sum = numbers[start] + numbers[end];

  if (sum === x) {
    count++;
    start++;
    end--;
  } else if (sum > x) {
    end--;
  } else {
    start++;
  }
}

console.log(count);
