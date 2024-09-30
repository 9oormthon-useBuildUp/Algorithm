const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs
  .readFileSync(filePath, 'utf8')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map(Number));

const [dx, dy, dz] = [
  [1, -1, 0, 0, 0, 0],
  [0, 0, 1, -1, 0, 0],
  [0, 0, 0, 0, 1, -1],
];

const solution = (info, inputs) => {
  const [M, N, H] = info;
  let graph = [];
  for (let i = 0; i < H; i++) {
    const floor = inputs.slice(i * N, N + i * N);
    graph.push(floor);
  }

  let unripe = 0;
  const queue = [];

  for (let x = 0; x < M; x++) {
    for (let y = 0; y < N; y++) {
      for (let z = 0; z < H; z++) {
        const v = graph[z][y][x];
        if (v === 0) unripe += 1;
        else if (v === 1) queue.push([x, y, z, 0]);
      }
    }
  }

  if (!unripe) return 0;

  let days = 0;
  let head = 0;
  while (queue.length > head) {
    const [prev_x, prev_y, prev_z, prev_step] = queue[head++];

    for (let i = 0; i < 6; i++) {
      const mx = prev_x + dx[i];
      const my = prev_y + dy[i];
      const mz = prev_z + dz[i];

      if (mx < 0 || my < 0 || mz < 0 || mx >= M || my >= N || mz >= H) continue;
      if (graph[mz][my][mx]) continue;

      queue.push([mx, my, mz, prev_step + 1]);
      graph[mz][my][mx] = 1;
      unripe -= 1;
    }
    days = prev_step;
  }

  return unripe ? -1 : days;
};

const [info, ...inputs] = input;
const answer = solution(info, inputs);
console.log(answer);
