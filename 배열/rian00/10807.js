const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let inputLines = [];

rl.on("line", (line) => {
  inputLines.push(line);

  if (inputLines.length === 3) {
    rl.close();
  }
});

rl.on("close", () => {
  const t = +inputLines[0];
  const arr = inputLines[1].split(" ");
  const v = inputLines[2];

  let result = 0;
  for (let i = 0; i < t; i++) {
    if (arr[i] === v) {
      result++;
    }
  }

  console.log(result);
});
