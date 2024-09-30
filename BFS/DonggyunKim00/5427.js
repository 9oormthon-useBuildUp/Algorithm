const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath, 'utf8').toString().trim().split('\n');

class Queue {
  constructor() {
    this.front = 0;
    this.rear = 0;
    this.list = {};
  }

  push(value) {
    this.list[this.rear] = value;
    this.rear += 1;
  }

  shift() {
    const prev = this.list[this.front];
    delete this.list[this.front];
    this.front += 1;
    return prev;
  }

  isEmpty() {
    return this.front === this.rear ? 1 : 0;
  }
}

const bfs = (w, h, graph) => {
  const [dx, dy] = [
    [1, -1, 0, 0],
    [0, 0, 1, -1],
  ];

  const queue = new Queue();
  let f_visited = Array.from({ length: h }, () => Array(w).fill(0));
  let p_visited = Array.from({ length: h }, () => Array(w).fill(0));

  // queue에 불을 먼저 넣어서 불이 번진 후에 상근이가 움직일 수 있게 함
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (graph[i][j] === '*') {
        queue.push([i, j, '*', 0]);
        f_visited[i][j] = 1;
      }
    }
  }

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (graph[i][j] === '@') {
        queue.push([i, j, '@', 0]);
        p_visited[i][j] = 1;
      }
    }
  }

  while (!queue.isEmpty()) {
    const [prev_x, prev_y, prev_v, count] = queue.shift();

    for (let dir = 0; dir < 4; dir++) {
      const mx = prev_x + dx[dir];
      const my = prev_y + dy[dir];
      if (mx < 0 || my < 0 || mx >= h || my >= w) {
        if (prev_v === '@') return count + 1;
        continue;
      }
      if (graph[mx][my] === '#') continue;

      // 불이 번지는 조건
      if (prev_v === '*' && !f_visited[mx][my]) {
        queue.push([mx, my, '*', count + 1]);
        f_visited[mx][my] = 1;
      }

      // 상근이가 이동할 수 있는 조건
      if (prev_v === '@' && graph[mx][my] === '.' && !p_visited[mx][my]) {
        queue.push([mx, my, '@', count + 1]);
        p_visited[mx][my] = 1;
      }

      graph[mx][my] = prev_v;
    }
  }

  return 'IMPOSSIBLE';
};

const solution = (N, inputs) => {
  const answer = [];
  let idx = 0;

  for (let i = 0; i < N; i++) {
    const [w, h] = inputs[idx].split(' ').map(Number);
    const graph = inputs
      .slice(idx + 1, idx + h + 1)
      .map((item) => item.split(''));

    answer.push(bfs(w, h, graph));

    idx += h + 1;
  }

  return answer;
};

const [N, ...inputs] = input;
const answer = solution(N, inputs).join('\n');
console.log(answer);
