const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath, 'utf8').toString().trim().split('\n');
input.shift();
class Stack {
  constructor() {
    this.list = [];
    this.pos = 0;
  }

  push(value) {
    this.list[this.pos] = value;
    this.pos += 1;
  }

  pop() {
    if (!this.pos) return -1;

    let popValue = this.list[this.pos - 1];
    this.pos -= 1;

    return popValue;
  }

  size() {
    return this.pos;
  }

  empty() {
    return this.pos ? 0 : 1;
  }

  top() {
    if (!this.pos) return -1;

    return this.list[this.pos - 1];
  }
}

const stack = new Stack();
input
  .map((item) => item.split(' '))
  .forEach(([method, value]) => {
    switch (method) {
      case 'push':
        return stack.push(Number(value));
      case 'pop':
        return console.log(stack.pop());
      case 'size':
        return console.log(stack.size());
      case 'empty':
        return console.log(stack.empty());
      case 'top':
        return console.log(stack.top());
    }
  });
