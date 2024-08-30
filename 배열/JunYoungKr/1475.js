const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const arr = [...input];

// 각 숫자의 개수를 저장할 배열 초기화
let numbers = new Array(10).fill(0);

// 각 숫자의 빈도 계산
for (let i = 0; i < input.length; i++) {
  if (Number(input[i]) === 6 || Number(input[i]) === 9) {
    numbers[6]++; // 6과 9는 6으로 통일해서 증가
  } else {
    numbers[Number(input[i])]++;
  }
}

// 6과 9의 개수를 합쳐서 처리
numbers[6] = Math.ceil((numbers[6] + numbers[9]) / 2);

// 9의 카운트를 0으로 초기화 (이미 6에 포함됨)
numbers[9] = 0;

// 최종적으로 필요한 세트 수는 가장 많이 필요한 숫자의 개수
let answer = Math.max(...numbers);

console.log(answer);
