const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs
  .readFileSync(filePath, 'utf8')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' '));

class Deque {
  constructor(N) {
    this.list = {};
    this.head = N;
    this.tail = N + 1;
  }

  push_front(value) {
    this.list[this.head] = value;
    this.head -= 1;
  }

  push_back(value) {
    this.list[this.tail] = value;
    this.tail += 1;
  }

  pop_front() {
    if (this.head + 1 >= this.tail) return -1;
    const popValue = this.list[this.head + 1];
    this.head += 1;
    return popValue;
  }

  pop_back() {
    if (this.head + 1 >= this.tail) return -1;
    const popValue = this.list[this.tail - 1];
    this.tail -= 1;
    return popValue;
  }

  size() {
    return this.tail - this.head - 1;
  }

  empty() {
    return this.size() ? 0 : 1;
  }

  front() {
    if (!this.size()) return -1;
    return this.list[this.head + 1];
  }

  back() {
    if (!this.size()) return -1;
    return this.list[this.tail - 1];
  }
}

const solution = (N, operate) => {
  const deque = new Deque(N);
  const answer = [];

  operate.forEach(([method, value]) => {
    switch (method) {
      case 'push_front':
        deque.push_front(Number(value));
        break;
      case 'push_back':
        deque.push_back(Number(value));
        break;
      case 'pop_front':
        answer.push(deque.pop_front());
        break;
      case 'pop_back':
        answer.push(deque.pop_back());
        break;
      case 'size':
        answer.push(deque.size());
        break;
      case 'empty':
        answer.push(deque.empty());
        break;
      case 'front':
        answer.push(deque.front());
        break;
      case 'back':
        answer.push(deque.back());
        break;
    }
  });
  return answer;
};

const [N, ...inputs] = input;
const answer = solution(Number(N[0]), inputs).join('\n');
console.log(answer);
