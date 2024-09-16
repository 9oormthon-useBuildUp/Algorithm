class Deque {
  constructor(N) {
    this.storage = Array.from({ length: N }, (_, index) => index + 1);
    this.head = 0;
    this.tail = N;
  }

  pop_front() {
    if (this.#empty()) return -1;

    const temp = this.storage[this.head];
    this.head += 1;

    return temp;
  }

  size() {
    return this.tail - this.head;
  }

  #empty() {
    return this.size() === 0;
  }

  indexOf(value) {
    for (let i = this.head; i < this.tail; i++) {
      if (this.storage[i] === value) return i;
    }

    return -1;
  }

  rotateLeft() {
    const temp = this.storage[this.head];

    for (let i = this.head; i < this.tail - 1; i++) {
      this.storage[i] = this.storage[i + 1];
    }

    this.storage[this.tail - 1] = temp;
  }

  rotateRight() {
    const temp = this.storage[this.tail - 1];

    for (let i = this.tail - 1; i > this.head; i--) {
      this.storage[i] = this.storage[i - 1];
    }

    this.storage[this.head] = temp;
  }
}

const solution = (N, locations) => {
  const deque = new Deque(N);
  let answer = 0;

  locations.forEach((value) => {
    const index = deque.indexOf(value);
    const left = index - deque.head;
    const right = deque.size() - left;

    if (left < right) {
      for (let i = 0; i < left; i++) deque.rotateLeft();
    } else {
      for (let i = 0; i < right; i++) deque.rotateRight();
    }

    deque.pop_front();
    answer += Math.min(left, right);
  });

  return answer;
};

const input = require('fs')
  .readFileSync(0)
  .toString()
  .trim()
  .split('\n')
  .map((value) => value.split(' ').map(Number));

const [[N, _], locations] = input;
const answer = solution(N, locations);

console.log(answer);
