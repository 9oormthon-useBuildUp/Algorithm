const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let al = {};

for (let i = "a".charCodeAt(0); i <= "z".charCodeAt(0); i++) {
  const char = String.fromCharCode(i);
  al[char] = 0;
}
rl.on("line", (line) => {
  inputLines.push(line);

  if (inputLines.length === 1) {
    rl.close();
  }
});

rl.on("close", () => {
  const str = inputLines[0].split("");
  for (const s of str) {
    al[s] += 1;
  }
  const result = Object.values(al).join(" ");
  console.log(result);
});
