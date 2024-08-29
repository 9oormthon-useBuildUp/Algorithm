const fs = require('fs');

const filePath =
  process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath, 'utf8').split('\n');
input.shift();

class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class Analyzer {
  constructor(string) {
    this.log = string.split('');
    this.head = new Node(-1);
    this.cursor = this.head;
  }

  #add(char) {
    const node = new Node(char);

    // 리스트에 아무런 값이 없는 경우 초기 노드 삽입
    if (!this.head.next) {
      this.head.next = node;
      node.prev = this.head;
    } else {
      // 커서가 마지막 노드에 있는 경우 다음노드 고려 X
      if (!this.cursor.next) {
        this.cursor.next = node;
        node.prev = this.cursor;
      } else {
        node.next = this.cursor.next;
        node.prev = this.cursor;
        this.cursor.next.prev = node;
        this.cursor.next = node;
      }
    }

    this.#next();
  }

  #delete() {
    // 커서가 헤드에 있는 경우 무시
    if (this.cursor === this.head) return;

    // 커서가 마지막 노드에 있는 경우 다음노드 고려 X
    if (!this.cursor.next) {
      this.cursor.prev.next = null;
    } else {
      this.cursor.next.prev = this.cursor.prev;
      this.cursor.prev.next = this.cursor.next;
    }

    this.#prev();
  }

  #prev() {
    if (!this.cursor.prev) return;
    this.cursor = this.cursor.prev;
  }

  #next() {
    if (!this.cursor.next) return;
    this.cursor = this.cursor.next;
  }

  #methodMapper(method) {
    switch (method) {
      case '>':
        return this.#next();
      case '<':
        return this.#prev();
      case '-':
        return this.#delete();
      default:
        return this.#add(method);
    }
  }

  result() {
    this.log.forEach((method) => {
      this.#methodMapper(method);
    });

    let currNode = this.head.next;
    const string = [];
    while (currNode) {
      string.push(currNode.value);
      currNode = currNode.next;
    }
    return string.join('');
  }
}

const solution = (input) => {
  const answer = [];

  input.forEach((log) => {
    const analyzer = new Analyzer(log);
    answer.push(analyzer.result());
  });

  return answer;
};

console.log(solution(input).join('\n'));
