const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const [N, ...input] = fs.readFileSync(filePath, 'utf-8').trim().split('\n');

class Deque {

    constructor() {
        this.storage = {};
        this.head = 50000;
        this.tail = 50001;
    }

    push_front(value) {

        this.storage[this.head] = value;
        this.head--;

    }

    push_back(value) {

        this.storage[this.tail] = value;
        this.tail++;
    }

    pop_front() {

        if(!this.size()){
            return -1
        }else{
            return this.storage[++this.head];
        }
    }

    pop_back() {

        if(!this.size()){
            return -1
        }else{
            return this.storage[--this.tail];
        }
    }

    size() {
        return this.tail - this.head -1;
    }

    empty() {
        return this.size() ? 0 : 1;
    }

    front() {
        if(!this.size()){
            return -1
        }else{
            return this.storage[this.head + 1];
        }
    }

    back() {
        if(!this.size()){
            return -1
        }else{
            return this.storage[this.tail - 1];
        }
    }
}

let res = [];
result();

function result() {
    const deque = new Deque();

    for(let i = 0; i < N; i++){
        
        switch (input[i].split(' ')[0]) {
            case 'push_front':
                const pushFrontValue = parseInt(input[i].split(' ')[1]);
                deque.push_front(pushFrontValue);
                break;
    
            case 'push_back':
                const pushBackValue = parseInt(input[i].split(' ')[1]);
                deque.push_back(pushBackValue);
                break;
    
            case 'pop_front':
                res.push(deque.pop_front());
                break;
    
            case 'pop_back':
                res.push(deque.pop_back());
                break;
    
            case 'size':
                res.push(deque.size());
                break;
    
            case 'empty':
                res.push(deque.empty());
                break;
    
            case 'front':
                res.push(deque.front());
                break;
    
            case 'back':
                res.push(deque.back());
                break;
        }
    }
}

console.log(res.join('\n'));
