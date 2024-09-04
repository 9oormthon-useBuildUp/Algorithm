const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

let [n, ...num] = input;
num = [-1, ...num.map((e) => +e)];

let stack = [];
let result = [];
let insertNum = 1;

for (let i = 1; i <= n; i++) {
  if (num[i] - num[i - 1] > 0) {
    for (let j = insertNum; j <= num[i]; j++, insertNum++) {
      stack.push(j);
      result.push("+");
    }
    stack.pop();
    result.push("-");
  } else {
    if (stack.length > 0) {
      const popNum = stack.pop();
      result.push("-");
      if (num[i] !== popNum) {
        result = ["NO"];
        break;
      }
    }
  }
}

console.log(result.join("\n"));
