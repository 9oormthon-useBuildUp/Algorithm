const { checkPrimeSync } = require("crypto");

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((i) => Number(i));

const N = input.shift();

// console.log(N);
// console.log(input);

let stack = [];

let heights = input;
let answer = 0;

for (let i = 0; i < N; i++) {
  // 만약 지금 건물보다 다음 건물이 큰 경우 보지 못함
  // 현재 빌딩보다 작거나 같은 빌딩들은 스택에서 제거
  while (stack.length > 0 && stack[stack.length - 1] <= heights[i]) {
    stack.pop();
  }

  // 현재 빌딩이 볼 수 있는 빌딩 수를 더함
  answer += stack.length;

  // 현재 빌딩을 스택에 추가
  stack.push(heights[i]);
  //   console.log("stack", stack);
}
console.log(answer);
