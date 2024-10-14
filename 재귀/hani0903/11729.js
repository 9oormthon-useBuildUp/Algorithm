const fs = require('fs');
const N = +fs.readFileSync('/dev/stdin').toString().trim();

let cnt = 0;
let answer =[];

// 어디서 어디로, 높이가 얼마나 되는 탑을 이동시킬건지!
function hanoiTop(from, to, height) {

    //탑의 높이가 1이라면, 맨 아래 원판만 있으므로 바로 옮겨주면 된다.
    if(height === 1) {
        answer.push(`${from} ${to}`);
        cnt++;
        return;
    }

    //탑의 높이가 2 이상인 n이라면, 맨 아래 원판 위에 있는 탑 (1~n-1)을 우선 옮겨야 한다.
    //어디로 옮겨야 하냐, from과 to가 아닌 다른 판으로 이동시켜야 한다.
    const temp = 6 -  from - to;
    hanoiTop(from, temp, height - 1);
    
    //위에 쌓인 탑을 다 치웠으면, 맨 아래 위치한 원판을 원하는 곳으로 이동시킬 수 있다.
    hanoiTop(from, to, 1);

    //console.log('탑을 가져온다');
    hanoiTop(temp, to, height - 1);
}

hanoiTop(1, 3, N);

console.log(cnt + '\n' +answer.join('\n'));