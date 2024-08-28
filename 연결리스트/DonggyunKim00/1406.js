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
    this.p_cursor = null;
    this.#init(string);
  }

  // 초기화
  #init(string) {
    this.p_cursor = this.head;
    string.split('').forEach((char) => {
      const node = new Node(char);
      this.p_cursor.next = node;
      node.prev = this.p_cursor;
      this.p_cursor = this.p_cursor.next;
    });
  }

  // L : 커서를 왼쪽으로 한 칸 옮김
  prev() {
    if (this.p_cursor.prev) this.p_cursor = this.p_cursor.prev;
  }

  // D : 커서를 오른쪽으로 한 칸 옮김
  next() {
    if (this.p_cursor.next) this.p_cursor = this.p_cursor.next;
  }

  // P $ : $라는 문자를 커서 왼쪽에 추가
  insert(value) {
    const node = new Node(value);

    if (this.p_cursor.next) {
      node.next = this.p_cursor.next;
      node.prev = this.p_cursor;
      this.p_cursor.next.prev = node;
      this.p_cursor.next = node;
    } else {
      this.p_cursor.next = node;
      node.prev = this.p_cursor;
    }

    this.p_cursor = this.p_cursor.next;
  }

  // B : 커서 왼쪽에 있는 문자를 삭제
  delete() {
    if (!this.p_cursor.prev) return;

    if (!this.p_cursor.next) {
      this.p_cursor.prev.next = null;
    } else {
      this.p_cursor.next.prev = this.p_cursor.prev;
      this.p_cursor.prev.next = this.p_cursor.next;
    }

    this.p_cursor = this.p_cursor.prev;
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
