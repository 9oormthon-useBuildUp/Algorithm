const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

let [N, arr] = input;
arr = arr.split(" ").map((e) => +e);

stack = [];
result = [];
for (let i = N - 1; i >= 0; i--) {
  while (stack.length > 0 && arr[i] >= stack[stack.length - 1]) {
    stack.pop();
  }
  if (stack.length === 0) {
    result.push(-1);
  } else {
    result.push(stack[stack.length - 1]);
  }
  stack.push(arr[i]);
}
result.reverse();
console.log(result.join(" "));
