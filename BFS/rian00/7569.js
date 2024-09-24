const { sep } = require("path");

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

class Point {
  constructor(_z, _y, _x, _step) {
    this.x = _x;
    this.y = _y;
    this.z = _z;
    this.step = _step;
  }
}

const countTotalTomato = (arr, M, N, H) => {
  //   console.log("arr:", arr);
  let cnt = 0;
  for (let i = 0; i < H; i++) {
    for (let j = 0; j < N; j++) {
      for (let k = 0; k < M; k++) {
        if (arr[i][j][k] === -1) cnt++;
      }
    }
  }
  return M * N * H - cnt;
};

const [M, N, H] = input[0].split(" ").map((e) => +e);
let line = 1;
const board = [];
for (let i = 0; i < H; i++, line += N) {
  const save = [];
  for (j = 0; j < N; j++) {
    save.push(input[line + j].split(" ").map((e) => +e));
  }
  board.push(save);
}

let visited = Array.from({ length: H }, () =>
  Array.from({ length: N }, () => Array.from({ length: M }, () => false))
);
const tomatoCnt = countTotalTomato(board, M, N, H);
// console.log(board);
// console.log(visited);
const deque = [];
const di = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
  [-1, 0, 0],
  [0, -1, 0],
  [0, 0, -1],
];
let cnt = 0;
let flag = false;
for (let i = 0; i < H; i++) {
  for (let j = 0; j < N; j++) {
    for (let k = 0; k < M; k++) {
      if (board[i][j][k] === 1 && !visited[i][j][k]) {
        deque.push(new Point(i, j, k, 0));
        visited[i][j][k] = true;
      }
    }
  }
}
let idx = 0;
while (deque.length > idx) {
  const q = deque[idx++];

  cnt++;
  if (cnt === tomatoCnt) {
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
      dx < M &&
      dy < N &&
      dz < H &&
      board[dz][dy][dx] === 0 &&
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
