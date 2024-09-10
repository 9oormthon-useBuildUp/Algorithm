const { sep } = require("path");

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = +input[0];

let s = 2;

while (true) {
  if (N === 1 || N === 2) {
    console.log(N);
    break;
  }

  s *= 2;

  if (s >= N) {
    console.log((N - Math.floor(s / 2)) * 2);
    break;
  }
}
