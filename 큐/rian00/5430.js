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
}

const [N, ...info] = input;

//true:순방향 false:역방향
let direction = true;
const result = [];
for (let i = 0; i < N; i++) {
  const p = info[3 * i];
  const n = info[3 * i + 1];
  const arr = info[3 * i + 2].split(/[, \[\]]/).filter((e) => e !== "");

  const dq = new Deque();
  direction = true;

  for (let j = 0; j < n; j++) {
    dq.push(arr[j]);
  }
  let save = [];

  for (const e of p) {
    let item;
    switch (e) {
      case "R":
        direction = !direction;

        break;
      case "D":
        if (direction) {
          item = dq.deleteLeft();
        } else {
          item = dq.deleteRight();
        }
        if (item === -1) {
          save.push("error");
          break;
        }
        break;
    }
    if (item === -1) break;
  }
  if (save.length === 0) {
    while (!dq.empty()) {
      if (direction) {
        save.push(dq.deleteLeft());
      } else {
        save.push(dq.deleteRight());
      }
    }
    save = "[" + save.join(",") + "]";
  }

  result.push(save);
}

console.log(result.join("\n"));
