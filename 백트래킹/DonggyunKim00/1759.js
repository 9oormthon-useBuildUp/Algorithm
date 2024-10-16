const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs
  .readFileSync(filePath, 'utf8')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' '));

const MOUM_LIST = ['a', 'e', 'i', 'o', 'u'];

const solution = (L, C, alphabet) => {
  alphabet.sort();

  const isused = Array.from({ length: C }, () => false);

  let moum_cnt = 0;
  let jaum_cnt = 0;

  let answer = [];
  const recursion = (k) => {
    if (k === L) {
      //
      if (moum_cnt >= 1 && jaum_cnt >= 2) console.log(answer.join(''));
      return;
    }

    for (let i = 0; i < C; i++) {
      if (!isused[i]) {
        // 사전식이 아니라면 건너뛰기
        if (answer.length && answer[answer.length - 1] > alphabet[i]) continue;

        // 알파벳이 모음또는 자음일때 각각에 대하여 1씩 증가
        if (MOUM_LIST.includes(alphabet[i])) moum_cnt += 1;
        else jaum_cnt += 1;
        isused[i] = true;
        answer.push(alphabet[i]);

        recursion(k + 1);

        // 알파벳이 모음또는 자음일때 각각에 대하여 1씩 감소
        if (MOUM_LIST.includes(alphabet[i])) moum_cnt -= 1;
        else jaum_cnt -= 1;
        isused[i] = false;
        answer.pop();
      }
    }
  };

  recursion(0);
};

const [L, C] = input.shift().map(Number);
solution(L, C, ...input);
