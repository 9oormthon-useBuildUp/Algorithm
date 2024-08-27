const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const inputs = [];

// 입력을 받아서 처리하는 부분
rl.on("line", (line) => {
  inputs.push(line);
  // 첫 줄에 입력된 학생 수(N)만큼 입력을 받으면 종료
  if (inputs.length - 1 === Number(inputs[0].split(" ")[0])) {
    rl.close(); // N번째 입력 후 종료
  }
});

// 모든 입력이 완료된 후 처리하는 부분
rl.on("close", () => {
  // 첫 줄에서 학생 수(N)와 한 방에 배정할 수 있는 최대 인원 수(K)를 가져옴
  let [N, K] = inputs[0].split(" ").map(Number);

  // 성별과 학년별 학생 수를 저장할 배열을 생성
  // students[0][...]은 여학생의 학년별 인원수, students[1][...]은 남학생의 학년별 인원수
  const students = Array.from(Array(2), () => Array(6).fill(0));

  // 성별과 학년 정보를 담을 배열
  const gradegender = [];

  // 두 번째 줄부터 학생들의 성별(S)과 학년(Y)을 받아서 처리
  for (let i = 1; i <= N; i++) {
    let [S, Y] = inputs[i].split(" ").map(Number);
    gradegender.push({ gender: S, grade: Y }); // 성별과 학년 정보를 객체로 저장
  }

  // 성별과 학년별로 학생 수를 카운트하여 students 배열에 저장
  for (let i = 0; i < gradegender.length; i++) {
    const { grade, gender } = gradegender[i];
    students[gender][grade - 1]++; // 학년이 1부터 시작하므로 인덱스로 접근할 때 1을 뺌
  }

  let rooms = 0; // 필요한 방의 수

  // 성별과 학년별로 필요한 방의 수를 계산
  for (let i = 0; i < students.length; i++) {
    // 성별 루프
    for (let j = 0; j < students[i].length; j++) {
      // 학년 루프
      if (students[i][j] % K == 0) {
        // 만약 학생 수가 K로 나누어 떨어지면 정확히 (학생 수 / K) 만큼의 방이 필요
        rooms += students[i][j] / K;
      } else {
        // 학생 수가 K로 나누어 떨어지지 않으면 나머지 학생들을 위한 추가 방이 필요
        rooms += Math.floor(students[i][j] / K); // K로 나눈 몫 만큼의 방
        rooms += 1; // 나머지 학생들을 위한 추가 방
      }
    }
  }

  console.log(rooms); // 최종적으로 필요한 방의 수를 출력
});

// 제 코드를 기반으로 GPT가 간략해 준 코드입니다.
// 차이점을 살펴보자면 학생들의 성별과 학년을 입력받는 동시에 students 배열에 넣어줍니다.
// 저의 경우는 gradegender에 입력을 받은 후 다시 const {grade, gender}로 나누어 students 배열에 넣는 비효율적인 방식을 구현했습니다.

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const inputs = [];

rl.on("line", (line) => {
  inputs.push(line);
  if (inputs.length - 1 === Number(inputs[0].split(" ")[0])) {
    rl.close(); // 모든 학생의 정보가 입력되면 입력 종료
  }
});

rl.on("close", () => {
  let [N, K] = inputs[0].split(" ").map(Number);
  const students = Array.from(Array(2), () => Array(6).fill(0)); // 성별과 학년별로 학생 수를 저장할 배열

  // 각 학생의 성별과 학년에 따라 학생 수를 배열에 저장
  for (let i = 1; i <= N; i++) {
    let [S, Y] = inputs[i].split(" ").map(Number);
    students[S][Y - 1]++; // 성별과 학년에 따른 학생 수 증가
  }

  let rooms = 0;

  // 방의 수 계산
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 6; j++) {
      rooms += Math.ceil(students[i][j] / K); // 필요한 방의 수 계산 (올림 처리)
    }
  }

  console.log(rooms); // 총 필요한 방의 수 출력
});
