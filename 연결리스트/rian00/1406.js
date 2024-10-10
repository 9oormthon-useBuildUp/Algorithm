const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

let [str, num, ...info] = [input[0].split(""), +input[1], ...input.slice(2)];

let strlist = [...str];
let after = [];
for (let i = 0; i < num; i++) {
  const met = info[i][0];
  const insertText = met === "P" ? info[i].split(" ")[1] + "" : null;

  switch (met) {
    case "L":
      if (strlist.length > 0) {
        const d = strlist.pop();
        after.push(d);
      }
      break;
    case "D":
      if (after.length > 0) {
        const d = after.pop();
        strlist.push(d);
      }
      break;
    case "B":
      if (strlist.length > 0) {
        strlist.pop();
      }
      break;
    case "P":
      strlist.push(insertText);
      break;
  }
}

after.reverse();
const result = [...strlist, ...after].join("");
console.log(result);
