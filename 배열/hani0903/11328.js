const fs = require('fs');
const filePath = process.platform === 'linux' ? 'dev/stdin' : '../../input';
const input = fs.readFileSync(filePath, 'utf-8').split('\n');

for (let i = 1; i <= input[0]; i++) {
  let [word1, word2] = input[i].split(' ');

  //정렬 후 같은지 비교
  if (word1.split('').sort().join('') === word2.split('').sort().join('')) {
    console.log('Possible');
  } else {
    console.log('Impossible');
  }
}
