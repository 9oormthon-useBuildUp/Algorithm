const { sep } = require("path");

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

class Queue {
  constructor() {
    this.queue = [];
    this.size = 0;
  }
  push(x) {
    this.queue.push(x);
    this.size++;
  }
  pop() {
    if (this.size > 0) {
      this.size--;
      return this.queue.shift();
    } else {
      return -1;
    }
  }

  getSize() {
    return this.size;
  }
  empty() {
    return +(this.size === 0);
  }
  front() {
    if (this.size > 0) return this.queue[0];
    return -1;
  }
  back() {
    if (this.size > 0) return this.queue[this.size - 1];
    return -1;
  }
}

const [N, ...arr] = input;

const queue = new Queue();
for (const e of arr) {
  const [method, num] = e.split(" ");
  switch (method) {
    case "push":
      queue.push(num);
      break;
    case "pop":
      console.log(queue.pop());
      break;
    case "size":
      console.log(queue.getSize());
      break;
    case "empty":
      console.log(queue.empty());
      break;
    case "front":
      console.log(queue.front());
      break;
    case "back":
      console.log(queue.back());
      break;
  }
}
