const { sep } = require("path");

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [...arr] = input;

for (const str of arr) {
  const stack = [];
  let flag = false;
  if (str.length === 1 && str[str.length - 1] === ".") break;
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
          console.log("no");
          flag = true;
        }
        break;
      case "]":
        if (stack.length > 0 && stack[stack.length - 1] === "[") {
          stack.pop();
        } else {
          console.log("no");
          flag = true;
        }
        break;
    }
    if (flag) break;
  }
  if (!flag && stack.length === 0) console.log("yes");
  else if (!flag && stack.length > 0) console.log("no3");
}
