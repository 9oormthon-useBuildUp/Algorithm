const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const inputs = [];

rl.on("line", (line) => {
  inputs.push(line);
  if (inputs.length - 1 === Number(inputs[0].split(" ")[0])) {
    rl.close(); // N번째 입력 후 종료
  }
});
rl.on("close", () => {
  let [N, K] = inputs[0].split(" ").map(Number);
  // console.log(N, K);
  const students = Array.from(Array(2), () => Array(6).fill(0));
  for (let i = 1; i <= N; i++) {
    // 성별과, 학년 입력 (0: 여학생, 1: 남학생)
    let [S, Y] = inputs[i].split(" ").map(Number);
    students.push({ gender: S, grade: Y });
    // console.log(S, Y);
  }

  for (let i = 0; i <= N; i++) {
    console.log(students[i][0]);
  }
  // console.log(students);
});

// 16 2

// 1 1 남자 1학년
// 0 1 여자 1학년
// 1 1 남자 1학년
// 0 2 여자 2학년
// 1 2 남자 2학년
// 0 2 여자 2학년
// 0 3 여자 3학년
// 1 3 남자 3학년
// 1 4 여자 4학년
// 1 3 남자 3학년
// 1 3 남자 3학년
// 0 6 여자 6학년
// 1 5 남자 5학년
// 0 5 여자 5학년
// 1 5 남자 5학년
// 1 6 남자 6학년
