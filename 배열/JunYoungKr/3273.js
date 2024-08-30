const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .split("\n");

const n = Number(input.shift());
const arr = input[0]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);
const x = Number(input[1]);

// 12, 1
// 10, 3
// 2, 11

// console.log(arr);

let count = 0;
let i = 0;
let j = n - 1;

while (i < j) {
  const sum = arr[i] + arr[j];
  //   console.log("arr[i], arr[j], sum: ", arr[i], arr[j], sum);
  if (sum === x) {
    count++;
    i++;
    j--;
  } else if (sum < x) i++;
  else j--;
  //   console.log("arr[i], arr[j], sum: ", arr[i], arr[j], sum);
}

console.log(count);

// 처음에 시간초과가 나서 Set으로 시도하다가 그래도 안돼서 포기했습니다...
// 이후 구현에 집중하여 풀긴 했는데 더 효율적인 코드가 있을까 하고 gpt를 돌려봤는데 투 포인터 알고리즘이라고 하더라구요
// 혹시 모르는 분들이 계신다면 참고하시라구 메모 남깁니다.
