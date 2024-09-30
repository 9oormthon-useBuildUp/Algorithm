const { sep } = require("path");

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

class Info {
  constructor(_pos, _step) {
    this.pos = _pos;
    this.step = _step;
  }
}
const [F, S, G, U, D] = input[0].split(" ").map((e) => +e);

const visited = new Array(F + 10).fill(false);

const deque = [];
deque.push(new Info(S, 0));
visited[S] = true;
let flag = false;

const di = [U, -D];

while (deque.length > 0) {
  q = deque.shift();
  if (q.pos === G) {
    console.log(q.step);
    flag = true;
    break;
  }

  for (let i = 0; i < 2; i++) {
    const newPos = q.pos + di[i];
    if (newPos >= 1 && newPos <= F && !visited[newPos]) {
      deque.push(new Info(newPos, q.step + 1));
      visited[newPos] = true;
    }
  }
}

if (!flag) {
  console.log("use the stairs");
}
