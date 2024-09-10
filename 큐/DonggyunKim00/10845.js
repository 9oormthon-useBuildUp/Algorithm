const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs
  .readFileSync(filePath, 'utf8')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' '));

class Queue {
  constructor() {
    this.list = [];
  }

  push(value) {
    this.list.push(value);
  }

  pop() {
    if (!this.list.length) return -1;

    const value = this.list.shift();
    return value;
  }

  size() {
    return this.list.length;
  }

  empty() {
    return this.list.length ? 0 : 1;
  }

  front() {
    if (!this.size()) return -1;

    return this.list[0];
  }

  back() {
    if (!this.size()) return -1;

    return this.list[this.list.length - 1];
  }
}

const [N, ...operate] = input;
const solution = (n, operate) => {
  const queue = new Queue();
  const answer = [];

  operate.forEach(([method, value]) => {
    switch (method) {
      case 'push':
        queue.push(Number(value));
        break;
      case 'pop':
        answer.push(queue.pop());
        break;
      case 'size':
        answer.push(queue.size());
        break;
      case 'empty':
        answer.push(queue.empty());
        break;
      case 'front':
        answer.push(queue.front());
        break;
      case 'back':
        answer.push(queue.back());
        break;
    }
  });

  return answer;
};

const answer = solution(Number(N[0]), operate).join('\n');
console.log(answer);
