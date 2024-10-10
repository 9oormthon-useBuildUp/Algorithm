const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const num = input.shift().split(" ");

const N = num[0];
const M = num[1];

let list = input[0].split(" ");

// 1~N까지 배열
let arr = [];
for (let i = 1; i <= N; i++) arr.push(i);

// 1번 연산 - shift
function cal1() {
  arr.shift();
}
// 2번 연산
function cal2() {
  arr.push(arr.shift());
}
// 3번 연산
function cal3() {
  arr.unshift(arr.pop());
}

let count = 0;

// 뽑아내려는 원소의 위치를 순차적으로 처리
for (let i = 0; i < Number(list.length); i++) {
  let target = Number(list[i]);

  // 첫 번째 요소와 같다면 바로 빼줌 (shift)
  if (target === arr[0]) cal1();
  else {
    let idx = arr.indexOf(target); // 목표 원소의 현재 배열에서의 위치
    let middle = arr.length / 2; // 배열의 중간 인덱스 계산

    // 목표 위치가 중간보다 앞에 있다면 왼쪽으로 이동
    if (idx < middle) {
      for (let j = 0; j < idx; j++) {
        cal2(); // 왼쪽으로 이동
        count++; // 이동 횟수 증가
      }
    }
    // 목표 위치가 중간보다 뒤에 있다면 오른쪽으로 이동
    else {
      for (let j = 0; j < arr.length - idx; j++) {
        cal3(); // 오른쪽으로 이동
        count++; // 이동 횟수 증가
      }
    }
    cal1(); // 목표 원소를 첫 번째 위치로 이동시킨 후 제거
  }
}

console.log(count);
