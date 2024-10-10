const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath, 'utf8').toString().trim().split('\n');

const bfs = (L, R, C, graph) => {
  const [dx, dy, dz] = [
    [1, -1, 0, 0, 0, 0],
    [0, 0, 1, -1, 0, 0],
    [0, 0, 0, 0, 1, -1],
  ];

  const queue = [];

  for (let i = 0; i < L; i++) {
    for (let j = 0; j < R; j++) {
      for (let k = 0; k < C; k++) {
        if (graph[i][j][k] === 'S') {
          graph[i][j][k] = 0;
          queue.push([i, j, k, 0]);
        }
      }
    }
  }

  let head = 0;
  let time = 0;
  while (queue.length > head) {
    const [prev_x, prev_y, prev_z, count] = queue[head++];
    for (let dir = 0; dir < 6; dir++) {
      const mx = prev_x + dx[dir];
      const my = prev_y + dy[dir];
      const mz = prev_z + dz[dir];

      if (mx < 0 || my < 0 || mz < 0 || mx >= L || my >= R || mz >= C) continue;
      if (graph[mx][my][mz] === '#' || typeof graph[mx][my][mz] === 'number')
        continue;

      // 이동할 수 있는 조건
      if (graph[mx][my][mz] === '.') {
        graph[mx][my][mz] = count + 1;
        queue.push([mx, my, mz, count + 1]);
      }

      // 탈출 통로를 찾으면 while문 종료
      if (graph[mx][my][mz] === 'E') {
        time = count + 1;
        break;
      }
    }
  }

  return time ? `Escaped in ${time} minute(s).` : 'Trapped!';
};
const solution = (input) => {
  const answer = [];

  let idx = 0;
  while (input[idx] !== '0 0 0') {
    const [L, R, C] = input[idx].split(' ').map(Number);
    // 3차원 배열 만들기
    const graph = input
      .slice(idx + 1, idx + L * R + L)
      .map((item) => item.split(''))
      .reduce(
        (acc, cur) => {
          if (cur.length === 0) acc.push([]);
          else acc[acc.length - 1].push(cur);
          return acc;
        },
        [[]]
      );

    answer.push(bfs(L, R, C, graph));
    idx += L * R + L + 1;
  }

  return answer;
};

const answer = solution(input).join('\n');
console.log(answer);
