const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

let T = +input[0];

for (let i = 0; i < T; i++) {
  let strlist = [];
  let after = [];
  for (const s of input[i + 1]) {
    if (s === "<") {
      if (strlist.length > 0) {
        after.push(strlist.pop());
      }
    } else if (s === ">") {
      if (after.length > 0) {
        strlist.push(after.pop());
      }
    } else if (s === "-") {
      if (strlist.length > 0) strlist.pop();
    } else {
      strlist.push(s);
    }
  }
  after.reverse();
  const result = [...strlist, ...after].join("");
  console.log(result);
}
