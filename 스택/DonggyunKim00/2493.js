const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [N, towers] = fs
  .readFileSync(filePath, 'utf8')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map(Number));

const solution = (N, towers) => {
  let answer = new Array(N).fill(0);
  const stack = [];

  for (let i = 0; i < N; i++) {
    const stackNode = {
      idx: i + 1,
      value: towers[i],
    };

    // stack이 비어있다면 노드 추가
    if (!stack.length) {
      stack.push(stackNode);
      continue;
    }

    // top 노드의 값이 추가하려는 stackNode의 값보다 커질때까지 pop
    // stack이 비었다면 while문 탈출(stack이 비었을때 while문의 조건이 돌면 에러발생)
    while (stack[stack.length - 1].value < stackNode.value) {
      stack.pop();
      if (!stack.length) break;
    }

    // 새로운 노드를 넣기 전에 답안 배열에 top 노드의 인덱스값 할당, top 노드가 없다면 0을 할당
    answer[i] = stack[stack.length - 1]?.idx || 0;
    stack.push(stackNode);
  }
  return answer;
};

const answer = solution(...N, towers).join(' ');
console.log(answer);
