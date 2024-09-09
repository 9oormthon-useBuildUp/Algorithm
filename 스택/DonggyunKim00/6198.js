const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs
  .readFileSync(filePath, 'utf8')
  .toString()
  .trim()
  .split('\n')
  .map(Number);

const [N, ...building] = input;
const solution = (N, building) => {
  const stack = [];
  let count = 0;

  for (let i = 0; i < N; i++) {
    if (!stack.length) {
      stack.push(building[i]);
      continue;
    }

    while (stack.length > 0) {
      // stack의 top노드가 building[i] 보다 크다면
      if (stack[stack.length - 1] > building[i]) {
        // 스택에 푸쉬가 된다는건 이전에 스택에 쌓여있던 값들이 푸쉬될 값보다 크다는 뜻!
        count += stack.length;
        stack.push(building[i]);
        break;
      } else {
        stack.pop();

        // pop으로 인해 스택이 비어있을때 아직 계산 못한 building이 있다면 푸쉬
        if (!stack.length) {
          stack.push(building[i]);
          break;
        }
      }
    }
  }

  return count;
};

const answer = solution(N, building);
console.log(answer);
