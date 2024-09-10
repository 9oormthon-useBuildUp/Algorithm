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
    this.left = 0;
    this.right = 0;
  }

  push(value) {
    this.list[this.right] = value;
    this.right += 1;
  }

  pop() {
    if (this.left >= this.right) return -1;

    const value = this.list[this.left];
    this.left += 1;
    return value;
  }

  size() {
    return this.right - this.left;
  }

  empty() {
    return this.size() ? 0 : 1;
  }

  front() {
    if (!this.size()) return -1;

    return this.list[this.left];
  }

  back() {
    if (!this.size()) return -1;

    return this.list[this.right - 1];
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
