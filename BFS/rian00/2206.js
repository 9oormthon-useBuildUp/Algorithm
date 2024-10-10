const { sep } = require("path");

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

class Point {
  constructor(_x, _y, _step, _isBroke) {
    this.x = _x;
    this.y = _y;
    this.step = _step;
    this.isBroke = _isBroke;
  }
}

const [H, W] = input[0].split(" ").map((e) => +e);
const board = [];
const visited = Array.from({ length: H }, () => new Array(W).fill(false));
const Bvisited = Array.from({ length: H }, () => new Array(W).fill(false));

for (let i = 1; i <= H; i++) {
  board.push(input[i].split("").map((e) => +e));
}
const deque = [];
deque.push(new Point(0, 0, 1, false));
visited[0][0] = true;
const di = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];

let flag = false;
let idx = 0;
while (deque.length > idx) {
  const q = deque[idx++];
  if (q.x === W - 1 && q.y === H - 1) {
    console.log(q.step);
    flag = true;
    break;
  }

  for (const [x, y] of di) {
    const dx = q.x + x;
    const dy = q.y + y;

    if (dx >= 0 && dy >= 0 && dx < W && dy < H) {
      if (board[dy][dx] === 0) {
        if (q.isBroke) {
          if (!visited[dy][dx]) {
            visited[dy][dx] = true;
            deque.push(new Point(dx, dy, q.step + 1, q.isBroke));
          }
        } else {
          if (!Bvisited[dy][dx]) {
            Bvisited[dy][dx] = true;
            deque.push(new Point(dx, dy, q.step + 1, q.isBroke));
          }
        }
      }
      if (board[dy][dx] === 1 && !q.isBroke) {
        deque.push(new Point(dx, dy, q.step + 1, true));
      }
    }
  }
}
if (!flag) console.log(-1);
