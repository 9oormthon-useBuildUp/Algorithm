const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

for (let i = 1; i <= input[0]; i++) {
  let [str1, str2] = input[i].split(" ");

  if (str1.split("").sort().join("") === str2.split("").sort().join(""))
    console.log("Possible");
  else console.log("Impossible");
}
