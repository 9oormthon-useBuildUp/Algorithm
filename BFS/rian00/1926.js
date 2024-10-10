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
const visited = Array.from({ length: H }, () => new Array(W).fill(false));

for (let i = 1; i <= H; i++) {
  const rows = input[i].split(" ").map((e) => +e);
  board.push(rows);
}

const deque = [];
const di = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
];
let area = 0;
let maxArea = 0;
let cnt = 0;
const result = [];
for (let i = 0; i < H; i++) {
  for (let j = 0; j < W; j++) {
    if (board[i][j] === 1 && !visited[i][j]) {
      deque.push(new Point(j, i));
      visited[i][j] = true;
      cnt++;
      area = 0;
      while (deque.length > 0) {
        const q = deque.shift();
        area++;
        for (let k = 0; k < 4; k++) {
          const dx = q.x + di[k][0];
          const dy = q.y + di[k][1];
          if (
            dx >= 0 &&
            dx < W &&
            dy >= 0 &&
            dy < H &&
            board[dy][dx] === 1 &&
            !visited[dy][dx]
          ) {
            deque.push(new Point(dx, dy));
            visited[dy][dx] = true;
          }
        }
      }
      if (area > maxArea) {
        maxArea = area;
      }
    }
  }
}
console.log(cnt);
console.log(maxArea);

// console.log(board);
