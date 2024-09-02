class Stack {
  constructor() {
    this.arr = [];
  }

  push(X) {
    this.arr.push(X);
  }

  pop() {
    if (this.empty()) return -1;
    return this.arr.pop();
  }

  size() {
    return this.arr.length;
  }

  empty() {
    if (this.size() === 0) return 1;
    return 0;
  }

  top() {
    if (this.empty()) return -1;
    return this.arr[this.size() - 1];
  }
}

const solution = (input, stack) => {
  const answer = [];

  input.forEach((command) => {
    const [cmd, X] = command.split(' ');

    switch (cmd) {
      case 'push':
        stack.push(X);
        break;
      case 'pop':
        answer.push(stack.pop());
        break;
      case 'size':
        answer.push(stack.size());
        break;
      case 'empty':
        answer.push(stack.empty());
        break;
      case 'top':
        answer.push(stack.top());
        break;
    }
  });

  return answer.join('\n');
};

const input = require('fs').readFileSync(0).toString().trim().split('\n');

input.shift();

const stack = new Stack();
const answer = solution(input, stack);

console.log(answer);
