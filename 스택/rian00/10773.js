const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");
//클래스 선언
class Stack {
  constructor() {
    this.stack = [];
    this.len = 0;
  }
  push(item) {
    this.stack.push(item);
    this.len++;
  }
  pop() {
    if (this.len) {
      this.stack.pop();
      this.len--;
    }
  }
}

///////////////////////////
const s = new Stack();

[N, ...arr] = input;
arr = arr.map((e) => +e);
for (const a of arr) {
  if (a === 0) {
    s.pop();
  } else {
    s.push(a);
  }
}

const total = s.stack.reduce((acc, e) => (acc += e), 0);
console.log(total);
