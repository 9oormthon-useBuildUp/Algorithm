const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath, 'utf8').toString().trim().split('\n');

const solution = (N, eggs) => {
  let answer = 0;

  const recursion = (start) => {
    if (start === N) {
      let broken = 0;
      for (let i = 0; i < N; i++) {
        if (eggs[i][0] <= 0) broken += 1;
      }
      answer = Math.max(broken, answer);
      return;
    }

    // 현재 계란을 들고 더 이상 부딪힐 수 있는 계란이 없다
    let hitOther = true;
    for (let i = 0; i < N; i++) {
      if (i === start) continue;
      if (eggs[start][0] <= 0 || eggs[i][0] <= 0) continue;

      // 위 조건문을 통과했다면
      // 현재 계란을 들고 부딪힐 수 있는 계란이 있다는 것
      hitOther = false;

      // 백트래킹
      eggs[i][0] -= eggs[start][1];
      eggs[start][0] -= eggs[i][1];
      recursion(start + 1);
      eggs[i][0] += eggs[start][1];
      eggs[start][0] += eggs[i][1];
    }
    // 위 for문을 돌고서도 여전히 부딪힐수 있는 계란이 없다면 넘어가기
    if (hitOther) recursion(start + 1);
  };

  recursion(0);

  return answer;
};

const N = Number(input.shift());
const eggs = input.map((item) => item.split(' ').map(Number));
const answer = solution(N, eggs);
console.log(answer);
