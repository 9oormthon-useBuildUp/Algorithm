const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath, 'utf8').toString().trim().split('\n');

class Deque {
  constructor(p, n, arr) {
    this.list = {};
    this.method = p;
    this.head = 0;
    this.tail = n - 1;
    this.isReverse = false;
    this.#init(arr);
  }

  #init(arr) {
    for (let i = 0; i <= this.tail; i++) {
      this.list[i] = arr[i];
    }
  }

  #delete() {
    if (this.isReverse) {
      delete this.list[this.tail];
      this.tail -= 1;
    } else {
      delete this.list[this.head];
      this.head += 1;
    }
  }

  #reverse() {
    this.isReverse = !this.isReverse;
  }

  #size() {
    return this.tail - this.head + 1;
  }

  run() {
    const result = [];
    for (let i = 0; i < this.method.length; i++) {
      const command = this.method[i];

      if (!this.#size() && command === 'D') {
        result.push('error');
        break;
      }

      switch (command) {
        case 'R':
          this.#reverse();
          break;
        case 'D':
          this.#delete();
          break;
      }

      if (i === this.method.length - 1) {
        const values = Object.values(this.list);

        this.isReverse
          ? result.push(JSON.stringify(values.reverse()))
          : result.push(JSON.stringify(values));
      }
    }

    return result[0];
  }
}

const solution = (T, testCase) => {
  const answer = [];
  testCase.forEach(([p, n, arr]) => {
    const P = p.split('');
    const N = Number(n);
    const ARR = JSON.parse(arr);

    const deque = new Deque(P, N, ARR);
    answer.push(deque.run());
  });
  return answer;
};

const T = parseInt(input.shift());
const testCase = input.reduce((acc, cur, idx) => {
  if (idx % 3 === 0) acc.push([]);
  acc[acc.length - 1].push(cur);
  return acc;
}, []);

const answer = solution(T, testCase).join('\n');
console.log(answer);
