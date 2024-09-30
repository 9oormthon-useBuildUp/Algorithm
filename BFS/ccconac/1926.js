const bfs = (row, col) => {
  const queue = [[row, col]];

  let area = 0;
  visited[row][col] = 1;

  while (queue.length) {
    const [x, y] = queue.shift();
    area += 1;

    ds.forEach((direction) => {
      const [posX, posY] = [x + direction[0], y + direction[1]];

      if (posX >= 0 && posY >= 0 && posX < N && posY < M && input[posX][posY] && !visited[posX][posY]) {
        visited[posX][posY] = 1;
        queue.push([posX, posY]);
      }
    });
  }

  return area;
};

const input = require('fs')
  .readFileSync(0)
  .toString()
  .trim()
  .split('\n')
  .map((value) => value.split(' ').map(Number));

const [N, M] = input.shift();
const visited = Array.from({ length: N }, () => new Array(M).fill(0));
const ds = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

let pictureCount = 0;
let maxArea = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (input[i][j] && !visited[i][j]) {
      const area = bfs(i, j);

      pictureCount += 1;
      maxArea = Math.max(maxArea, area);
    }
  }
}

console.log(pictureCount);
console.log(maxArea);
