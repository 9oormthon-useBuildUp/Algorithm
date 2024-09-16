const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs
  .readFileSync(filePath, 'utf8')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map(Number));

const solution = (N, L, arr) => {
  let D = {};
  let head = 0;
  let tail = -1;
  let minKey = 0;

  const answer = [];

  for (let i = 0; i < N; i++) {
    D[i] = arr[i];
    tail += 1;

    if (D[minKey] > D[i]) minKey = i;

    if (tail - head === L) {
      delete D[head];
      head += 1;

      if (!D[minKey]) {
        const entryObj = Object.entries(D);
        const [min_key, min_value] = entryObj.reduce(
          ([acc_key, acc_value], [key, value]) => {
            return acc_value > value ? [key, value] : [acc_key, acc_value];
          },
          entryObj[0]
        );

        minKey = min_key;
      }
    }

    answer.push(D[minKey]);
  }

  return answer;
};

const [N, L] = input[0];
const arr = input[1];
const answer = solution(N, L, arr).join(' ');
console.log(answer);

// const chunkSize = 10000; // 약 10,000 단위로 끊기

// 결과를 바로 출력할 수 있도록 저장할 문자열
// let buffer = '';

// for (let i = 0; i < answer.length; i += chunkSize) {
//   // 10,000 단위로 슬라이스하여 출력
//   buffer += answer.slice(i, i + chunkSize);
//   process.stdout.write(buffer);

//   // 메모리 관리를 위해 buffer를 비워줌
//   buffer = '';
// }
// console.log(buffer.trimEnd());
