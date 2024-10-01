const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath, 'utf8').toString().trim().split('');

const small = ['(', ')'];
const big = ['[', ']'];

const calculate = (calc_stack) => {
  let total = 0;

  const recursion = (min, max) => {
    let innerSum = 0;

    while (calc_stack.length) {
      const {
        score: _,
        range: [innerMin, innerMax],
      } = calc_stack[calc_stack.length - 1]; // top 노드 확인

      // 이전에 pop 된 노드와 top 노드 비교
      if (innerMin > min && innerMax < max) {
        // pop의 range에 포함된다면 top 노드 pop
        const top = calc_stack.pop();
        innerSum += top.score * recursion(innerMin, innerMax); // 재귀 호출
      } else break; // range에 포함이 안된다면 재귀 종료
    }

    // 첫번째 재귀에서 innerSum이 0이라면 score를 곱하지 못하기때문에 재귀함수의 기본값으로 1반환
    return innerSum > 0 ? innerSum : 1;
  };

  while (calc_stack.length) {
    const {
      score,
      range: [min, max],
    } = calc_stack.pop(); // 스택에서 하나의 항목을 꺼냄

    if (max - min > 1) total += score * recursion(min, max);
    else total += score;
  }

  return total;
};

const solution = (input) => {
  const stack = [];
  const calc_stack = [];

  for (let i = 0; i < input.length; i++) {
    const node = {
      value: input[i],
      idx: i,
    };

    // 예외처리
    if (!stack.length) {
      if (node.value === small[1] || node.value === big[1]) return 0;
      stack.push(node);
      continue;
    }

    const top = stack[stack.length - 1];

    // 여는괄호
    if (node.value === small[0] || node.value === big[0]) {
      stack.push(node);
      continue;
    }

    // 닫는 괄호일때 pop 후 해당 노드의 정보 calc_stack에 push
    // 괄호가 매칭이 안될때는 0을 리턴 후 함수 종료
    // 닫는 소괄호
    if (top.value === small[0]) {
      if (node.value === small[1]) {
        const calc_node = {
          score: 2,
          range: [stack.pop().idx, node.idx],
        };
        calc_stack.push(calc_node);
      } else return 0;
    }
    // 닫는 대괄호
    else {
      if (node.value === big[1]) {
        const calc_node = {
          score: 3,
          range: [stack.pop().idx, node.idx],
        };
        calc_stack.push(calc_node);
      } else return 0;
    }
  }

  return stack.length ? 0 : calculate(calc_stack);
};

const answer = solution(input);
console.log(answer);
