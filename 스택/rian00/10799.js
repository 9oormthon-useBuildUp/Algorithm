const { sep } = require("path");

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, ...arr] = input;

let cnt = 0;

for (const str of arr) {
  const stack = [];
  for (let i = 0; i < str.length; i++) {
    stack.push(str[i]);
    if (stack.length > 1 && stack[stack.length - 2] === str[i]) {
      stack.pop();
      stack.pop();
    }
  }
  if (stack.length === 0) cnt++;
}
console.log(cnt);
