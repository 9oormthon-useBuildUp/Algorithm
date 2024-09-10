class Queue {
  constructor() {
    this.items = [];
    this.frontIndex = 0;
  }
  push(X) {
    this.items.push(X);
  }
  pop() {
    const value = this.items[this.frontIndex];
    this.frontIndex++;
    return value;
  }
  size() {
    return this.items.length - this.frontIndex;
  }

  front() {
    return this.items[this.frontIndex];
  }
}

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString();

// console.log(input);

const queue = new Queue();
const N = parseInt(input);

for (let i = 1; i <= N; i++) {
  queue.push(i);
}

while (queue.size() > 1) {
  queue.pop(); // 첫 번째 카드를 버림
  queue.push(queue.pop()); // 다음 카드를 맨 뒤로 옮김
}

console.log(queue.front());
