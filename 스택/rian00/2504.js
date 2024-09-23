const { sep } = require("path");

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [str] = input;

const stack = [];
let flag = false;
let total = 0;
for (const e of str) {
  flag = false;
  switch (e) {
    case "(":
    case "[":
      stack.push(e);
      break;
    case ")":
      if (stack.length > 0 && stack[stack.length - 1] === "(") {
        stack.pop();
      } else {
        console.log(0);
        flag = true;
      }
      break;
    case "]":
      if (stack.length > 0 && stack[stack.length - 1] === "[") {
        stack.pop();
      } else {
        console.log(0);
        flag = true;
      }
      break;
  }
  if (flag) break;
}
if (!flag && stack.length === 0) console.log("YES");
else if (!flag && stack.length > 0) console.log(0);
