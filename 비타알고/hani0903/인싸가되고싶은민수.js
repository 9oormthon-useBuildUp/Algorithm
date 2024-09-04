const fs = require('fs');
const filePath = process.platform === 'linux' ? 'dev/stdin' : '../../input.txt';
const [a, b] = fs.readFileSync(filePath, 'UTF-8').trim().split(' ').map(Number());

function solution(){

    if(b === a){

        for(let i = 2; i <= b; i ++){
            if(b % i === 0){
                return i;
            }
        }
    }else{
        return 2;
    }
}

console.log(solution());
