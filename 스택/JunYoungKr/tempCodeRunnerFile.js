const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = input.shift();

let numbers = input[0].split(" ");
console.log(numbers);

let stack = [];
let answer = [];

for (let i = 0; i < N; i++) {
  for (let j = i + 1; j < N; j++) {
    if (numbers[i] < numbers[j]) stack.push(numbers[j]);
    console.log(numbers[i], numbers[j]);
  }
  if (stack.length === 0) stack.push(-1);
  console.log(stack);
}

stack[N - 1] = "-1";
console.log(stack.join(" "));

// 3 5 2 7 이라면
// 1. numbers에 3 5 2 7을 다 넣고 3이랑 5 2 7이랑 비교
// 2. 3보다 큰 수는 5, 7이므로 stack = []에 5, 7을 넣음
// 3. answer = []에 5을 집어넣음
// 4. 근데 만약에 stack.length === 0 이라면 answer.push(-1)
