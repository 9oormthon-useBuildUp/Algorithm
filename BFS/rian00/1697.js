const { sep } = require("path");

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

class Info {
  constructor(_pos, _sec) {
    this.pos = _pos;
    this.sec = _sec;
  }
}

const [m, y] = input[0].split(" ").map((e) => +e);

const visited = Array(120000).fill(false);

const queue = [];
queue.push(new Info(m, 0));
visited[m] = true;

while (queue.length > 0) {
  const q = queue.shift();
  if (q.pos === y) {
    console.log(q.sec);
    break;
  }
  if (q.pos * 2 <= 100000 && !visited[q.pos * 2]) {
    queue.push(new Info(q.pos * 2, q.sec + 1));
    visited[q.pos * 2] = true;
  }
  if (q.pos + 1 <= 100000 && !visited[q.pos + 1]) {
    queue.push(new Info(q.pos + 1, q.sec + 1));
    visited[q.pos + 1] = true;
  }
  if (q.pos - 1 >= 0 && !visited[q.pos - 1]) {
    queue.push(new Info(q.pos - 1, q.sec + 1));
    visited[q.pos - 1] = true;
  }
}
