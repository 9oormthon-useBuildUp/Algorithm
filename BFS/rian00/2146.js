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
for (let i = 1; i <= N; i++) board.push(input[i].split(" ").map((e) => +e));

const visited = Array.from({ length: N }, () => new Array(N).fill(false));

console.log(visited);

let num = 1;
const deque = [];
const di = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];
let idx = 0;
//섬 번호 바꾸기
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (board[i][j] === 1 && !visited[i][j]) {
      deque.push(new Point(j, i));
      visited[i][j] = true;
      while (deque.length > idx) {
        const q = deque[idx++];
        board[q.y][q.x] = num;

        for (const [x, y] of di) {
          const dx = q.x + x;
          const dy = q.y + y;
          if (
            dx >= 0 &&
            dy >= 0 &&
            dx < N &&
            dy < N &&
            board[dy][dx] === 1 &&
            !visited[dy][dx]
          ) {
            deque.push(new Point(dx, dy));
            visited[dy][dx] = true;
          }
        }
      }
      num++;
    }
  }
}
console.log(board);
