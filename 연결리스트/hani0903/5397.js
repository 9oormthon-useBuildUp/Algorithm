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
  //head
  if (cursor === 0) {
    if (nxt[0] === -1) {
      //빈 배열인 경우

      nxt[unused] = -1;
      pre[unused] = 0;

      nxt[0] = unused;
    } else {
      // 뒤에 노드가 있는 경우

      pre[unused] = 0;
      nxt[unused] = nxt[0];

      nxt[0] = unused;
      pre[nxt[unused]] = unused;
    }
  } else if (nxt[cursor] === -1) {
    //tail

    nxt[cursor] = unused;
    pre[unused] = cursor;

    nxt[unused] = -1;
  } else {
    pre[unused] = cursor;
    nxt[unused] = nxt[cursor];

    nxt[cursor] = unused;
    pre[nxt[unused]] = unused;
  }

  dat[unused] = data;
  unused++;
  cursor = nxt[cursor];
  //console.log(printDLL());
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
  //empty
  if (cursor === 0) {
    return;
  } else if (pre[cursor] === 0) {
    //head

    if (nxt[cursor] === -1) {
      // no other nodes
      nxt[0] = -1;
    } else {
      nxt[0] = nxt[cursor];
      pre[nxt[cursor]] = 0;
    }
  } else if (nxt[cursor] === -1) {
    // tail

    nxt[pre[cursor]] = -1;
  } else {
    //middle

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
