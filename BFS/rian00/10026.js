const { sep } = require("path");

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

class Point {
  constructor(_x, _y, _al) {
    this.x = _x;
    this.y = _y;
    this.al = _al;
  }
}
const N = +input[0];
const board = [];
for (let i = 1; i <= N; i++) {
  board.push(input[i].split(""));
}
let cnt = 0;
let cbnCnt = 0;
const visited = Array.from({ length: N }, () => new Array(N).fill(false));
const cbnVisited = Array.from({ length: N }, () => new Array(N).fill(false));

let deque = [];
const di = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (!visited[i][j]) {
      deque.push(new Point(j, i, board[i][j]));
      cnt++;
      visited[i][j] = true;
      while (deque.length > 0) {
        const q = deque.shift();
        for (const [x1, y1] of di) {
          const dx = q.x + x1;
          const dy = q.y + y1;
          if (
            dx >= 0 &&
            dy >= 0 &&
            dx < N &&
            dy < N &&
            board[dy][dx] === q.al &&
            !visited[dy][dx]
          ) {
            deque.push(new Point(dx, dy, q.al));
            visited[dy][dx] = true;
          }
        }
      }
    }
  }
}
//적록 색약
deque = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (!cbnVisited[i][j]) {
      deque.push(new Point(j, i, board[i][j]));
      cbnCnt++;
      cbnVisited[i][j] = true;
      while (deque.length > 0) {
        const q = deque.shift();
        for (const [x1, y1] of di) {
          const dx = q.x + x1;
          const dy = q.y + y1;
          if (dx >= 0 && dy >= 0 && dx < N && dy < N && !cbnVisited[dy][dx]) {
            if (q.al === "B" && board[dy][dx] === q.al) {
              deque.push(new Point(dx, dy, q.al));
              cbnVisited[dy][dx] = true;
            } else if (
              (q.al === "G" || q.al === "R") &&
              (board[dy][dx] === "G" || board[dy][dx] === "R")
            ) {
              deque.push(new Point(dx, dy, q.al));
              cbnVisited[dy][dx] = true;
            }
          }
        }
      }
      //   console.log("----------");
    }
  }
}
console.log(cnt, cbnCnt);
