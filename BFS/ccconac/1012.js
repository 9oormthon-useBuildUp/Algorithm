const bfs = (startX, startY, map, N, M) => {
  const queue = [[startX, startY]];

  while (queue.length) {
    const [x, y] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const xPos = x + ds[i][0];
      const yPos = y + ds[i][1];

      console.log(xPos, yPos);

      if (xPos >= 0 && yPos >= 0 && xPos < N && yPos < M && map[xPos][yPos]) {
        map[xPos][yPos] = 0;
        queue.push([xPos, yPos]);
      }
    }
  }
};

const input = require('fs')
  .readFileSync(0)
  .toString()
  .trim()
  .split('\n')
  .map((value) => value.split(' ').map(Number));

const T = input[0][0];
const ds = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const solution = (input) => {
  let index = 1;

  for (let i = 0; i < T; i++) {
    const [M, N, K] = input[index++];
    const map = Array.from({ length: N }, () => new Array(M).fill(0));

    for (let j = 0; j < K; j++) {
      const [x, y] = input[index++];
      map[y][x] = 1;
    }

    let wormCount = 0;

    for (let x = 0; x < N; x++) {
      for (let y = 0; y < M; y++) {
        if (map[x][y]) {
          bfs(x, y, map, N, M);
          wormCount += 1;
        }
      }
    }

    console.log(wormCount);
  }
};

solution(input);
