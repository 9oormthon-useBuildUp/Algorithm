const { sep } = require("path");

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

class Point {
  constructor(_x, _y, _step) {
    this.x = _x;
    this.y = _y;
    this.step = _step;
  }
}
const T = input[0];
let line = 1;

const di = [
  [-1, -2],
  [-2, -1],
  [1, -2],
  [2, -1],
  [-2, 1],
  [-1, 2],
  [1, 2],
  [2, 1],
];
for (let t = 0; t < T; t++) {
  const len = +input[line];
  const pos = input[line + 1].split(" ").map((e) => +e);
  const dest = input[line + 2].split(" ").map((e) => +e);
  const visited = Array.from({ length: len }, () => new Array(len).fill(false));
  const arr = Array.from({ length: len }, () => new Array(len).fill(0));

  arr[pos[1]][pos[0]] = 1;
  arr[dest[1]][dest[0]] = 2;

  const queue = [];

  queue.push(new Point(pos[0], pos[1], 0));
  visited[pos[1]][pos[0]] = true;

  while (queue.length > 0) {
    const q = queue.shift();
    if (arr[q.y][q.x] === 2) {
      console.log(q.step);
      break;
    }
    for (let i = 0; i < 8; i++) {
      const dx = q.x + di[i][0];
      const dy = q.y + di[i][1];
      if (dx >= 0 && dx < len && dy >= 0 && dy < len && !visited[dy][dx]) {
        queue.push(new Point(dx, dy, q.step + 1));
        visited[dy][dx] = true;
      }
    }
  }

  line += 3;
}
