const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const [N, K] = fs.readFileSync(filePath, 'utf-8').trim().split(' ');

const nxt = Array.from({length: N}, (_, i) => i + 1);
const pre = Array.from({length: N}, (_, i) => i - 1);
const dat = Array.from({length: N}, (_, i) => i + 1);

nxt[N - 1] = 0;
pre[0] = N - 1;

let cursor = 0;
let result = Array.from({length: N}, (_, i) => 0);
let cnt = 0;

function eraseMan(){

    nxt[pre[cursor]] = nxt[cursor];

    if(nxt[cursor] !== -1){
        pre[nxt[cursor]] = pre[cursor];
    }

    let result = dat[cursor];
    cursor = nxt[cursor];

    return result;
}

while(cnt < N){
    for(let i = 0; i < K - 1; i++){
        cursor = nxt[cursor];
    }
    result[cnt] = eraseMan();
    cnt++;
}

console.log(`<${result.join(', ')}>`);