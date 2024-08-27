const getCountByGrade = (input) => {
  const rooms = Array.from({ length: 6 }, () => [0, 0]);

  input.forEach((person) => {
    const [S, Y] = person;
    rooms[Y - 1][S] += 1;
  });

  return rooms;
};

const Solution = (input, K) => {
  const rooms = getCountByGrade(input);
  let answer = 0;

  rooms.forEach((room) => {
    answer += Math.ceil(room[0] / K);
    answer += Math.ceil(room[1] / K);
  });

  console.log(answer);
};

const input = require('fs')
  .readFileSync(0)
  .toString()
  .trim()
  .split('\n')
  .map((v) => v.split(' ').map(Number));

const [_, K] = input.shift();

Solution(input, K);
