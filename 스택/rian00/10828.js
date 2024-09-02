const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [num, ...info] = input;

let stack = [];
let len = 0;
for (const s of info) {
  const [method, item] = s.split(" ");
  switch (method) {
    case "push":
      stack.push(item);
      len++;
      break;
    case "pop":
      if (len === 0) {
        console.log(-1);
      } else {
        console.log(stack.pop());
        len--;
      }
      break;
    case "size":
      console.log(len);
      break;
    case "empty":
      console.log(len === 0 ? 1 : 0);
      break;
    case "top":
      console.log(len === 0 ? -1 : stack[len - 1]);
      break;
  }
}
