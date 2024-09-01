const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');

var TC = Number(input[0]);
//var TC = Number(1);
var nxt, pre, dat, cursor, unused;

function init(length) {
  nxt = Array(length + 1).fill(0);
  pre = Array(length + 1).fill(0);
  dat = Array(length + 1).fill(0);

  cursor = 0;
  unused = 1;

  pre[0] = -1;
  nxt[0] = -1;
}

function insert(data) {
  pre[unused] = cursor;
  nxt[unused] = nxt[cursor];
  nxt[cursor] = unused;

  if (nxt[cursor] !== -1) {
    pre[nxt[unused]] = unused;
  }

  dat[unused] = data;
  unused++;
  cursor = nxt[cursor];
}

function left() {
  if (cursor !== 0) {
    cursor = pre[cursor];
  }
}

function right() {
  if (nxt[cursor] !== -1) {
    cursor = nxt[cursor];
  }
}

function deleteFromDLL() {
  if (cursor === 0) {
    return;
  }

  if (nxt[cursor] === -1) {
    nxt[pre[cursor]] = nxt[cursor];
  } else {
    nxt[pre[cursor]] = nxt[cursor];
    pre[nxt[cursor]] = pre[cursor];
  }

  cursor = pre[cursor];
}

function printDLL() {
  let temp = nxt[0];
  let result = '';

  while (temp !== -1) {
    result += dat[temp];
    temp = nxt[temp];
  }

  return result;
}

//테스트 케이스만큼 반복
for (let i = 0; i < TC; i++) {
  var L = input[i + 1].split('');
  //console.log(L);
  init(L.length);

  //하나의 단어씩 읽기
  for (let c = 0; c < L.length; c++) {
    switch (L[c]) {
      case '<':
        left();
        break;
      case '>':
        right();
        break;
      case '-':
        deleteFromDLL();
        break;
      default:
        insert(L[c]);
    }
  }

  console.log(printDLL());
}
