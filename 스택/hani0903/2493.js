const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');

const N = Number(input[0]);
const towers = input[1].split(' ').map(Number);

let stack = [];
let result = [];

//왼 -> 오로 탐색
for(let i = 0; i < N; i++){
    
    let height = towers[i]; //현재 탑의 높이

    
    while(stack.length > 0){ //스택에 비교할 타워가 있는 경우
        
        //스택의 가장 위 타워의 높이가 현재 타워보다 크거나 같으면
        if(stack[stack.length - 1][1] >= height){
            result.push(stack[stack.length - 1][0] + 1);  //레이저가 막히니까 해당 타워의 번호를 결과에 추가
            break; //중단
        }

        //현재 타워가 더 크다면, 스택의 맨 위 건물 제거(어차피 현재 타워에 막혀서 레이저가 못감!)
        stack.pop();
    }

    //스택이 비어있는 경우 -> 레이저가 그냥 통과! -> 0
    if (stack.length === 0) {
        result.push(0);
    }

    //현재 타워를 스택에 추가
    stack.push([i, height]);
}
console.log(result.join(' '));