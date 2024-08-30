const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.on("line", (line) => {
  inputs.push(line);
  if (inputs.length === 2) {
    rl.close();
  }
});

//////////////////////////////////////////////////////
let inputs = [];
const makeObj = (str) => {
  const cntObj = [...str].reduce((acc, c) => {
    acc[c] = (acc[c] || 0) + 1;
    return acc;
  }, {});
  return cntObj;
};

rl.on("close", () => {
  const [str1, str2] = inputs;
  const str1Obj = makeObj(str1);
  const str2Obj = makeObj(str2);
  const al = [];
  let cnt = 0;
  for (const s1 in str1Obj) {
    for (const s2 in str2Obj) {
      if (s1 === s2 && !al.includes(s1)) {
        cnt += str1Obj[s1] < str2Obj[s2] ? str1Obj[s1] : str2Obj[s2];
        al.push(s1);
      }
    }
  }
  const difCnt = str1.length + str2.length - 2 * cnt;
  console.log(difCnt);
});
