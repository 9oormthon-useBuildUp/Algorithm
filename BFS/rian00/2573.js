const { sep } = require("path");

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");
class Point {
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
  }
}

const [H, W] = input[0].split(" ").map((e) => +e);
const board = [];
for (let i = 1; i <= H; i++) {
  board.push(input[i].split(" ").map((e) => +e));
}
const deque = [];
let idx = 0;

const di = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];
const save = [...board];
for (let i = 0; i < H; i++) save[i] = [...board[i]];

const yearLater = (arr, saveArr) => {
  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      if (arr[i][j] !== 0) {
        for (const [x, y] of di) {
          const dx = j + x;
          const dy = i + y;
          if (dx >= 0 && dy >= 0 && dx < W && dy < H && saveArr[dy][dx] === 0) {
            if (arr[i][j] - 1 >= 0) arr[i][j]--;
          }
        }
      }
    }
  }
};

const isTheEnd = (arr) => {
  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      if (arr[i][j] !== 0) {
        return false;
      }
    }
  }
  return true;
};

let year = 0;
while (true) {
  let cnt = 0;
  if (isTheEnd(board)) {
    console.log(0);
    break;
  }
  const visited = Array.from({ length: H }, () => new Array(W).fill(false));

  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      if (board[i][j] !== 0 && visited[i][j] === false) {
        deque.push(new Point(j, i));
        visited[i][j] = true;
        cnt++;
        while (deque.length > idx) {
          const q = deque[idx++];
          for (const [x, y] of di) {
            const dx = q.x + x;
            const dy = q.y + y;

            if (
              dx >= 0 &&
              dy >= 0 &&
              dx < W &&
              dy < H &&
              board[dy][dx] !== 0 &&
              !visited[dy][dx]
            ) {
              deque.push(new Point(dx, dy));
              visited[dy][dx] = true;
            }
          }
        }
      }
    }
  }
  year++;
  if (cnt >= 2) {
    console.log(year - 1);
    break;
  }
  yearLater(board, save);
  for (let i = 0; i < H; i++) save[i] = [...board[i]];
}
