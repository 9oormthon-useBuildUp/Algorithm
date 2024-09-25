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
const T = +input[0];
let line = 1;

const di = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];
// const [W, H] = input[line].split(" ").map((e) => +e);
// console.log("w,h:", W, H);
for (let t = 0; t < T; t++) {
  const [W, H] = input[line].split(" ").map((e) => +e);
  const board = [];
  for (let i = 1; i <= H; i++) {
    board.push(input[line + i].split(""));
  }

  const deque = [];
  const Jvisited = Array.from({ length: H }, () => new Array(W).fill(false));
  const Fvisited = Array.from({ length: H }, () => new Array(W).fill(false));

  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      if (board[i][j] === "@") {
        deque.push(new Point(j, i, 0));
        Jvisited[i][j] = true;
      }
    }
  }
  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      if (board[i][j] === "*") {
        deque.push(new Point(j, i, 0));
        Fvisited[i][j] = true;
      }
    }
  }
  let flag = false;
  let idx = 0;
  while (deque.length > idx) {
    const q = deque[idx++];

    if (
      (q.x <= 0 || q.y <= 0 || q.x >= W - 1 || q.y >= H - 1) &&
      board[q.y][q.x] === "@"
    ) {
      console.log(q.step + 1);
      flag = true;
      break;
    }
    for (let k = 0; k < 4; k++) {
      const dx = q.x + di[k][0];
      const dy = q.y + di[k][1];
      //상근이 일 경우
      if (dx >= 0 && dy >= 0 && dx < W && dy < H) {
        if (
          board[q.y][q.x] === "@" &&
          board[dy][dx] === "." &&
          !Jvisited[dy][dx]
        ) {
          deque.push(new Point(dx, dy, q.step + 1));
          board[dy][dx] = "@";
          Jvisited[dy][dx] = true;
        }
        //불일 경우
        if (
          board[q.y][q.x] === "*" &&
          board[dy][dx] !== "#" &&
          !Fvisited[dy][dx]
        ) {
          deque.push(new Point(dx, dy, q.step + 1));
          board[dy][dx] = "*";
          Fvisited[dy][dx] = true;
        }
      }
    }
    //   console.log(board);
  }
  if (!flag) {
    console.log("IMPOSSIBLE");
  }
  line += H + 1;
}
