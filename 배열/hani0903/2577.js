const fs = require('fs');

const filePath = process.platform === 'linux' ? 'dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath, 'utf-8').split('\n').map(Number);

const freq = Array.from({ length: 10 }).fill(0);

let result = input[0] * input[1] * input[2];

result = result.toString();

for (const c of result) {
  freq[Number(c)]++;
}

console.log(freq.join('\n'));
