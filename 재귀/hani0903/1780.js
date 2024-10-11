const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : 'Wiki\\input.txt';
const [N, ...paper] = fs.readFileSync(path).toString().trim().split('\n').map(row => row.split(' ').map(Number));


let answer = [0, 0, 0];

const cutPaper = (rStart, cStart, size) => {

    const first = paper[rStart][cStart];
    const same = paper.slice(rStart, rStart + size).map(row => row.slice(cStart, cStart + size)).every(row => row.every(v => v === first));

    if (same) {

        // 종이 종류 확인
        answer[first + 1]++;
        return;
    } else {
        
        // 9개로 조각 낼건데
        size /= 3;
        for (let i = 0; i < 9; i++){
            const rowNum = Math.floor(i / 3);
            const colNum = i % 3;

            cutPaper(rStart + rowNum * size, cStart + colNum * size, size)
        }
    }
};

cutPaper(0, 0, N);
console.log(answer.join('\n'));