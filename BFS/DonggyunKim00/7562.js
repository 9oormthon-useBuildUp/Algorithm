const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs
  .readFileSync(filePath, 'utf8')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map(Number));

const [dx, dy] = [
  [1, 2, 2, 1, -1, -2, -2, -1],
  [-2, -1, 1, 2, 2, 1, -1, -2],
];

const bfs = (length, start, end) => {
  let visited = Array.from({ length }, () => Array.from({ length }, () => -1));

  let curr = start;
  const queue = [curr];
  visited[curr[0]][curr[1]] = 0;

  while (queue.length) {
    const [prev_x, prev_y] = queue.shift();
    for (let dir = 0; dir < 8; dir++) {
      const mx = prev_x + dx[dir];
      const my = prev_y + dy[dir];

      if (mx < 0 || mx >= length || my < 0 || my >= length) continue;
      if (visited[mx][my] !== -1) continue;

      queue.push([mx, my]);
      curr = [mx, my];
      visited[mx][my] = visited[prev_x][prev_y] + 1;
    }
  }

  return visited[end[0]][end[1]];
};

const solution = (N, input) => {
  const answer = [];
  for (let i = 0; i < N; i++) {
    const [l, start, end] = input.slice(3 * i, 3 * i + 3);
    answer.push(bfs(l[0], start, end));
  }
  return answer;
};

const N = input.shift();
const answer = solution(Number(N), input).join('\n');
console.log(answer);
