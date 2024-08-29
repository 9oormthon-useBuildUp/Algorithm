const countPlasticNumber = (array) => {
  const numberCount = {};

  array.forEach((number) => {
    if (number === 6 || number === 9) numberCount[9] = (numberCount[9] || 0) + 1;
    else numberCount[number] = (numberCount[number] || 0) + 1;
  });

  return numberCount;
};

const divideNine = (array) => {
  const numberCount = countPlasticNumber(array);

  if (Object.keys(numberCount).includes('9')) numberCount[9] = Math.round(numberCount[9] / 2);

  return numberCount;
};

const Solution = (array) => {
  const numberCount = divideNine(array);
  const answer = Math.max(...Object.values(numberCount));

  return answer;
};

const input = require('fs').readFileSync(0).toString().trim().split('').map(Number);

console.log(Solution(input));
