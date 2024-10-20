const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs
  .readFileSync(filePath, 'utf8')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

const solution = (N, M) => {
  let visited = Array(N).fill(false);
  let arr = Array.from(M).fill(0);

  const recursion = (k) => {
    if (k === M) return console.log(arr.join(' '));

    for (let i = 0; i < N; i++) {
      if (!visited[i]) {
        arr[k] = i + 1;
        visited[i] = true;
        recursion(k + 1);
        visited[i] = false;
      }
    }
  };

  recursion(0);
};

const [N, M] = input;
solution(N, M);
