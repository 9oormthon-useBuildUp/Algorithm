const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs
  .readFileSync(filePath, 'utf8')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(''))
  .map((item, idx) =>
    idx ? item.map((char) => char.charCodeAt() - 64) : Number(item[0])
  );

const [_, ...graph] = input;

const dfs = (tree, location, path = [], paths = []) => {
  const [level, idx] = location;
  // tree의 배열 길이를 넘어가면 리턴
  if (level >= tree.length || idx >= tree[level].length) return;

  // 지나간 경로를 path에 저장
  path.push(tree[level][idx]);

  // 현재 노드가 리프노드라면 path
  if (!tree[level + 1]) paths.push([...path]);
  else {
    // 왼쪽 자식노드 방문
    dfs(tree, [level + 1, 2 * idx], [...path], paths);

    // 오른쪽 자식노드 방문
    dfs(tree, [level + 1, 2 * idx + 1], [...path], paths);
  }

  return paths;
};

const solution = () => {
  const sum_paths = dfs(graph, [0, 0]).map((arr) =>
    arr.reduce((prev, curr) => prev + curr, 0)
  );

  return { min: Math.min(...sum_paths), max: Math.max(...sum_paths) };
};
const answer = solution();
console.log([answer.min, answer.max].join('\n'));
