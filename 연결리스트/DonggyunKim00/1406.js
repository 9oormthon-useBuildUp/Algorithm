const fs = require('fs');

const filePath =
  process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath, 'utf8').split('\n');

const string = input.shift();
const M = Number(input.shift());

class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class Editor {
  constructor(string) {
    this.head = new Node(-1);
    this.cursor = string.length;
    this.total = string.length;
    this.#init(string);
  }

  // 초기화
  #init(string) {
    let currNode = this.head;
    const initNodeList = string.split('').map((char) => new Node(char));

    while (initNodeList.length) {
      const node = initNodeList.shift();
      currNode.next = node;
      node.prev = currNode;
      currNode = currNode.next;
    }
  }

  // L : 커서를 왼쪽으로 한 칸 옮김
  prev() {
    if (this.cursor) this.cursor -= 1;
  }

  // D : 커서를 오른쪽으로 한 칸 옮김
  next() {
    if (this.cursor + 1 <= this.total) this.cursor += 1;
  }

  // P $ : $라는 문자를 커서 왼쪽에 추가
  insert(value) {
    const node = new Node(value);
    let currNode = this.head;

    for (let i = 0; i < this.cursor; i++) {
      currNode = currNode.next;
    }

    if (this.total === this.cursor) {
      currNode.next = node;
      node.prev = currNode;
    } else {
      node.next = currNode.next;
      node.prev = currNode;
      currNode.next.prev = node;
      currNode.next = node;
    }

    this.cursor += 1;
    this.total += 1;
  }

  // B : 커서 왼쪽에 있는 문자를 삭제
  delete() {
    if (this.cursor === 0) return;

    let currNode = this.head;
    for (let i = 0; i < this.cursor; i++) {
      currNode = currNode.next;
    }

    if (this.cursor === this.total) {
      currNode.prev.next = null;
    } else {
      currNode.next.prev = currNode.prev;
      currNode.prev.next = currNode.next;
    }

    this.cursor -= 1;
    this.total -= 1;
  }

  print() {
    const result = [];

    let currNode = this.head.next;
    while (currNode) {
      result.push(currNode.value);
      currNode = currNode.next;
    }

    return result;
  }
}

const list = new Editor(string);

input
  .map((item) => item.split(' '))
  .forEach(([method, value]) => {
    switch (method) {
      case 'L':
        return list.prev();
      case 'D':
        return list.next();
      case 'B':
        return list.delete();
      case 'P':
        return list.insert(value);
    }
  });

console.log(list.print().join(''));
