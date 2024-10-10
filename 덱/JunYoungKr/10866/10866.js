class Deque {
  constructor() {
    this.items = [];
  }

  // 덱의 앞에 원소를 추가
  push_front(X) {
    this.items.unshift(X); // X를 덱의 앞에 추가
  }

  // 덱의 뒤에 원소를 추가
  push_back(X) {
    this.items.push(X); // X를 덱의 뒤에 추가
  }

  // 덱의 앞에서 원소를 제거하고 반환
  pop_front() {
    return this.items.length > 0 ? this.items.shift() : -1; // 덱이 비어있다면 -1 반환
  }

  // 덱의 뒤에서 원소를 제거하고 반환
  pop_back() {
    return this.items.length > 0 ? this.items.pop() : -1; // 덱이 비어있다면 -1 반환
  }

  // 덱의 크기 반환
  size() {
    return this.items.length; // 덱의 크기 반환
  }

  // 덱이 비어있는지 확인
  empty() {
    return this.items.length > 0 ? 0 : 1; // 비어있다면 1, 아니면 0 반환
  }

  // 덱의 앞에 있는 원소 반환
  front() {
    return this.items.length > 0 ? this.items[0] : -1; // 덱이 비어있다면 -1 반환
  }

  // 덱의 뒤에 있는 원소 반환
  back() {
    return this.items.length > 0 ? this.items[this.items.length - 1] : -1; // 덱이 비어있다면 -1 반환
  }
}

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input.shift(), 10);
const deque = new Deque();

let result = [];

for (let i = 0; i < N; i++) {
  const [command, value] = input[i].split(" ");

  switch (command) {
    case "push_front":
      deque.push_front(parseInt(value, 10));
      break;
    case "push_back":
      deque.push_back(parseInt(value, 10));
      break;
    case "pop_front":
      result.push(deque.pop_front());
      break;
    case "pop_back":
      result.push(deque.pop_back());
      break;
    case "size":
      result.push(deque.size());
      break;
    case "empty":
      result.push(deque.empty());
      break;
    case "front":
      result.push(deque.front());
      break;
    case "back":
      result.push(deque.back());
      break;
    default:
      break;
  }
}

console.log(result.join("\n"));
