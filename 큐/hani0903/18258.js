const fs = require('fs');
const { resourceUsage } = require('process');

const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');

class Queue {

    constructor(){
        this.items = {};
        this.head = 0;
        this.tail = 0;
    }

    enqueue(item){
        this.items[this.tail++]=item;
    }

    dequeue(){

        if(this.head === this.tail) return -1;
        const res = this.items[this.head];
        delete this.items[this.head];
        this.head++;
        return res;
    }

    peek(){
        return this.head === this.tail ? -1 : this.items[this.head];
    }

    back(){
        return this.head === this.tail ? -1 : this.items[this.tail - 1];
    }

    getSize(){
        return this.tail - this.head;
    }

    isEmpty(){
        return this.head === this.tail ? 1 : 0;
    }
}

const queue = new Queue();
const N = parseInt(input[0]);
const output = [];

for(let i = 1; i <= N; i++){
    line = input[i].split(' ');

    switch(line[0]){
        case 'push':
            queue.enqueue(line[1]);
            break;
        case 'front':
            output.push(queue.peek());
            break;
        case 'back':
            output.push(queue.back());
            break;
        case 'size':
            output.push(queue.getSize());
            break;
        case 'empty':
            output.push(queue.isEmpty());
            break;
        case 'pop':
            output.push(queue.dequeue());
            break;
    }
}

console.log(output.join('\n'));