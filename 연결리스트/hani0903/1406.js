const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');

function left() {
  if (cursor === 0) {
    //맨 앞 요소인 경우
    return;
  } else {
    cursor = pre[cursor];
  }
}

function right() {
  if (nxt[cursor] === -1) {
    //커서가 맨 마지막 위치를 가리키는 경우
    return;
  }

  //다음 원소의 인덱스를 리턴한다.
  cursor = nxt[cursor];
}

function eraseLeft() {
  // 맨 첫 번째 요소이면 건너 뛰어!
  if (cursor === 0) {
    return;
  }

  //head 요소를 삭제하는 경우
  if (pre[cursor] === 0) {
    //head 하나인 경우
    if (nxt[cursor] === -1) {
      //nxt[0] === -1로 변경
      nxt[0] = -1;
      cursor = 0;
    } else {
      nxt[0] = nxt[cursor]; //head -> 첫 번째 노드 연결
      pre[nxt[cursor]] = 0; //head <- 첫 번째 노드 연결
      cursor = 0;
    }
    return;
  }

  //맨 끝 요소를 삭제하는 경우
  if (nxt[cursor] === -1) {
    nxt[pre[cursor]] = -1; //이전 노드 -> -1을 가리키게 한다 (끝임을 알려줌)
    cursor = pre[cursor];
    return;
  }

  //중간 요소 삭제하는 경우
  nxt[pre[cursor]] = nxt[cursor]; // 이전 노드 -> 다음 노드 연결
  pre[nxt[cursor]] = pre[cursor]; // 이전 노드 <- 다음 노드 연결

  // //연결 끊기
  // nxt[cursor] = -1;
  // pre[cursor] = -1;

  cursor = pre[cursor];

  return;
}

//저장할 때에도 세 가지 상황 고려하기!
// 1. 맨 앞 노드에 추가하는 경우 2. 중간에 추가하는 경우 3. 맨 끝에 추가하는 경우
function insertRight(dolor) {
  //head 인 경우
  if (cursor === 0) {
    if (nxt[0] === -1) {
      //빈 배열인 경우
      nxt[unused] = -1;
      dat[unused] = dolor;
      pre[unused] = 0;

      nxt[0] = unused;
    } else {
      // head <- (추가하는 노드) -> (첫번째 였던 노드) 팔 연결해주기
      pre[unused] = 0;
      nxt[unused] = nxt[0];
      dat[unused] = dolor;
      pre[nxt[unused]] = unused;
      nxt[0] = unused;
    }
  } else if (nxt[cursor] === -1) {
    //tail인 경우
    nxt[cursor] = unused;
    pre[unused] = cursor;
    nxt[unused] = -1;

    dat[unused] = dolor;
  } else {
    //중간인 경우 앞 노드 <- 추가하는 노드 -> 뒷노드 연결
    nxt[unused] = nxt[cursor];
    pre[unused] = cursor;

    //앞 노드 -> 추가하는 노드 <- 뒷노드 연결
    nxt[cursor] = unused;
    pre[nxt[unused]] = unused;
    dat[unused] = dolor;
  }

  // 사용 가능 공간 idx 1증가
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

// 야매 배열 생성
var dat = Array(N + M).fill(0);
var pre = Array(N + M).fill(0);
var nxt = Array(N + M).fill(0);

//초기 데이터 저장
for (let i = 0; i < N; i++) {
  dat[i + 1] = str[i];
  nxt[i + 1] = i + 2;
  pre[i + 1] = i;
}

dat[0] = -1;
pre[0] = -1;
nxt[0] = 1;
nxt[N] = -1;

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
