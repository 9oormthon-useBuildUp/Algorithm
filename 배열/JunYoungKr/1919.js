const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

// console.log(input);
const str1 = new Array(26).fill(0);
const str2 = new Array(26).fill(0);

// 두 단어의 모든 알파벳 조회 + 각 배열에 저장
// 개인적인 팁 : 알파벳 관련 문제는 모조리 저장하는 식으로 하면 편한 것 같습니다.
// 효율적인지는 모르겠습니다. 알려주시면 감사하겠습니다...
for (let i = 0; i < input[0].length; i++) {
  str1[input[0][i].charCodeAt() - 97]++;
}

for (let i = 0; i < input[1].length; i++) {
  str2[input[1][i].charCodeAt() - 97]++;
}

// console.log(str1);
// console.log(str2);

let answer = 0;

// 조회된 횟수를 비교해 그 차이의 총 합만큼 출력
for (let i = 0; i < 26; i++) answer += Math.abs(str1[i] - str2[i]);

console.log(answer);
