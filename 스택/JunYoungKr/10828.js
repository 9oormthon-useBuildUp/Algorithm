const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

// console.log(input);

const N = input.shift();
// console.log(N);

let stack = [];
// console.log(stack.length);

for (let i = 0; i < N; i++) {
  //   console.log(input.shift().split(" ")[1]);
  let order = input[i].split(" ");
  //   console.log(order);

  if (order[0] === "push") {
    stack.push(order[1]);
    // console.log(stack);
  } else if (order[0] === "pop") {
    if (stack.length === 0) console.log(-1);
    else {
      console.log(stack.pop());
      //   console.log(stack);
    }
  } else if (order[0] === "size") {
    console.log(stack.length);
  } else if (order[0] === "empty") {
    if (stack.length !== 0) console.log(0);
    else console.log(1);
  } else if (order[0] === "top") {
    if (stack.length === 0) console.log(-1);
    else console.log(stack[stack.length - 1]);
  }
}
