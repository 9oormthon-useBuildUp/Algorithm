const { sep } = require("path");

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

let [N, ...info] = input;
N = +N;
let q = [];

const result = [];
for (let i = 0; i < N; i++) {
  let s = info[i].split(" ");
  if (s[0] === "push_back") {
    q.push(+s[1]);
  } else if (s[0] === "push_front") {
    q.unshift(+s[1]);
  } else if (s[0] === "pop_front") {
    if (q.length === 0) {
      result.push(-1);
    } else {
      result.push(q.shift());
    }
  } else if (s[0] === "pop_back") {
    if (q.length === 0) {
      result.push(-1);
    } else {
      result.push(q.pop());
    }
  } else if (s[0] === "size") {
    result.push(q.length);
  } else if (s[0] === "front") {
    if (q.length === 0) {
      result.push(-1);
    } else {
      result.push(q[0]);
    }
  } else if (s[0] === "back") {
    if (q.length === 0) {
      result.push(-1);
    } else {
      result.push(q[q.length - 1]);
    }
  } else if (s[0] === "empty") {
    result.push(q.length === 0 ? 1 : 0);
  }
}

console.log(result.join("\n"));
