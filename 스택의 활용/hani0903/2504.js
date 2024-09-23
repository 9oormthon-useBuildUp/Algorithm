class Stack{

    constructor() {
        this.storage = [];
        this.top = -1;
    }

    push(value) {
        this.storage[++this.top] = value;
    }

    pop() {
        if(this.isEmpty()){
            return -1;
        }
        return this.storage[this.top--];
    }

    peek() {
        if(this.isEmpty()){
            return -1;
        }
        return this.storage[this.top];
    }

    isEmpty() {
        return this.top === -1;
    }

    size() {
        return this.top + 1;
    }
}

function solution() {
    let fs = require('fs');
    let filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt'
    let input = fs.readFileSync(filePath, 'utf-8').trim().split('');

    let res = 0;    
    let stack = new Stack();
    let temp = 1;  // 임시 계산 값, 괄호 안에서 곱해질 값

    function isPair(s, c) {
        switch(c) {
            case ')':
                return s === '(';
            case ']':
                return s === '[';
            default:
                return false;
        }
    }

    for (const [idx, c] of input.entries()) {

        if (c === '(') {
            temp *= 2;  // '('는 2배
            stack.push(c);
        } else if (c === '[') {
            temp *= 3;  // '['는 3배
            stack.push(c);
        } else if (c === ')') {
            // 스택이 비었거나, 쌍이 맞지 않으면 유효하지 않은 수식
            if (stack.isEmpty() || stack.peek() !== '(') {
                res = 0;
                isValid = false;
                break;
            }
            // 직전 문자가 여는 괄호면 더하기
            if (input[idx - 1] === '(') {
                total += temp;
            }
            temp /= 2;  // 닫는 괄호이므로 2로 나누기
            stack.pop();
        } else if (c === ']') {
            if (stack.isEmpty() || stack.peek() !== '[') {
                res = 0;
                isValid = false;
                break;
            }
            if (input[idx - 1] === '[') {
                total += temp;
            }
            temp /= 3;  // 닫는 괄호이므로 3으로 나누기
            stack.pop();
        }
    }

    // 모든 괄호가 정상적으로 처리되었는지 확인
    if (!stack.isEmpty()) {
        res = 0;
    } else {
        res = total;
    }

    console.log(res);
}

solution();
