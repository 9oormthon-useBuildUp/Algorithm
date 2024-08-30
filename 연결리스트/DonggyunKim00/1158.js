const fs = require('fs');

const filePath =
  process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs
  .readFileSync(filePath, 'utf8')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class Solution {
  constructor(N, K) {
    this.head = null;
    this.count = K;
    this.len = N;
    this.#init(N);
  }

  // 1부터 N까지의 연결리스트 구현
  #init(total) {
    for (let i = 1; i <= total; i++) {
      const node = new Node(i);
      if (!this.head) this.head = node;
      else {
        // 리스트의 마지막에 노드 추가
        let currNode = this.head;
        while (currNode.next) {
          currNode = currNode.next;
        }
        currNode.next = node;
        node.prev = currNode;
      }

      // 마지막 노드가 head 노드, head 노드가 마지막 노드를 가리킴
      if (i === total) {
        node.next = this.head;
        this.head.prev = node;
      }
    }
  }

  #delete() {
    if (!this.head) return;

    // count(K) 값에 따른 다음노드 호출
    let cnt = 1;
    while (cnt < this.count) {
      this.head = this.head.next;
      cnt += 1;
    }

    // 사라질 노드 저장
    let store = this.head.value;
    // 현재 헤더 제거
    this.head.prev.next = this.head.next;
    this.head.next.prev = this.head.prev;
    // 헤드를 다음노드로 한칸이동
    this.head = this.head.next;
    // 리스트의 길이 1감소
    this.len -= 1;

    return store;
  }

  result() {
    const answer = [];

    while (this.len > 0) {
      answer.push(this.#delete());
    }

    return answer;
  }
}

const [N, K] = input;
const solution = new Solution(N, K);

console.log(`<${solution.result().join(', ')}>`);
