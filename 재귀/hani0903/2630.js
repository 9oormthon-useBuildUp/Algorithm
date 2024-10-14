const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : 'Wiki\\input.txt';
const [N, ...paper] = fs.readFileSync(path).toString().trim().split('\n').map(row => row.split(' ').map(Number));


let answer = [0, 0]; //answer[0] : 0의 빈도수 / answer[1] : 1의 빈도수

const cutPaper = (rowStart, colStart, size) => {

    // 색종이 왼쪽 위 꼭짓점의 인덱스
    const first = paper[rowStart][colStart];
    let isSame = true;

    // 색종이 안에 있는 모든 숫자를 확인하며
    for(let r = rowStart; r < rowStart + size; r++ ){
        for(let c = colStart; c < colStart + size; c++) {
            // 하나라도 첫 번째 요소와 다른게 있다면, isSame은 false
            if(first !== paper[r][c]) {
                isSame = false;
                break;
            }
        }
        if(!isSame) {
            break;
        }
    }    

    if (isSame) { //모든 요소가 같다면? -> 종료 조건

        // 색종이 종류 확인 후 빈도수 증가 (-1인지, 0인지, 1인지)
        answer[first]++;
        return;
    } else {
        
        // 4개의 색종이를 만들어 cutPaper 다시 호출!
        size /= 2; //자르니까 가로,세로 모두 1/2 사이즈가 된다.
        for(let i = 0; i < 2; i++) {
            for(let j = 0; j < 2; j++) {
                cutPaper(rowStart + i * size , colStart + j * size, size);
            }
        }
    }
};

cutPaper(0, 0, N);
console.log(answer.join('\n'));