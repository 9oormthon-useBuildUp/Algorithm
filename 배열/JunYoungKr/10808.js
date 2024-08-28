const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 크기가 26인 배열을 0으로 초기화 (알파벳이 총 26개이기 때문에)
const alpha = new Array(26).fill(0);

rl.question("", (S) => {
  // 입력 받은 S를 한 글자 씩 잘라 배열에 넣는다.
  const oneByone = S.split("");
  //   console.log(oneByone);

  // 배열을 순회하며
  for (let i = 0; i < oneByone.length; i++) {
    // console.log(oneByone[i].charCodeAt() - 97);
    alpha[oneByone[i].charCodeAt() - 97]++;
  }

  // 공백을 두고 출력
  console.log(alpha.join(" "));

  rl.close();
});
