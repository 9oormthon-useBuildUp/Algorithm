const { sep } = require("path");

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

class Deque {
  constructor() {
    this.deque = {};
    this.front = 0;
    this.rear = 0;
  }
  size() {
    return this.rear - this.front;
  }
  empty() {
    return this.size() === 0;
  }
  push(item) {
    this.deque[this.rear++] = item;
  }

  deleteLeft() {
    if (this.empty()) return -1;
    const item = this.deque[this.front];
    delete this.deque[this.front++];
    return item;
  }
  deleteRight() {
    if (this.empty()) return -1;
    this.rear--;
    const item = this.deque[this.rear];
    delete this.deque[this.rear];
    return item;
  }
  getFront() {
    if (this.empty()) return -1;
    return this.deque[this.front];
  }

  getBack() {
    if (this.empty()) return -1;
    return this.deque[this.rear - 1];
  }
}

const [N, L] = input[0].split(" ");
const arr = [...input[1].split(" ").map((e) => +e)];

const result = [];
const dq = new Deque();

for (let i = 0; i < N; i++) {
  if (dq.size() > 0 && dq.getFront() < i - L + 1) dq.deleteLeft();

  while (dq.size() > 0 && arr[dq.getBack()] > arr[i]) {
    dq.deleteRight();
  }

  dq.push(i);
  result.push(arr[dq.getFront()]);
}
console.log(result.join(" "));
