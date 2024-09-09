class Queue {
  constructor() {
    this.storage = {};
    this.left = 0;
    this.rear = 0;
  }

  push(X) {
    this.storage[this.rear] = X;
    this.rear += 1;
  }

  pop() {
    if (this.empty()) return -1;

    const temp = this.storage[this.left];
    delete this.storage[this.left];
    this.left += 1;

    return temp;
  }

  size() {
    return this.rear - this.left;
  }

  empty() {
    if (this.rear - this.left === 0) return 1;
    else return 0;
  }

  front() {
    if (this.empty()) return -1;
    return this.storage[this.left];
  }

  back() {
    if (this.empty()) return -1;
    return this.storage[this.rear - 1];
  }
}

const solution = (input) => {
  const queue = new Queue();
  const result = [];

  input.forEach((command) => {
    const [cmd, value] = command.split(' ');

    switch (cmd) {
      case 'push':
        queue.push(value);
        break;
      case 'pop':
        result.push(queue.pop());
        break;
      case 'size':
        result.push(queue.size());
        break;
      case 'empty':
        result.push(queue.empty());
        break;
      case 'front':
        result.push(queue.front());
        break;
      case 'back':
        result.push(queue.back());
        break;
    }
  });

  return result;
};

const input = require('fs').readFileSync('text.txt').toString().split('\n');

input.shift();
const answer = solution(input).join('\n');

console.log(answer);
