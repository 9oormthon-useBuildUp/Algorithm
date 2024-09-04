const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .split("\n")
  .map((i) => Number(i));

const n = input.shift();

// console.log(n, input);
// console.log(input);

let stack = [];
let pluseminus = [];
let stack_num = 1;

for (let i = 0; i < n; i++) {
  let num = input[i];

  // num까지 계속 push
  // 1 2 3 4
  // 1 2 이후로 6까지 5, 6을 push 하는 것과 같음
  while (stack_num <= num) {
    stack.push(stack_num);
    stack_num++;
    pluseminus.push("+");
  }

  let popnum = stack.pop();
  pluseminus.push("-");

  if (popnum !== num) {
    // pluseminus.push("NO");
    pluseminus = ["NO"];
    // console.log("NO");
    break;
  }
}

// console.log("stack", stack);
// console.log("plusminus", pluseminus);

console.log(pluseminus.join("\n"));

// 4 -> 1 2 3 4 push 4개
// 4 3 6 8 7 5 2 1
// push push push push pop pop push push pop pop push push push push pop pop pop pop
// push push push push pop pop push push pop push push pop pop pop pop pop

// 1 2 3 4
// 1 2
// 1 2 5 6
// 1 2 5
// 1 2
// 1 2 7 8
// 1 2 7
// 1 2
// 1
//
