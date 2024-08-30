const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const array = new Array(10).fill(0);
const str = input[0].split("");
for (const s of str) {
  array[s] += 1;
}

while (!(Math.abs(array[6] - array[9]) <= 1)) {
  if (array[9] > array[6]) {
    array[9]--;
    array[6]++;
  } else if (array[9] < array[6]) {
    array[9]++;
    array[6]--;
  }
}

console.log(array.reduce((acc, e) => (acc > e ? acc : e), -1));
