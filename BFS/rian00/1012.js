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
const di = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

const T = +input[0];
let line = 1;
for (let t = 0; t < T; t++) {
  const [W, H, K] = input[line].split(" ").map((e) => +e);
  const visited = Array.from({ length: H }, () => new Array(W).fill(false));
  const arr = Array.from({ length: H }, () => new Array(W).fill(0));

  for (let i = 1; i <= K; i++) {
    const [x, y] = input[line + i].split(" ").map((e) => +e);
    arr[y][x] = 1;
  }
  const queue = [];

  let cnt = 0;

  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      if (arr[i][j] === 1 && visited[i][j] === false) {
        queue.push(new Point(j, i));
        visited[i][j] = true;
        cnt++;
        while (queue.length > 0) {
          const q = queue.shift();
          for (let k = 0; k < 4; k++) {
            const dx = q.x + di[k][0];
            const dy = q.y + di[k][1];
            if (
              dx >= 0 &&
              dx < W &&
              dy >= 0 &&
              dy < H &&
              arr[dy][dx] === 1 &&
              !visited[dy][dx]
            ) {
              queue.push(new Point(dx, dy));
              visited[dy][dx] = true;
            }
          }
        }
      }
    }
  }
  console.log(cnt);

  line += K + 1;
}
