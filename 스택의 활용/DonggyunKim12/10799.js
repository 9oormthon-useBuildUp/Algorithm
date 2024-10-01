const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath, 'utf8').toString().trim().split('');

const solution = (input) => {
  const stack = [];
  let total = 0;

  for (let i = 0; i < input.length; i++) {
    const v = input[i];

    if (v === '(') stack.push(v);
    else {
      stack.pop();
      // 레이저 일때 스택에 있는 여는괄호 수 만큼 total에 추가
      if (input[i - 1] === '(') total += stack.length;
      // 레이저가 아닐때 닫는괄호라면 라인이 끝난거임 => 1추가
      else total += 1;
    }
  }

  return total;
};

const answer = solution(input);
console.log(answer);
