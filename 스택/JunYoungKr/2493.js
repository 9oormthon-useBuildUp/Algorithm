const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input.shift());
const heights = input[0].split(" ").map(Number);

// console.log(heights);

let stack = [];
let result = new Array(N).fill(0);

for (let i = 0; i < N; i++) {
  // 스택의 탑이 현재 탑보다 낮으면, 그 탑은 레이저 신호를 수신할 수 없음
  while (stack.length > 0 && stack[stack.length - 1][1] <= heights[i]) {
    // console.log(stack[stack.length - 1][1], heights[i]);
    stack.pop();
  }

  if (stack.length > 0) {
    // 스택에 남아있는 탑이 있다면 그 탑이 레이저를 수신할 수 있음
    result[i] = stack[stack.length - 1][0] + 1; // 인덱스는 1부터 시작하므로 +1
    // console.log("result", result[i]);
  }

  // 현재 탑을 스택에 추가
  stack.push([i, heights[i]]);
  //   console.log("stack", stack);
}

console.log(result.join(" "));
