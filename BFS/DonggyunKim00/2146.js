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

const bfs = (N, graph, visited, [start_x, start_y, area_num]) => {
  const queue = [[start_x, start_y, area_num]];
  graph[start_x][start_y] = [0, area_num];
  visited[start_x][start_y] = 1;

  const bridge = [];

  let head = 0;
  while (queue.length > head) {
    const [x, y, area_num] = queue[head++];

    for (let dir = 0; dir < 4; dir++) {
      const mx = x + dx[dir];
      const my = y + dy[dir];
      if (mx < 0 || my < 0 || mx >= N || my >= N) continue;
      // 방문 된곳일때 건너뛰기
      if (visited[mx][my]) continue;

      // 육지 구분하기
      if (graph[mx][my] > 0) {
        queue.push([mx, my, area_num]);
        graph[mx][my] = [0, area_num];
        visited[mx][my] = 1;
      }

      if (graph[x][y][1] > 0 && !graph[mx][my]) {
        // [mx,my] 위치 === 다리를 놓을 수 있는 곳
        bridge.push([mx, my, area_num, 1]);
      }
    }
  }

  return bridge;
};

// 다리의 길이를 BFS로 계산
const bridge_bfs = (N, graph, edges) => {
  const queue = [];

  edges.forEach(([x, y, area_num, dist]) => {
    queue.push([x, y, area_num, dist]);
    graph[x][y] = [dist, area_num];
  });

  let shortestBridge = Infinity; // 가장 짧은 다리 길이 저장

  let head = 0;
  while (queue.length > head) {
    const [x, y, area_num, dist] = queue[head++];
    for (let i = 0; i < 4; i++) {
      const mx = x + dx[i];
      const my = y + dy[i];
      if (mx < 0 || my < 0 || mx >= N || my >= N) continue;

      // 바다일 경우 다리를 연장
      if (graph[mx][my] === 0) {
        queue.push([mx, my, area_num, dist + 1]);
        graph[mx][my] = [dist + 1, area_num];
      }

      // 다른 섬에 도착한 경우
      if (graph[mx][my] && graph[mx][my][1] !== area_num) {
        const bridgeLength = dist + graph[mx][my][0]; // 두 경로의 다리 길이 합산
        shortestBridge = Math.min(shortestBridge, bridgeLength); // 최단 거리 갱신
      }
    }
  }
  return shortestBridge;
};

const solution = (N, graph) => {
  let visited = Array.from({ length: N }, () => Array(N).fill(0));
  // idx === 각 대륙의 번호
  // edges[idx] === idx번 대륙의 다리를 놓을 수 있는 좌표값들의 배열(리스트)
  // 좌표값 === [x좌표, y좌표, 대륙번호, 거리]
  const edges = [];

  let area_num = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      // 육지이면서 방문하지 않은곳의 위치를 시작 위치로 지정하여 bfs 실행
      if (graph[i][j] > 0 && !visited[i][j]) {
        area_num += 1;
        edges.push(...bfs(N, graph, visited, [i, j, area_num]));
      }
    }
  }

  const result = bridge_bfs(N, graph, edges);

  return result;
};

const [N, ...graph] = input;
const answer = solution(N[0], graph);
console.log(answer);
