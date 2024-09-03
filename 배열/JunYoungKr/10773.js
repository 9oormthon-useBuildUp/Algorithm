const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

// console.log(input);

const K = input.shift();
// console.log(K);

let stack = [];

for (let i = 0; i < K; i++) {
  // 0을 외치면 가장 최근에 재민이가 쓴 수를 지움
  let call = Number(input[i]);
  if (call === 0) stack.pop();
  else stack.push(call);
}

const sum = stack.reduce((acc, cur) => acc + cur, 0);
console.log(sum);
