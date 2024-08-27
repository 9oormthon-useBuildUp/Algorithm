const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let inputLines = [];
let num = Array(10).fill(0);

rl.on("line", (line) => {
  inputLines.push(line);
  if (inputLines.length === 3) {
    rl.close();
  }
});

rl.on("close", () => {
  const A = inputLines[0];
  const B = inputLines[1];
  const C = inputLines[2];

  const total = A * B * C + "";

  for (const t of total) {
    num[+t] += 1;
  }
  for (const n of num) {
    console.log(n);
  }
});
