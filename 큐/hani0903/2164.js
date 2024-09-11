const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath, 'utf-8').trim();

class Queue {

    constructor(){
        this.items = [];
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
const N = Number(input);

for (let i = 1; i <= N; i++) {
    queue.enqueue(i);
}

while (queue.getSize() > 1) {
    queue.dequeue();

    const dequeue = queue.dequeue();
    if(dequeue !== -1){
        queue.enqueue(dequeue);
    }
}

console.log(queue.peek());