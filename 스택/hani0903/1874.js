const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath, 'UTF-8').trim().split('\n');

const n = Number(input[0]);
let stack = [];
let result = '';
let top = 1;

for (let i = 1; i <= n; i++) {
    const num = Number(input[i]);

    // top이 작은 경우 계속 숫자 넣기
    while (top <= num) {
        stack.push(top);
        result += '+\n';
        top++;
    }

    // top이 원하는 숫자이면 pop
    if (stack[stack.length - 1] === num) {
        stack.pop();
        result += '-\n';
    } else {
        console.log('NO');
        return;
    }
}

console.log(result.trim());
