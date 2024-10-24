const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split(' ');
let N = +input[0];
let targetRow = +input[1];
let targetCol = +input[2];

function visitZ(r, c, size, num) {

    if(r === targetRow && c === targetCol) return num;

    size /= 2;

    //사분면 계산
    let quadrant = 0;
    if(r + size <= targetRow) quadrant += 2;
    if(c + size <= targetCol) quadrant += 1;

    num += size * size * quadrant;

    switch(quadrant) {
        case 0:
            return visitZ(r, c, size, num);
        case 1:
            return visitZ(r, c + size, size, num);
        case 2:
            return visitZ(r + size, c, size, num);
        case 3: 
            return visitZ(r + size, c + size, size, num);
    }
}

console.log(visitZ(0, 0, 2 ** N, 0));