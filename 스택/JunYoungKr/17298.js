const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input.shift(), 10);

let numbers = input[0].split(" ").map(Number);
// console.log(numbers);
let stack = [];

let answer = new Array(N).fill(-1);
for (let i = 0; i < N; i++) {
  while (stack.length && numbers[stack[stack.length - 1]] < numbers[i]) {
    answer[stack.pop()] = numbers[i];
  }
  stack.push(i);
  //   console.log(stack);
}

answer[N - 1] = -1;

console.log(answer.join(" "));
// 3 5 2 7 이라면
// 1. numbers에 3 5 2 7을 다 넣고 3이랑 5 2 7이랑 비교
// 2. 3보다 큰 수는 5, 7이므로 stack = []에 5, 7을 넣음
// 3. answer = []에 5을 집어넣음
// 4. 근데 만약에 stack.length === 0 이라면 answer.push(-1)
