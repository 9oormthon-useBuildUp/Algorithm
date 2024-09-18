const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n').filter(line => line !== '.'); //'.'만 있는 경우 제외하고 input 생성

class Stack {
    constructor() {
        this.storage = [];
        this.top = -1;
    }

    push(item) {
        this.storage[++this.top] = item;
    }

    pop() {
        if (this.top === -1) {
            return -1;
        }
        return this.storage[this.top--];
    }

    isEmpty() {
        return this.top === -1;
    }
}

function solution() {
    let res = '';

    for (let line of input) {
        let stack = new Stack();
        let isValid = true; // 각 라인마다 isValid 초기화

        for (let c of line) {

            // 여는 괄호 -> 스택에 넣기
            if ('[('.includes(c)) {
                stack.push(c);

            // 닫는 괄호
            } else if (')]'.includes(c)) {
                if (stack.isEmpty() || '(['.indexOf(stack.pop()) !== ')]'.indexOf(c)) { // 스택이 비었거나 괄호 쌍이 안맞으면 isValid를 false로 바꿔줌
                    isValid = false;
                    break;
                }
            }
        }

        if (!stack.isEmpty()) {
            isValid = false;
        }

        if (isValid) {
            res += 'yes\n';
        }else {
            res += 'no\n';
        }
    }
    console.log(res);
}

solution();