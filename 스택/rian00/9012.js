const { sep } = require("path");

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, ...arr] = input;

for (const str of arr) {
  const stack = [];
  let flag = false;
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
          console.log("NO");
          flag = true;
        }
        break;
      case "]":
        if (stack.length > 0 && stack[stack.length - 1] === "[") {
          stack.pop();
        } else {
          console.log("NO");
          flag = true;
        }
        break;
    }
    if (flag) break;
  }
  if (!flag && stack.length === 0) console.log("YES");
  else if (!flag && stack.length > 0) console.log("NO");
}
