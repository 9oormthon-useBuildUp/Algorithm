const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs
  .readFileSync(filePath, 'utf8')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map(Number));

class Deque {
  constructor(N) {
    this.list = Array.from({ length: N }, (_, idx) => idx + 1);
    this.count = 0;
  }

  moveLeft() {
    this.list.push(this.list.shift());
    this.count += 1;
  }

  moveRight() {
    this.list.unshift(this.list.pop());
    this.count += 1;
  }

  pop() {
    this.list.shift();
  }

  getHead() {
    return this.list[0];
  }
}

const solution = (N, location) => {
  let result = 0;
  const deque = new Deque(N);

  location.forEach((value) => {
    const idx = deque.list.indexOf(value);

    const left = idx;
    const right = deque.list.length - idx;

    if (left > right) {
      while (value !== deque.getHead()) {
        deque.moveRight();
      }
    } else {
      while (value !== deque.getHead()) {
        deque.moveLeft();
      }
    }

    deque.pop();
  });

  return deque.count;
};

const [N] = input.shift();
const [location] = input;
const answer = solution(N, location);
console.log(answer);
