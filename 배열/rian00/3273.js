const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, arr, x] = [
  parseInt(input[0]),
  input[1].split(" ").map((e) => +e),
  parseInt(input[2]),
];

arr.sort((a, b) => a - b);
s = 0;
e = n - 1;
let cnt = 0;

while (e > s) {
  let sum = arr[e] + arr[s];
  if (sum === x) {
    cnt++;
    e--;
    s++;
  } else if (sum > x) {
    e--;
  } else {
    s++;
  }
}
console.log(cnt);
