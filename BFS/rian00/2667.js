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

const N = +input[0];

const board = [];
const visited = Array.from({ length: N }, () => new Array(N).fill(false));

for (let i = 1; i <= N; i++) {
  const rows = input[i].split("").map((e) => +e);
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
let cnt = 0;
const result = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
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
            dx < N &&
            dy >= 0 &&
            dy < N &&
            board[dy][dx] === 1 &&
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
console.log(
  result
    .sort((a, b) => a - b)
    .map((e) => +e)
    .join("\n")
);
