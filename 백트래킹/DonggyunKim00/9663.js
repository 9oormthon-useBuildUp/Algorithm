const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath, 'utf8').toString().trim();

const solution = (N) => {
  // isused1,isused2,isused3 => 같은 선상에 있는지 확인하는 배열들
  // y축이 같은 선상
  let isused1 = Array.from({ length: N }, () => false);
  // (\)축이 같은 선상
  let isused2 = Array.from({ length: N * 2 - 1 }, () => false);
  // (/)축이 같은 선상
  let isused3 = Array.from({ length: N * 2 - 1 }, () => false);

  let count = 0;
  // k는 체스판에 놓여진 퀸의 갯수 => y좌표에 해당하기도 함 => 퀸은 한줄에 하나만 놓을 수 있기 떄문!
  const recursion = (k) => {
    if (k === N) return (count += 1);

    for (let i = 0; i < N; i++) {
      if (!isused1[i] && !isused2[i - k + N - 1] && !isused3[i + k]) {
        isused1[i] = true;
        isused2[i - k + N - 1] = true;
        isused3[i + k] = true;
        recursion(k + 1);
        isused1[i] = false;
        isused2[i - k + N - 1] = false;
        isused3[i + k] = false;
      }
    }
  };
  recursion(0);

  return count;
};

const answer = solution(Number(input));
console.log(answer);
