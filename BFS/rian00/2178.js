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
const arr = [];
for (let i = 0; i < H; i++) {
  arr.push(input[i + 1].split(""));
}

const queue = []; // BFS에서는 queue를 사용합니다.
const visited = Array.from({ length: H }, () => new Array(W).fill(false));

queue.push(new Point(0, 0, 1));
visited[0][0] = true;

const di = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];

while (queue.length > 0) {
  const s = queue.shift();

  if (s.x === W - 1 && s.y === H - 1) {
    console.log(s.step);
    break;
  }

  for (let i = 0; i < 4; i++) {
    const dx = s.x + di[i][0];
    const dy = s.y + di[i][1];

    if (
      dx >= 0 &&
      dx < W &&
      dy >= 0 &&
      dy < H &&
      visited[dy][dx] === false &&
      arr[dy][dx] === "1"
    ) {
      queue.push(new Point(dx, dy, s.step + 1));
      visited[dy][dx] = true;
    }
  }
}
