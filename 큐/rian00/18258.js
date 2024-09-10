const { sep } = require("path");

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

class Queue {
  constructor() {
    this.list = [];
    this.size = 0;
    this.s = 0;
    this.e = -1;
  }
  push(x) {
    this.list.push(x);
    this.size++;
    this.e++;
  }
  pop() {
    if (this.size > 0) {
      this.size--;
      return this.list[this.s++];
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
    if (this.size > 0) return this.list[this.s];
    return -1;
  }
  back() {
    if (this.size > 0) return this.list[this.e];
    return -1;
  }
}

let [N, ...arr] = input;
const result = [];
const queue = new Queue();
for (const e of arr) {
  const [method, num] = e.split(" ");
  switch (method) {
    case "push":
      queue.push(+num);
      break;
    case "pop":
      result.push(+queue.pop());
      break;
    case "size":
      result.push(+queue.getSize());
      break;
    case "empty":
      result.push(+queue.empty());
      break;
    case "front":
      result.push(+queue.front());
      break;
    case "back":
      result.push(+queue.back());
      break;
  }
}

console.log(result.join("\n"));
