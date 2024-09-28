const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath, 'utf8').toString().trim().split('\n');

const bfs = (arr, visited) => {
  let teamMemberCount = 0;

  for (let i = 0; i < arr.length; i++) {
    if (visited[i]) continue;
    let current = i;
    let team = [];

    // 팀을 이루는지 확인
    while (!visited[current]) {
      visited[current] = 1;
      team.push(current);
      current = arr[current] - 1; // 선택된 학생으로 이동
    }

    // 사이클이 형성되었을 때만 팀원으로 처리
    if (team.includes(current)) {
      // team.indexOf(current) => current 값인 학생 3(2번 인덱스)이 처음 싸이클에 나타난 위치
      teamMemberCount += team.length - team.indexOf(current);
    }
  }

  return teamMemberCount;
};

const solution = (T, cases) => {
  const answer = [];
  for (let i = 0; i < T; i++) {
    const [n, arr] = cases
      .slice(i * 2, i * 2 + 2)
      .map((item) => item.split(' ').map(Number));

    let visited = Array(n[0]).fill(0);

    answer.push(n[0] - bfs(arr, visited));
  }

  return answer;
};

const [T, ...cases] = input;
const answer = solution(Number(T), cases).join('\n');
console.log(answer);

console.log([1, 2, 3].indexOf(3));
