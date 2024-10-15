const fs = require('fs');
const [N, M] = fs.readFileSync('/dev/stdin').toString().split(' ').map(Number);

let arr = Array(10).fill(0);
let isUsed = Array(10).fill(false);

function backTracking(k) {

    // base line : arr가 모두 채워진 경우(k가 arr의 인덱스 범위를 넘어간 경우)
    if(k === M) {
        console.log(arr.slice(0, M).join(' '));
        return;
    }
    
    for(let i = 1; i <= N; i ++) {

        if(!isUsed[i]) {
            
            arr[k] = i;
            isUsed[i] = true;
            backTracking(k + 1);
            isUsed[i] = false;
        }
    }
}
backTracking(0);

