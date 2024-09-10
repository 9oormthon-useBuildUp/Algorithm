const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

let [N, ...arr] = input;
arr = arr.map((e) => +e);

let stack = [];
let answer = 0;

for (let i = 0; i < N; i++) {
  while (stack.length > 0 && stack[stack.length - 1] <= arr[i]) {
    stack.pop();
  }
  answer += stack.length;

  stack.push(arr[i]);
}
console.log(answer);
