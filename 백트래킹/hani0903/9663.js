const fs = require('fs');
const N = +fs.readFileSync('/dev/stdin').toString().trim();

const isUsed = Array.from({length : 15}).fill(false);
const isD1Used = Array.from({length : 15}).fill(false);
const isD2Used = Array.from({length : 15}).fill(false);

let cnt = 0;

function NQueen(queenNum) {

    // N개의 queen을 다 놓은 경우
    if(queenNum === N) {
        cnt++;
        return;
    }

    // 이 때 row는 다 달라야 하므로, 각 퀸의 숫자에 따라 자동 설정
    // column 넘버 사용 유무만 isUsed로 확인한다.
    for(let i = 0; i < N; i++) {
        //D1이 양의 방향으로 | D2는 음의 방향으로
        if(!isUsed[i] && !isD1Used[queenNum + i] && !isD2Used[queenNum - i + N - 1]) {
            isUsed[i] = isD1Used[queenNum + i] = isD2Used[queenNum - i + N - 1] = true;
            NQueen(queenNum + 1);
            isUsed[i] = isD1Used[queenNum + i] = isD2Used[queenNum - i + N - 1] = false;
        }
    }
}

NQueen(0);
console.log(cnt);