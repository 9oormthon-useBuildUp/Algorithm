const fs = require('fs');

const filePath =
  process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath, 'utf8').split('');

const ASCII_START = 97;
const ASCII_END = 122;

const digit = Array.from({ length: ASCII_END - ASCII_START + 1 }).fill(0);
input
  .map((char) => char.charCodeAt(0) - ASCII_START)
  .forEach((code) => (digit[code] += 1));

console.log(digit.join(' '));
