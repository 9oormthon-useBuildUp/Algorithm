class Deque {
  constructor() {
    this.storage = {};
    this.head = 0;
    this.tail = 0;
  }

  push_front(X) {
    this.head -= 1;
    this.storage[this.head] = X;
  }

  push_back(X) {
    this.storage[this.tail] = X;
    this.tail += 1;
  }

  pop_front() {
    if (this.empty()) return -1;

    const temp = this.storage[this.head];
    delete this.storage[this.head];
    this.head += 1;

    return temp;
  }

  pop_back() {
    if (this.empty()) return -1;

    this.tail -= 1;
    const temp = this.storage[this.tail];
    delete this.storage[this.tail];

    return temp;
  }

  size() {
    return this.tail - this.head;
  }

  empty() {
    return this.size() ? 0 : 1;
  }

  front() {
    return this.empty() ? -1 : this.storage[this.head];
  }

  back() {
    return this.empty() ? -1 : this.storage[this.tail - 1];
  }
}

const solution = (input) => {
  const deque = new Deque();
  const answer = [];

  input.forEach((command) => {
    const [cmd, x] = command.split(' ');

    switch (cmd) {
      case 'push_front':
        deque.push_front(x);
        break;
      case 'push_back':
        deque.push_back(x);
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

const input = require('fs').readFileSync(0).toString().trim().split('\n');

input.shift();
const answer = solution(input).join('\n');

console.log(answer);
