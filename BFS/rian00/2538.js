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

const [H, W, K] = input[0].split(" ").map((e) => +e);

const board = Array.from({ length: H }, () => new Array(W).fill(0));
const visited = Array.from({ length: H }, () => new Array(W).fill(false));

for (let i = 1; i <= K; i++) {
  const [x1, y1, x2, y2] = input[i].split(" ").map((e) => +e);

  for (let j = y1; j < y2; j++) {
    for (let k = x1; k < x2; k++) {
      board[j][k] = 1;
    }
  }
}

const deque = [];
const di = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
];
let area = 0;
let cnt = 0;
const result = [];
for (let i = 0; i < H; i++) {
  for (let j = 0; j < W; j++) {
    if (board[i][j] === 0 && !visited[i][j]) {
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
            board[dy][dx] === 0 &&
            !visited[dy][dx]
          ) {
            deque.push(new Point(dx, dy));
            visited[dy][dx] = true;
          }
        }
      }
      result.push(area);
    }
  }
}
console.log(cnt);
console.log(result.sort((a, b) => a - b).join(" "));

// console.log(board);
