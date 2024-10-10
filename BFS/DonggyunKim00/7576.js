const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs
  .readFileSync(filePath, 'utf8')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map(Number));

const [dx, dy] = [
  [1, -1, 0, 0],
  [0, 0, 1, -1],
];

const solution = (M, N, graph) => {
  // 변수 초기화
  const queue = [];
  let unripe = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      const v = graph[i][j];
      if (v === 0) {
        unripe += 1;
        continue;
      }
      if (v === 1) queue.push([i, j]);
    }
  }

  if (unripe === 0) return 0;

  let head = 0;
  let days = 0;

  // 토마토가 모두 익는 상황,  토마토가 모두 익지는 못하는 상황 판단
  while (queue.length > head) {
    const [prev_x, prev_y] = queue[head++];

    for (let i = 0; i < 4; i++) {
      const nx = prev_x + dx[i];
      const ny = prev_y + dy[i];
      if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
      if (graph[nx][ny] !== 0) continue;
      queue.push([nx, ny]);
      graph[nx][ny] = graph[prev_x][prev_y] + 1;
      unripe -= 1;
      days = graph[nx][ny] - 1;
    }
  }

  return unripe > 0 ? -1 : days;
};

const [[M, N], ...graph] = input;
const answer = solution(M, N, graph);
console.log(answer);
