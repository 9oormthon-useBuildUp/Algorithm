const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : 'Wiki\\input.txt';
const input = fs.readFileSync(path).toString().trim().split('\n');

// input
const N = Number(input[0]);
const PAPER = [];
const cnt = { "-1": 0, "0": 0, "1": 0 };

// paper array
for (let i = 1; i <= N; i++){    
    PAPER.push(input[i].split(' '));
}

const cutPaper = (paper, size) => {

    // 탈출 조건
    const firstValue = paper[0][0];
    if (paper.every(row => row.every(v => v === firstValue))) {

        // 종이 종류 확인
        cnt[paper[0][0]]++;
        return;
    }

    size /= 3;

    // 9개로 조각 낼건데
    for (let paperNum = 0; paperNum < 9; paperNum++){
        const rowNum = Math.floor(paperNum / 3);
        const colNum = paperNum % 3;

        const newPaper = paper.slice(rowNum * size, rowNum * size + size).map(row => row.slice(colNum * size, colNum * size + size));
        cutPaper(newPaper, size)
    }
}

cutPaper(PAPER, N);
console.log(cnt[-1]);
console.log(cnt[0]);
console.log(cnt[1]);