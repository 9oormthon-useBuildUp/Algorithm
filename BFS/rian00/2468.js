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
for (let i = 1; i <= N; i++) {
  board.push(input[i].split(" ").map((e) => +e));
}

let maxNum = 0;
for (let i = 0; i < N; i++) {
  maxNum = Math.max(maxNum, Math.max(...board[i], maxNum));
}

let maxCnt = 0;
const di = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];
for (let n = 1; n <= maxNum; n++) {
  const deque = [];
  const visited = Array.from({ length: N }, () => new Array(N).fill(false));
  let cnt = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (board[i][j] >= n && !visited[i][j]) {
        deque.push(new Point(j, i));
        visited[i][j] = true;
        cnt++;
        while (deque.length > 0) {
          const q = deque.shift();
          for (let k = 0; k < 4; k++) {
            const dx = q.x + di[k][0];
            const dy = q.y + di[k][1];
            if (
              dx >= 0 &&
              dy >= 0 &&
              dx < N &&
              dy < N &&
              board[dy][dx] >= n &&
              !visited[dy][dx]
            ) {
              deque.push(new Point(dx, dy));
              visited[dy][dx] = true;
            }
          }
        }

        if (cnt > maxCnt) {
          maxCnt = cnt;
        }
      }
    }
  }
}
console.log(maxCnt);
