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

const bfs = (info, location) => {
  // 변수 선언
  const [M, N, K] = info;
  let visited = Array.from({ length: M }, () =>
    Array.from({ length: N }, () => 0)
  );

  // 그래프 만들기
  let graph = Array.from({ length: M }, () =>
    Array.from({ length: N }, () => 0)
  );
  for (let i = 0; i < K; i++) {
    const [x, y] = location[i];
    graph[x][y] = 1;
  }

  // location 배열을 모두 돌면서 각영역에 대한 bfs 로직을 한번씩 돌리는데
  // 이때 각 영역을 한번 돌때마다 count를 1씩 증가
  let count = 0;
  for (let i = 0; i < location.length; i++) {
    const [x, y] = location[i];
    if (visited[x][y]) continue;

    // bfs 로직
    const queue = [];

    let curr = [x, y];
    queue.push(curr);
    visited[curr[0]][curr[1]] = 1;

    while (queue.length) {
      const [curr_x, curr_y] = queue.shift();

      for (let dir = 0; dir < 4; dir++) {
        const move_x = curr_x + dx[dir];
        const move_y = curr_y + dy[dir];

        if (move_x < 0 || move_x >= M || move_y < 0 || move_y >= N) continue;
        if (!graph[move_x][move_y] || visited[move_x][move_y]) continue;

        queue.push([move_x, move_y]);
        visited[move_x][move_y] = 1;
        curr = [move_x, move_y];
      }
    }
    count += 1;
  }

  return count;
};

const solution = (T, inputs) => {
  let index = 0;

  const answer = [];
  for (let i = 0; i < T; i++) {
    const [M, N, K] = inputs[index];
    const arr = inputs.slice(index + 1, index + K + 1);

    answer.push(bfs([M, N, K], arr));

    index += K + 1;
  }

  return answer;
};

const [T, ...inputs] = input;
const answer = solution(T[0], inputs).join('\n');
console.log(answer);
