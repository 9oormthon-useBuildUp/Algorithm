const fs = require('fs');
const filePath = process.platform === 'linux' ? 'dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath, 'utf-8').split('\n');

const word1 = input[0].split('').sort();
const word2 = input[1].split('').sort();

let cnt = 0;

//포인터
let idx1 = 0;
let idx2 = 0;

while (word1.length > idx1 && word2.length > idx2) {
  //둘 다 존재하면 그냥 넘어간다
  if (word1[idx1] === word2[idx2]) {
    idx1++;
    idx2++;
  } else {
    //한 쪽에만 존재하는 알파벳인 경우,
    cnt++;

    //사전순으로 더 앞에 있는 알파벳을 갖는 배열의 포인터를 1증가시킨다.
    if (word1[idx1] < word2[idx2]) {
      idx1++;
    } else {
      idx2++;
    }
  }
}

//배열의 길이가 다를 수도 있으므로, 안 살펴본 알파벳의 수를 더해준다.
cnt += word1.length - idx1 + (word2.length - idx2);
console.log(cnt);
