// const input = require("fs")
//   .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
//   .toString()
//   .trim()
//   .split("\n");

// // 문자열의 길이는 N
// let str = input.shift();

// // 입력할 명령어의 개수 M
// const M = input.shift();

// 커서의 초기값은 문장의 맨 뒤
// let cursor = str.length;

// str = [...str];

// for (let i = 0; i < M; i++) {
//   // 명령어가 L인경우
//   if (input[i][0] === "L") {
//     if (cursor > 0) cursor -= 1;
//   }
//   // 명령어가 D인경우
//   else if (input[i][0] === "D") {
//     if (cursor < str.length) {
//       cursor += 1;
//     }
//   }
//   // 명령어가 B인경우
//   // 커서 왼쪽에 있는 문자를 삭제
//   else if (input[i][0] === "B") {
//     if (cursor > 0) {
//       str.splice(cursor - 1, 1);
//       cursor -= 1;
//     }
//   }
//   // 명령어가 P $인경우
//   else if (input[i][0] === "P") {
//     str.splice(cursor, 0, input[i].split(" ")[1]);
//     cursor += 1;
//   }
// }

// console.log(str.join(""));

//////////////////// 위 코드는 연결리스트가 아닌 배열로 해결한 코드입니다.
// 아래는 스택을 이용하여 해결한 코드입니다.

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

// console.log(input);

let str = input.shift();
// console.log(str);
const M = input.shift();
// console.log(M);

let stack = [];
let arr = [];

for (let i = 0; i < str.length; i++) {
  stack.push(str[i]);
}

for (let i = 0; i < M; i++) {
  if (input[i][0] === "P") {
    stack.push(input[i][2]);
  }
  // 커서가 맨 앞이 아닌 경우, 맨 앞이면 무시
  else if (input[i][0] === "L" && stack.length > 0) {
    arr.push(stack.pop());
  }
  // 커서가 맨 뒤가 아닌 경우, 맨 뒤면 무시
  else if (input[i][0] === "D" && arr.length > 0) {
    stack.push(arr.pop());
    // 커서가 맨 앞이 아닌 경우, 맨 앞이면 무시
  } else if (input[i][0] === "B" && stack.length > 0) {
    stack.pop();
  }
}
arr.reverse();
// console.log(stack, arr);
console.log([...stack, ...arr].join(""));
