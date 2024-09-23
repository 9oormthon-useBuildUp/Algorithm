const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath, 'utf8').toString().trim().split('\n');

const [dx, dy] = [
  [1, -1, 0, 0],
  [0, 0, 1, -1],
];

const solution = (R, C, graph) => {
  const J = [];
  const F = [];
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (graph[i][j] === 'J') {
        J.push([i, j, 'J', 1]);
        if (i === 0 || j === 0 || i === R - 1 || j === C - 1) return 1;
        continue;
      }
      if (graph[i][j] === 'F') F.push([i, j, 'F', null]);
    }
  }

  const queue = [...F, ...J];
  let head = 0;
  while (queue.length > head) {
    const [prev_x, prev_y, value, count] = queue[head++];

    for (let dir = 0; dir < 4; dir++) {
      const mx = prev_x + dx[dir];
      const my = prev_y + dy[dir];

      if (mx < 0 || my < 0 || mx >= R || my >= C) {
        if (value === 'J') return count;
        continue;
      }
      if (graph[mx][my] === 'F' || graph[mx][my] === '#') continue;

      if (value === 'J') {
        if (graph[mx][my] === '.') {
          queue.push([mx, my, 'J', count + 1]);
          graph[mx][my] = 'J';
        }
      } else if (value === 'F') {
        if (graph[mx][my] === '.' || graph[mx][my] === 'J') {
          queue.push([mx, my, 'F']);
          graph[mx][my] = 'F';
        }
      }
    }
  }

  return 'IMPOSSIBLE';
};

const [R, C] = input.shift().split(' ').map(Number);
const graph = input.map((item) => item.split(''));
const answer = solution(R, C, graph);
console.log(answer);
