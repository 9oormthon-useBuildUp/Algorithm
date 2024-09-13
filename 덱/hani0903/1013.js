const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const position = input[1].split(' ').map(Number);

class Deque {

    dat = [];
    cnt = 0;
    head = 0;

    constructor(N) {
        this.dat = Array.from({ length: N }, (_, i) => i + 1);
        this.head = this.dat[0];
    }

    pop_front() {
        return this.dat.shift();
    }

    shift_left() {
        this.dat.push(this.dat.shift());
        this.cnt++;
        this.head = this.dat[0];
    }

    shift_right() {
        this.dat.unshift(this.dat.pop());
        this.cnt++;
        this.head = this.dat[0];
    }
}

let deque = new Deque(N);

while (position.length !== 0) {

    const targetIdx = deque.dat.indexOf(position[0]);
    
    // 현재 위치가 목표 값과 같은지 확인
    if (position[0] === deque.dat[0]) {
        deque.pop_front();
        position.shift();

    } else if (targetIdx < deque.dat.length - targetIdx) { // 왼쪽으로 이동
        deque.shift_left();

    } else { // 오른쪽 이동
        deque.shift_right();
    }
}

console.log(deque.cnt);
