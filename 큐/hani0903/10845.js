const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');

const N = Number(input[0]);

var queue = [];
var head = rear = 1;

function push(data) {
    queue[rear++] = data;
}

function pop() {

    return empty() ? -1 : queue[head++];
}

function size() {
    return rear - head;
}

function empty() {
    return size() > 0 ? false : true;
}

function front() {
    return empty() ? -1 : queue[head];
}

function back() {
    return empty() ? -1 : queue[rear - 1];
}

for(let i = 1; i <= N; i++){
    line = input[i].split(' ');

    switch(line[0]){
        case 'push':
            push(line[1]);
            break;
        case 'front':
            console.log(front());
            break;
        case 'back':
            console.log(back());
            break;
        case 'size':
            console.log(Number(size()));
            break;
        case 'empty':
            console.log(Number(empty()));
            break;
        case 'pop':
            console.log(pop());
            break;
    }
}