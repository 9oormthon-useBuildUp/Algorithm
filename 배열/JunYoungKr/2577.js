const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const inputs = [];
let inputCount = 0;

const arr = new Array(10).fill(0);

rl.on("line", (line) => {
  inputs.push(line);
  inputCount++;

  if (inputCount === 3) {
    // A, B, C 입력
    const A = inputs[0];
    const B = inputs[1];
    const C = inputs[2];

    // console.log(A * B * C);
    let result = A * B * C; // 계산 결과
    result = result.toString(); // 문자열로 변환

    // 문자열로 변환한 계산 결과를 배열화
    let newArray = [...result];
    // console.log(newArray);

    // 0으로 초기화한 10개짜리 배열에 newArray를 순회하며 +1을 해줌
    for (let i = 0; i < newArray.length; i++) {
      arr[newArray[i]]++;
    }

    // 출력 시 개행문자를 넣어 출력
    console.log(arr.join("\n"));
    rl.close();
  }
});
