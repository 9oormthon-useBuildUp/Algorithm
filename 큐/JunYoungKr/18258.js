class Queue {
  constructor() {
    this.items = [];
    this.frontIndex = 0;
  }

  push(X) {
    this.items.push(X);
  }

  pop() {
    if (this.empty()) return -1;
    const value = this.items[this.frontIndex];
    this.frontIndex++;
    return value;
  }

  size() {
    return this.items.length - this.frontIndex;
  }

  front() {
    if (this.empty()) return -1;
    return this.items[this.frontIndex];
  }

  back() {
    if (this.empty()) return -1;
    return this.items[this.items.length - 1];
  }

  empty() {
    return this.size() === 0 ? 1 : 0;
  }
}

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const queue = new Queue();
const N = parseInt(input[0]);
const output = [];

for (let i = 1; i <= N; i++) {
  const command = input[i].split(" ");
  const order = command[0];

  switch (order) {
    case "push":
      queue.push(parseInt(command[1]));
      break;
    case "pop":
      output.push(queue.pop());
      break;
    case "size":
      output.push(queue.size());
      break;
    case "empty":
      output.push(queue.empty());
      break;
    case "front":
      output.push(queue.front());
      break;
    case "back":
      output.push(queue.back());
      break;
  }
}

console.log(output.join("\n"));
