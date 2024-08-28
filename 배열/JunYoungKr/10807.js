const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const inputs = [];
let count = 0;
let answer = 0;

rl.on("line", (line) => {
  inputs.push(line);
  count++;

  if (count === 3) {
    //  N 입력
    const N = parseInt(inputs[0]);
    // console.log(N);
    // 두 번째 줄 입력
    const arr = inputs[1].split(" ");
    // console.log(arr);
    // v 입력
    const v = parseInt(inputs[2]);
    // console.log(v);

    for (let i = 0; i < arr.length; i++) {
      //   console.log(arr[i]);
      if (arr[i] == v) answer++;
    }

    console.log(answer);
    rl.close();
  }
});

// 11
// 1 4 1 2 4 2 4 2 3 4 4
// 2
// 3
