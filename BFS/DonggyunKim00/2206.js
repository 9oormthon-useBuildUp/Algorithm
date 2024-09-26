const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath, 'utf8').toString().trim().split('\n');

const [dx, dy] = [
  [1, -1, 0, 0],
  [0, 0, 1, -1],
];

const bfs = (N, M, graph) => {
  // 3차원 visited 배열을 사용해, [벽을 부수지 않은 경우, 벽을 부순 경우] 상태 관리
  let visited = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => [0, 0])
  );

  const queue = [[0, 0, 0]]; // [x, y, 벽을 부쉈는지 여부 (0 = 안 부숨, 1 = 부숨)]
  visited[0][0][0] = 1; // 시작점, 벽을 부수지 않은 상태로 방문 표시

  let head = 0;
  while (queue.length > head) {
    const [x, y, broken] = queue[head++];

    // 도착지점에 도달하면 현재까지의 이동 거리를 반환
    if (x === N - 1 && y === M - 1) return visited[x][y][broken];

    for (let i = 0; i < 4; i++) {
      const mx = x + dx[i];
      const my = y + dy[i];

      if (mx < 0 || my < 0 || mx >= N || my >= M) continue;

      // 벽을 만난 경우
      if (graph[mx][my] && !broken) {
        // 벽을 아직 부수지 않은 경우에만 부수고 진행
        if (visited[mx][my][1] === 0) {
          visited[mx][my][1] = visited[x][y][0] + 1; // 벽을 부수고 방문
          queue.push([mx, my, 1]); // 벽을 부순 상태로 큐에 추가
        }
      }

      // 벽을 만나지 않은 경우
      if (!graph[mx][my] && !visited[mx][my][broken]) {
        visited[mx][my][broken] = visited[x][y][broken] + 1; // 방문 기록
        queue.push([mx, my, broken]); // 현재 상태 유지하며 큐에 추가
      }
    }
  }

  return -1; // 도착지점에 도달하지 못한 경우
};

const solution = (N, M, graph) => {
  return bfs(N, M, graph);
};

const [N, M] = input.shift().split(' ').map(Number);
const graph = input.map((item) => item.split('').map(Number));
const answer = solution(N, M, graph);
console.log(answer);
