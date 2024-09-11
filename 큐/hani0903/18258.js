const fs = require('fs');
const { resourceUsage } = require('process');

const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');

class Node{
    constructor(item){
        this.item = item;
        this.next = null;
    }
}

class Queue {

    constructor(){
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    enqueue(item){
        const node = new Node(item);

        if(this.head === null){
            this.head = node;
        }else{
            this.tail.next = node;
        }

        this.tail = node;
        this.size++;
        
    }

    dequeue(){
        if(this.head === null) return -1;        
        const popItem = this.head;
        this.head = popItem.next;

        if (this.head === null) {
            this.tail = null;
        }

        this.size--;
        
        return popItem.item;
    }

    peek(){
        return this.size === 0 ? -1 : this.head.item;
    }

    back(){
        return this.size === 0 ? -1 : this.tail.item;
    }

    getSize(){
        return this.size;
    }

    isEmpty(){
        return this.size === 0 ? 1 : 0;
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