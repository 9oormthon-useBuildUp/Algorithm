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
const [H, W] = input[0].split(" ").map((e) => +e);
const board = [];
for (let i = 1; i <= H; i++) {
  board.push(input[i].split(""));
}
const deque = [];
const Jvisited = Array.from({ length: H }, () => new Array(W).fill(false));
const Fvisited = Array.from({ length: H }, () => new Array(W).fill(false));

for (let i = 0; i < H; i++) {
  for (let j = 0; j < W; j++) {
    if (board[i][j] === "J") {
      deque.push(new Point(j, i, 0));
      Jvisited[i][j] = true;
    }
  }
}
for (let i = 0; i < H; i++) {
  for (let j = 0; j < W; j++) {
    if (board[i][j] === "F") {
      deque.push(new Point(j, i, 0));
      Fvisited[i][j] = true;
    }
  }
}
const di = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];
let flag = false;
while (deque.length > 0) {
  const q = deque.shift();

  if (
    (q.x <= 0 || q.y <= 0 || q.x >= W - 1 || q.y >= H - 1) &&
    board[q.y][q.x] === "J"
  ) {
    console.log(q.step + 1);
    flag = true;
    break;
  }
  for (let k = 0; k < 4; k++) {
    const dx = q.x + di[k][0];
    const dy = q.y + di[k][1];
    //J일 경우
    if (dx >= 0 && dy >= 0 && dx < W && dy < H) {
      if (
        board[q.y][q.x] === "J" &&
        board[dy][dx] === "." &&
        !Jvisited[dy][dx]
      ) {
        deque.push(new Point(dx, dy, q.step + 1));
        board[dy][dx] = "J";
        Jvisited[dy][dx] = true;
      }
      //F일 경우
      if (
        board[q.y][q.x] === "F" &&
        board[dy][dx] !== "#" &&
        !Fvisited[dy][dx]
      ) {
        deque.push(new Point(dx, dy, q.step + 1));
        board[dy][dx] = "F";
        Fvisited[dy][dx] = true;
      }
    }
  }
  //   console.log(board);
}
if (!flag) {
  console.log("IMPOSSIBLE");
}
