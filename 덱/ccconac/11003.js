class Deque {
  constructor() {
    this.storage = {};
    this.head = 0;
    this.tail = 0;
  }

  push_back(X) {
    this.storage[this.tail] = X;
    this.tail += 1;
  }

  pop_front() {
    if (this.empty()) return -1;

    const temp = this.storage[this.head];
    delete this.storage[this.head];
    this.head += 1;

    return temp;
  }

  pop_back() {
    if (this.empty()) return -1;

    this.tail -= 1;
    const temp = this.storage[this.tail];
    delete this.storage[this.tail];

    return temp;
  }

  #size() {
    return this.tail - this.head;
  }

  empty() {
    return this.#size() ? 0 : 1;
  }

  front() {
    return this.empty() ? -1 : this.storage[this.head];
  }

  back() {
    return this.empty() ? -1 : this.storage[this.tail - 1];
  }
}

const solution = (N, L, A) => {
  const deque = new Deque();
  const answer = new Array(N);

  for (let i = 0; i < N; i++) {
    if (!deque.empty() && deque.front() < i - L + 1) {
      deque.pop_front();
    }

    while (!deque.empty() && A[deque.back()] > A[i]) {
      deque.pop_back();
    }

    deque.push_back(i);
    answer[i] = A[deque.front()];

    if ((i + 1) % 10000 === 0) {
      process.stdout.write(answer.slice(i - 9999, i + 1).join(' ') + '\n');
    }
  }

  if (N % 10000 !== 0) {
    process.stdout.write(answer.slice(N - (N % 10000)).join(' ') + '\n');
  }
};

const input = require('fs').readFileSync(0).toString().trim().split('\n');
const [[N, L], A] = input.map((value) => value.split(' ').map(Number));

solution(N, L, A);
