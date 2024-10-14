const fs = require('fs');
const [n, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +n;
const image = arr.map(v => v.split('').map(v=>+v));

let answer = '';

const quadTree = (r, c, size) => {

    let isSame = true;
    let first = image[r][c];

    // 모든 요소가 다 같은지 확인
    for(let i = r; i < r + size; i++) {
        for(let j = c; j < c + size; j++){
            if(first !== image[i][j]){
                isSame = false;
                break;
            }
        }
    }

    if(isSame) {
        answer += first;
        return;

    } else{

        answer += '(';
        size /= 2;
        quadTree(r, c, size);
        quadTree(r, c + size, size);
        quadTree(r + size, c, size);
        quadTree(r + size, c + size, size);
        answer += ')';
    }
};

quadTree(0, 0, N);
console.log(answer);