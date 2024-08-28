const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const inputs = [];
let inputLines = 0;

rl.on("line", (line) => {
  inputs.push(line);
  inputLines++;

  if (inputLines === 2) {
    const string1 = inputs[0];
    const string2 = inputs[1];

    const commonSubstrings = findCommonSubstrings(string1, string2);
    console.log(commonSubstrings);

    console.log(string1, string2);
    rl.close();
  }
});
