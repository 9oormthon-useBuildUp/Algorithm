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

const melt_bfs = (N, M, graph) => {
  const queue = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      // 빙산일때만 아래 로직 실행
      if (!graph[i][j]) continue;

      let seaCount = 0;
      // 주변 바다 카운트
      for (let dir = 0; dir < 4; dir++) {
        const mx = i + dx[dir];
        const my = j + dy[dir];
        if (mx < 0 && my < 0 && mx >= N && my >= M) continue;

        // 바다일때 seaCount 1증가
        if (!graph[mx][my]) seaCount += 1;
      }

      // 녹일 양을 기록
      if (seaCount > 0) queue.push([i, j, seaCount]);
    }
  }

  // graph에 녹인 양만큼 빼고 할당하기, 원래 바다였다면 그대로 0 할당
  queue.forEach(([x, y, melt]) => {
    graph[x][y] = Math.max(graph[x][y] - melt, 0);
  });
};

const count_bfs = (N, M, graph, visited) => {
  let regionsCount = 0;

  const bfs = ([i, j]) => {
    const queue = [[i, j]];
    visited[i][j] = 1;

    let head = 0;
    while (queue.length > head) {
      const [x, y] = queue[head++];

      for (let dir = 0; dir < 4; dir++) {
        const mx = x + dx[dir];
        const my = y + dy[dir];
        if (mx < 0 || my < 0 || mx >= N || my >= M) continue;

        // 빙산이 있고, 방문한적이 없다면 이동
        if (graph[mx][my] && !visited[mx][my]) {
          queue.push([mx, my]);
          visited[mx][my] = 1;
        }
      }
    }
  };

  // bfs가 호출된 횟수가 구역의 개수임
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (graph[i][j] > 0 && !visited[i][j]) {
        bfs([i, j]);
        regionsCount++;
      }
    }
  }

  return regionsCount;
};

const solution = (N, M, graph) => {
  let time = 0;

  while (true) {
    const visited = Array.from({ length: N }, () => Array(M).fill(0));

    melt_bfs(N, M, graph);
    const regionsCount = count_bfs(N, M, graph, visited);

    // regionsCount가 0 이라면 빙산이 전부 녹은 것
    if (!regionsCount) return 0;
    if (regionsCount >= 2) return time + 1;

    time++;
  }
};

const [[N, M], ...graph] = input;
const answer = solution(N, M, graph);
console.log(answer);
