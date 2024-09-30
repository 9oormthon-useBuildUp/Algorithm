const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs
  .readFileSync(filePath, 'utf8')
  .toString()
  .trim()
  .split('\n')
  .map((item, idx) =>
    !idx ? item.split(' ').map(Number) : item.split('').map(Number)
  );

const [dx, dy] = [
  [1, -1, 0, 0],
  [0, 0, 1, -1],
];

const solution = (N, M, graph) => {
  const queue = [];
  let visited = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => 0)
  );
  queue.push([0, 0]);
  visited[0][0] = 1;

  while (queue.length) {
    const [prev_x, prev_y] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const nx = prev_x + dx[i];
      const ny = prev_y + dy[i];
      if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
      if (visited[nx][ny] || !graph[nx][ny]) continue;
      queue.push([nx, ny]);
      visited[nx][ny] = visited[prev_x][prev_y] + 1;
    }
  }

  return visited[N - 1][M - 1];
};

const [[N, M], ...graph] = input;
const answer = solution(N, M, graph);
console.log(answer);
