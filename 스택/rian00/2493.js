const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

let [n, arr] = input;
arr = [...arr.split(" ")].map((e) => +e);

const obj = arr.reduce((acc, curr, idx) => {
  acc[curr] = idx + 1;
  return acc;
}, {});
obj[0] = 0;

let stack = [0];
let result = [0];

//1. 감소하면 넣고 갱신
//2. 증가할때 stack 맨 뒤 값이 0이 아니고,맨 뒤값보다 본인이 더 크면 pop 하고 맨 뒷 값 계속 비교 0나오면 그냥 넣기

for (let i = 1; i < n; i++) {
  if (arr[i] - arr[i - 1] > 0) {
    //증가
    let last = stack[stack.length - 1];
    while (last < arr[i]) {
      if (last === 0) break;
      stack.pop();
      last = stack[stack.length - 1];
    }
    result.push(stack[stack.length - 1]);
  } else {
    //감소
    stack.push(arr[i - 1]);
    result.push(stack[stack.length - 1]);
  }
}

result = result.map((e) => obj[e]);
console.log(result.join(" "));
