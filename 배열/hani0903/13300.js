const fs = require('fs');

const filePath = process.platform === 'linux' ? 'dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath, 'utf-8').split('\n');

let roomCnt = 0;

let [N, k] = input[0].split(' ').map(Number);

let girls = Array.from({ length: 6 }).fill(0);
let boys = Array.from({ length: 6 }).fill(0);

for (let i = 1; i <= N; i++) {
  let [S, Y] = input[i].split(' ').map(Number);

  if (S == 0) {
    girls[Y - 1]++;
  } else {
    boys[Y - 1]++;
  }
}

for (let i = 0; i < 6; i++) {
  roomCnt += Math.ceil(girls[i] / k);
  roomCnt += Math.ceil(boys[i] / k);
}

console.log(roomCnt);
