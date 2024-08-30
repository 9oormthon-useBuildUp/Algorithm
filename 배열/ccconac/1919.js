const getCharCount = (obj, array, operator) => {
  operator === '+'
    ? array.split('').forEach((char) => (obj[char] = (obj[char] || 0) + 1))
    : array.split('').forEach((char) => (obj[char] = (obj[char] || 0) - 1));
};

const Solution = (firstStr, secondStr) => {
  const charCount = {};

  getCharCount(charCount, firstStr, '+');
  getCharCount(charCount, secondStr, '-');

  let answer = 0;
  const keys = Object.keys(charCount);

  keys.forEach((key) => (answer += Math.abs(charCount[key])));

  return answer;
};

const input = require('fs').readFileSync('text.txt').toString().trim().split('\n');
const [firstStr, secondStr] = input;

console.log(Solution(firstStr, secondStr));
