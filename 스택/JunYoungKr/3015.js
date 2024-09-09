const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((i) => Number(i));

const N = input.shift();

// console.log(input);

// let stack = [];
// let numbers = input;
// let answer = 0;

// for (let i = 0; i < N; i++) {
//   while (stack.length > 0 && stack[stack.length - 1] > numbers[i]) {
//     console.log(stack);
//     stack.pop();
//   }
//   stack.push(numbers[i]);
//   //   console.log(stack);
// }
