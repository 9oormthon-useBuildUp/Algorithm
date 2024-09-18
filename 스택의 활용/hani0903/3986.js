const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');

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

    peek(){
        if (this.top === -1) {
            return -1;
        }
        return this.storage[this.top];
    }
}

function solution() {
    let cnt = 0;

    //테스트 케이스 하나씩 읽기
    for (let line of input.slice(1)) {

        let stack = new Stack();

        //테스트 케이스에서 c 하나씩 읽어오기
        for(let c of line){
            if(stack.peek() === c){ //스택의 top에 위치한 item과 c가 같으면 pop
                stack.pop();
            }else{ //다르면 push
                stack.push(c);
            }
        }

        if(stack.isEmpty()){
            cnt++;
        }
    }

    console.log(cnt);
}

solution();