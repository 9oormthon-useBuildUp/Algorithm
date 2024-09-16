const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');


const [N, M] = input[0].split(' ').map(Number);
const position = input[1].split(' ').map(Number);

let deque = Array.from({ length: N }, (_, i) => i + 1);
let cnt = 0;

while (position.length !== 0) {

    const targetIdx = deque.indexOf(position[0]);

    // 현재 위치가 목표 값과 같은지 확인
    if (position[0] === deque[0]) {
        deque.shift();
        position.shift();

    } else if (targetIdx < deque.length - targetIdx) { // 왼쪽으로 이동
        deque.push(deque.shift());
        cnt++;

    } else { // 오른쪽 이동
        deque.unshift(deque.pop());
        cnt++;
    }
}

console.log(cnt);
