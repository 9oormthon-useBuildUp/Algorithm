const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');

let stack = Array.from({length: 100000});
let pos = 0;
let N = Number(input[0]);
let result = 0;

for(let i = 1; i <= N; i++){
    let num = input[i];

    if(num === '0'){
        result -= stack[pos - 1]
        pos--;

    }else{
        stack[pos] = Number(num);
        result += stack[pos];
        pos++;
    }
}

console.log(result);
