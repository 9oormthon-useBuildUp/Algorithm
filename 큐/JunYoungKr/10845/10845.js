const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

class Queue {
  constructor() {
    this.items = []; // 큐를 저장할 배열 초기화
  }

  // 정수 X를 큐에 넣는 연산
  push(X) {
    this.items.push(X); // 배열의 맨 뒤에 요소 추가
  }

  // 큐에서 가장 앞에 있는 정수를 빼고 그 수를 출력
  pop() {
    if (this.isEmpty()) {
      return -1; // 큐가 비어있으면 -1 반환
    } else {
      return this.items.shift(); // 배열의 첫 번째 요소 제거하고 그 값 반환
    }
  }

  // 큐에 들어있는 정수의 개수를 반환
  size() {
    return this.items.length; // 배열의 길이 반환
  }

  // 큐가 비어있으면 1, 아니면 0을 반환
  empty() {
    return this.isEmpty() ? 1 : 0; // 큐가 비어있으면 1, 아니면 0 반환
  }

  // 큐의 가장 앞에 있는 정수를 반환
  front() {
    if (this.isEmpty()) {
      return -1; // 큐가 비어있으면 -1 반환
    } else {
      return this.items[0]; // 배열의 첫 번째 요소 반환
    }
  }

  // 큐의 가장 뒤에 있는 정수를 반환
  back() {
    if (this.isEmpty()) {
      return -1; // 큐가 비어있으면 -1 반환
    } else {
      return this.items[this.items.length - 1]; // 배열의 마지막 요소 반환
    }
  }

  // 큐가 비어있는지 확인하는 메서드
  isEmpty() {
    return this.items.length === 0; // 배열의 길이가 0이면 true 반환
  }
}

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
