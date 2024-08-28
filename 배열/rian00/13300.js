const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let inputs = [];

rl.on("line", (line) => {
  inputs.push(line);
  const len = Number(inputs[0].split(" ")[0]) + 1;
  if (inputs.length === len) {
    rl.close();
  }
});
const data = Array(2)
  .fill()
  .map(() => Array(6).fill(0));

rl.on("close", () => {
  const [N, K] = inputs[0].split(" ");
  const info = [];
  let cnt = 0;

  for (let i = 0; i < N; i++) {
    info.push(inputs[i + 1].split(" "));
  }

  info.forEach(([x, y]) => {
    data[x][y - 1]++;
  });

  data.forEach((row) => {
    row.forEach((value) => {
      if (value !== 0) {
        cnt += Math.ceil(value / K);
      }
    });
  });

  console.log(cnt);
});
