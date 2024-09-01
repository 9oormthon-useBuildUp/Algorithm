const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');

function left() {
  if (cursor !== 0) cursor = pre[cursor];
}

function right() {
  if (nxt[cursor] !== -1) cursor = nxt[cursor];
}

function eraseLeft() {
  if (cursor === 0) {
    return;
  }

  nxt[pre[cursor]] = nxt[cursor];

  if (nxt[cursor] !== -1) {
    pre[nxt[cursor]] = pre[cursor];
  }
  cursor = pre[cursor];
}

function insertRight(dolor) {
  pre[unused] = cursor;
  nxt[unused] = nxt[cursor];
  nxt[cursor] = unused;

  if (nxt[cursor] !== -1) {
    //뒤에 노드가 없는 경우에는 pre[-1]이 되니까 이거 해주면 안됨
    pre[nxt[unused]] = unused;
  }

  dat[unused] = dolor;
  unused++;
  cursor = nxt[cursor];
}

//전체 출력
function showDLL() {
  let temp = nxt[0]; // 첫 번째 원소의 idx
  let result = '';

  while (temp !== -1) {
    result += dat[temp];
    temp = nxt[temp];
  }

  return result;
}

const N = input[0].length;
const str = input[0].split('');
const M = Number(input[1]);
var cursor = N; //초기 커서의 위치
var unused = N + 1; // 메모리 공간 포인터

var dat = Array(N + M).fill(0);
var pre = Array(N + M).fill(0);
var nxt = Array(N + M).fill(0);

//초기 데이터 저장
for (let i = 0; i < N; i++) {
  dat[i + 1] = str[i];
  nxt[i + 1] = i + 2;
  pre[i + 1] = i;
}
dat[0] = pre[0] = nxt[N] = -1;
nxt[0] = 1;

for (let i = 2; i < M + 2; i++) {
  let func = input[i].split(' ');

  if (func.length >= 2) {
    insertRight(func[1]);
  } else {
    switch (func[0]) {
      case 'L':
        left();
        break;
      case 'D':
        right();
        break;
      case 'B':
        eraseLeft();
        break;
    }
  }
}
console.log(showDLL());
