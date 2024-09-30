const { sep } = require("path");

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

class Info {
  constructor(_n, _sec) {
    this.n = _n;
    this.sec = _sec;
  }
}
const [N, K] = input[0].split(" ").map((e) => +e);

let sec = 0;

const deque = [];
const visited = new Array(100001).fill(false);

let idx = 0;
deque.push(new Info(N, 0));
visited[N] = true;

while (deque.length > idx) {
  const q = deque[idx++];
  // console.log(q);
  // console.log("ehfdkek");
  if (q.n === K) {
    console.log(q.sec);
    break;
  }
  if (q.n * 2 <= 100000 && !visited[q.n * 2]) {
    deque.push(new Info(q.n * 2, q.sec));
    visited[q.n * 2] = true;
  }
  if (q.n - 1 >= 0 && !visited[q.n - 1]) {
    deque.push(new Info(q.n - 1, q.sec + 1));
    visited[q.n - 1] = true;
  }
  if (q.n + 1 <= 100000 && !visited[q.n + 1]) {
    deque.push(new Info(q.n + 1, q.sec + 1));
    visited[q.n + 1] = true;
  }
}
