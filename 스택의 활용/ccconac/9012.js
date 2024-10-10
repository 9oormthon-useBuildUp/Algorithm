const solution = (input) => {
  const answer = [];

  input.forEach((PS) => {
    let count = 0;

    for (let i = 0; i < PS.length; i++) {
      count += PS[i] === '(' ? 1 : -1;

      if (count < 0) break;
    }

    answer.push(count ? 'NO' : 'YES');
  });

  return answer;
};

const input = require('fs').readFileSync(0).toString().trim().split('\n');
input.shift();

const answer = solution(input).join('\n');

console.log(answer);
