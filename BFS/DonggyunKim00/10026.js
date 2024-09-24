const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath, 'utf8').toString().trim().split('\n');

const [dx, dy] = [
  [1, -1, 0, 0],
  [0, 0, 1, -1],
];

// 적록색약일때 컬러를 바꾸는 함수
const changeColor = (color) => {
  switch (color) {
    case 'R':
    case 'G':
      return 'G';
    default:
      return color;
  }
};

const bfs = (memo, graph, isColorBlind, start) => {
  const [curr_x, curr_y] = start;
  const queue = [[curr_x, curr_y]];

  memo[curr_x][curr_y] = isColorBlind
    ? changeColor(graph[curr_x][curr_y])
    : graph[curr_x][curr_y];

  let head = 0;
  let count = 0;
  while (queue.length > head) {
    const [prev_x, prev_y] = queue[head++];

    for (let i = 0; i < 4; i++) {
      const mx = prev_x + dx[i];
      const my = prev_y + dy[i];

      if (mx < 0 || mx >= N || my < 0 || my >= N) continue;
      if (memo[mx][my]) continue;

      if (isColorBlind) {
        if (memo[prev_x][prev_y] !== changeColor(graph[mx][my])) continue;
      } else {
        if (memo[prev_x][prev_y] !== graph[mx][my]) continue;
      }
      queue.push([mx, my]);
      memo[mx][my] = isColorBlind ? changeColor(graph[mx][my]) : graph[mx][my];
    }
  }
};

const solution = (N, graph) => {
  let usual = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => 0)
  );
  let unusual = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => 0)
  );

  let usualCount = 0;
  let unusualCount = 0;

  for (let x = 0; x < N; x++) {
    for (let y = 0; y < N; y++) {
      // 일반인 기준으로 BFS 탐색
      if (!usual[x][y]) {
        bfs(usual, graph, false, [x, y]);
        usualCount += 1;
      }

      // 적록색약 기준으로 BFS 탐색
      if (!unusual[x][y]) {
        bfs(unusual, graph, true, [x, y]);
        unusualCount += 1;
      }
    }
  }

  return [usualCount, unusualCount];
};

const N = Number(input.shift());
const graph = input.map((item) => item.split(''));
const answer = solution(N, graph).join(' ');
console.log(answer);
