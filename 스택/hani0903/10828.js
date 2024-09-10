const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');

let stack = Array.from({length: 10000});
let pos = 0;
let N = Number(input[0]);

function push(data){
    stack[pos]= data;
    pos++;
}

function pop(){
    if (pos === 0)
        console.log(-1);
    else{
        console.log(stack[pos - 1]);
        pos--;
    }
}

function size(){
    console.log(pos);
}

function empty(){
    console.log(pos === 0 ? 1 : 0);
}

function top(){
    if (pos === 0)
        console.log(-1);
    else console.log(stack[pos - 1]);
}

for(let i  = 1; i <= N; i++){
    let line = input[i].split(' ');

    switch(line[0]){
        case 'push': push(line[1]); break;
        case 'top' : top(); break;
        case 'size' : size(); break;
        case 'empty' : empty(); break;
        case 'pop' : pop(); break;
    }
}