const bfs = (row, col) => {
  const queue = [[row, col]];
  visited[row][col] = 1;

  let steps = 1;

  while (queue.length) {
    const size = queue.length;

    for (let i = 0; i < size; i++) {
      const [x, y] = queue.shift();

      if (x === N - 1 && y === M - 1) return steps;

      ds.forEach((direction) => {
        const [posX, posY] = [x + direction[0], y + direction[1]];

        if (posX >= 0 && posY >= 0 && posX < N && posY < M && maze[posX][posY] && !visited[posX][posY]) {
          visited[posX][posY] = 1;
          queue.push([posX, posY]);
        }
      });
    }

    steps += 1;
  }
};

const input = require('fs').readFileSync(0).toString().trim().split('\n');

const [N, M] = input.shift().split(' ').map(Number);
const maze = input.map((line) => line.split('').map(Number));
const visited = Array.from({ length: N }, () => Array(M).fill(0));
const ds = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
];

const result = bfs(0, 0);
console.log(result);
