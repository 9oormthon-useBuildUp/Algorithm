const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath, 'utf8').toString().trim();

class Card {
  constructor(N) {
    this.list = Array.from({ length: N }, (_, idx) => idx + 1);
    this.head = 0;
    this.tail = N;
  }

  #h_move() {
    this.head += 1;
  }

  #t_move() {
    this.tail += 1;
  }

  run() {
    while (this.head < this.tail - 1) {
      this.#h_move();

      this.list.push(this.list[this.head]);
      this.#t_move();

      this.#h_move();
    }
  }
}

const solution = (N) => {
  const card = new Card(N);
  card.run();
  return card.list[card.tail - 1];
};

const answer = solution(Number(input));
console.log(answer);
