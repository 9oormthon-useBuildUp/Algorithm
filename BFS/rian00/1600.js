const { sep } = require("path");

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");
class Point {
  constructor(_z, _y, _x, _step) {
    this.z = _z;
    this.y = _y;
    this.x = _x;
    this.step = _step;
  }
}
const K = +input[0];
const [W, H] = input[1].split(" ").map((e) => +e);
const board = [];
const visited = Array.from({ length: K + 1 }, () =>
  Array.from({ length: H }, () => Array.from({ length: W }, () => false))
);
for (let i = 2; i <= H + 1; i++) {
  board.push(input[i].split(" ").map((e) => +e));
}
const deque = [];
deque.push(new Point(0, 0, 0, 0));
visited[0][0][0] = true;
let idx = 0;

const di = [
  [0, 1, 0],
  [1, 0, 0],
  [-1, 0, 0],
  [0, -1, 0],
  [1, 2, 1],
  [-1, -2, 1],
  [-1, 2, 1],
  [1, -2, 1],
  [2, 1, 1],
  [-2, -1, 1],
  [-2, 1, 1],
  [2, -1, 1],
];
let flag = false;
while (deque.length > idx) {
  const q = deque[idx++];
  if (q.x === W - 1 && q.y === H - 1) {
    console.log(q.step);
    flag = true;
    break;
  }
  for (const [x, y, z] of di) {
    const dx = q.x + x;
    const dy = q.y + y;
    const dz = q.z + z;
    if (
      dx >= 0 &&
      dy >= 0 &&
      dz >= 0 &&
      dx < W &&
      dy < H &&
      dz <= K &&
      board[dy][dx] === 0 &&
      !visited[dz][dy][dx]
    ) {
      deque.push(new Point(dz, dy, dx, q.step + 1));
      visited[dz][dy][dx] = true;
    }
  }
}
if (!flag) {
  console.log(-1);
}
