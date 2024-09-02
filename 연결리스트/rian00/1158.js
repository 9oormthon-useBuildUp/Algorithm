const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, K] = input[0].split(" ").map((e) => +e);

let queue = new Array(N).fill().map((_, i) => i + 1);

let result = [];
while (queue.length > 0) {
  for (let i = 0; i < K - 1; i++) {
    queue.push(queue.shift());
  }
  result.push(queue.shift());
}

result = "<" + result.join(", ") + ">";
console.log(result);
