const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let inputs = [];

rl.on("line", (line) => {
  inputs.push(line);
  const num = Number(inputs[0]) + 1;
  if (inputs.length === num) {
    rl.close();
  }
});

rl.on("close", () => {
  const N = +inputs[0];
  for (let i = 1; i < N + 1; i++) {
    const [str1, str2] = inputs[i].split(" ").map((str) => [...str].sort());
    const result =
      str1.length === str1.map((e, i) => e === str2[i]).filter((e) => e).length;
    console.log(result ? "Possible" : "Impossible");
  }
});
