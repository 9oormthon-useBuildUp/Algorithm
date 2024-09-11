const { sep } = require("path");

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map((e) => +e);
const arr = input[1].split(" ").map((e) => +e);

//인덱스 초기화
let size = N;
let indexs = Array.from({ length: N }).reduce((acc, _, i) => {
  acc[i + 1] = i;
  return acc;
}, {});

//회전 함수 (인덱스만 변경)
function rotate(d, index) {
  const newIndex = {};
  for (const k in index) {
    if (index[k] + d > size) {
      newIndex[k] = (index[k] + d) % size;
    } else if (index[k] + d < 0) {
      newIndex[k] = index[k] + d + size;
    } else newIndex[k] = index[k] + d;
  }
  return newIndex;
}

let total = 0;
for (const a of arr) {
  let dis = size - indexs[a] > indexs[a] ? -indexs[a] : size - indexs[a];

  if (indexs[a] === 0) {
    delete indexs[a];
    indexs = rotate(-1, indexs);
    size--;
  } else {
    indexs = rotate(dis, indexs);
    //왼쪽으로 이동일 경우 dis<0 이므로 양수로 변환
    if (dis < 0) dis *= -1;
    total += dis;
    //맨 앞으로 돌린 후 삭제
    delete indexs[a];
    indexs = rotate(-1, indexs);
    size--;
  }
}

console.log(total);
