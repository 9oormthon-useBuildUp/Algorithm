// node.js의 file system 모듈을 불러온다.
const fs = require('fs');
const file = process.platform === 'linux' ? 'dev/stdin' : './text.txt';
const input = fs.readFileSync(file).toString().trim().split('\n');

const N = parseInt(input[0]);
const numbers = input[1].split(' ');
const v = input[2];

numbers.sort();

let count = numbers.filter(value => value === v).length;

console.log(count);
