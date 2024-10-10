const { sep } = require("path");

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

let [n, ...arr] = input;
arr = arr.map((e) => +e);

let stack = [];

cnt = 0;
for (let i = 0; i < n; i++) {
  console.log("전:", stack);
  while (stack.length > 0 && stack[stack.length - 1] < arr[i]) {
    const e = stack.pop();
    if (stack.length >= 1 && e <= arr[i]) cnt++;
  }

  if (stack.length > 1 && stack[stack.length - 1] === arr[i]) {
    const idx = stack.indexOf(arr[i]);
    cnt += stack.length - idx;
    if (idx === 0) cnt--;
    // j = stack.length - 1;
    // while (j > 0 && stack[j] === arr[i]) {
    //   cnt++;
    //   j--;
    // }
  }
  console.log("후:", stack);
  console.log(cnt);
  stack.push(arr[i]);
}
cnt += n - 1;
console.log(cnt);
