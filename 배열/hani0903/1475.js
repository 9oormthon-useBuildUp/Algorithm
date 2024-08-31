const fs = require('fs');

const filePath = process.platform === 'linux' ? 'dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath, 'utf-8').trim().split('').map(Number);

// 0부터 8까지의 인덱스를 갖는 배열을 만들었다 -> 9는 6에 같이 저장한다.
const freq = Array.from({ length: 9 }).fill(0);

for (let i = 0; i < input.length; i++) {
  //9이면 6번에 저장
  if (input[i] === 9) {
    freq[6]++;
  } else {
    //아니면 번호에 해당하는 요소 값 증가
    freq[input[i]]++;
  }
}

//6번 인덱스에 저장된 값을 2로 나눈 뒤 올림한다.
freq[6] = Math.ceil(freq[6] / 2);

//가장 큰 값을 찾는다.
console.log(Math.max(...freq));
