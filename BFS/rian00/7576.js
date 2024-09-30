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
const countTotalTomato = (arr, W, H) => {
  let cnt = 0;
  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      if (arr[i][j] === -1) cnt++;
    }
  }
  return W * H - cnt;
};
const [W, H] = input[0].split(" ").map((e) => +e);
const board = [];
for (let i = 1; i <= H; i++) {
  board.push(input[i].split(" ").map((e) => +e));
}

const deque = [];
const visited = Array.from({ length: H }, () => new Array(W).fill(false));
const di = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];

const tomatoCnt = countTotalTomato(board, W, H);
let cnt = 0;
let flag = false;

for (let i = 0; i < H; i++) {
  for (let j = 0; j < W; j++) {
    if (board[i][j] === 1 && !visited[i][j]) {
      deque.push(new Point(j, i, 0));
      visited[i][j] = true;
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
  for (let k = 0; k < 4; k++) {
    const dx = q.x + di[k][0];
    const dy = q.y + di[k][1];
    if (
      dx >= 0 &&
      dy >= 0 &&
      dx < W &&
      dy < H &&
      board[dy][dx] === 0 &&
      !visited[dy][dx]
    ) {
      deque.push(new Point(dx, dy, q.step + 1));
      board[dy][dx] = 1;
      visited[dy][dx] = true;
    }
  }
}

if (!flag) {
  console.log(-1);
}
