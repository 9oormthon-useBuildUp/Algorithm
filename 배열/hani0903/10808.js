const fs = require('fs');

// 입력 데이터를 읽어오고 문자 단위로 나누기
const inputData = fs.readFileSync(0, 'utf8').toString().split('');

// 빈도 딕셔너리 생성
const alphabetDict = {};
for (let charCode = 'a'.charCodeAt(0); charCode <= 'z'.charCodeAt(0); charCode++) {
  const char = String.fromCharCode(charCode);
  alphabetDict[char] = 0;
}

// 알파벳 빈도 측정
for (const char of inputData) {
  if (alphabetDict[char] !== undefined) {
    alphabetDict[char]++;
  }
}

// 결과 문자열 생성
let result = '';
for (let charCode = 'a'.charCodeAt(0); charCode <= 'z'.charCodeAt(0); charCode++) {
  const char = String.fromCharCode(charCode);
  result += alphabetDict[char] + ' ';
}

console.log(result.trim());
