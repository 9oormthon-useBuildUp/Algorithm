const { sep } = require("path");

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

class Point {
  constructor(_z, _y, _x, _min) {
    this.x = _x;
    this.y = _y;
    this.z = _z;
    this.min = _min;
  }
}

let line = 0;
const di = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
  [-1, 0, 0],
  [0, -1, 0],
  [0, 0, -1],
];
while (true) {
  const [L, H, W] = input[line].split(" ").map((e) => +e);
  if (L === 0 && H === 0 && W === 0) break;
  const board = [];
  let inputLine = 0;
  for (let k = 0; k < L; k++) {
    const inputL = [];
    for (let i = 1; i <= H; i++) {
      const info = input[line + inputLine + i].split("");
      if (info.length > 0) inputL.push(info);
    }
    board.push(inputL);
    inputLine += H + 1;
  }

  const visited = Array(L)
    .fill(null)
    .map(() =>
      Array(H)
        .fill(null)
        .map(() => Array(W).fill(false))
    );
  const deque = [];
  for (let i = 0; i < L; i++) {
    for (let j = 0; j < H; j++) {
      for (let k = 0; k < W; k++) {
        if (board[i][j][k] === "S") {
          deque.push(new Point(i, j, k, 0));
        }
      }
    }
  }
  let flag = false;
  while (deque.length > 0) {
    const q = deque.shift();
    if (board[q.z][q.y][q.x] === "E") {
      console.log(`Escaped in ${q.min} minute(s).`);
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
        dz < L &&
        dy < H &&
        dx < W &&
        (board[dz][dy][dx] === "." || board[dz][dy][dx] === "E") &&
        !visited[dz][dy][dx]
      ) {
        deque.push(new Point(dz, dy, dx, q.min + 1));
        visited[dz][dy][dx] = true;
      }
    }
  }
  if (!flag) {
    console.log("Trapped!");
  }
  line += H * L + L + 1;
}
