class Queue {
  constructor(cards, N) {
    this.storage = cards;
    this.front = 0;
    this.rear = N;
  }

  push(X) {
    this.storage[this.rear] = X;
    this.rear += 1;
  }

  pop() {
    if (this.empty()) return -1;

    const temp = this.storage[this.front];
    delete this.storage[this.front];
    this.front += 1;

    return temp;
  }

  size() {
    return this.rear - this.front;
  }

  empty() {
    return this.size() ? 0 : 1;
  }

  getHead() {
    return this.storage[this.front];
  }
}

const solution = (N) => {
  const cards = Array.from({ length: N }, (_, index) => index + 1);
  const queue = new Queue(cards, N);

  for (let i = 0; i < N; i++) {
    if (queue.size() < 2) break;

    queue.pop();
    queue.push(queue.pop());
  }

  return queue;
};

const input = require('fs').readFileSync(0).toString().trim();

const N = Number(input);
const answer = solution(N).getHead();

console.log(answer);
