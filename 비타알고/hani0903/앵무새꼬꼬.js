const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

let result = '';

for(let i = 1; i<= input[0];i++){
    let line = input[i];
    let tmp = ''

    for(let c of line){
        if('aeiouAEIOU'.includes(c)){
            tmp += c;
        }
    }
    if(tmp === ''){
        tmp += '???';
    }
    tmp += '\n';

    result += tmp;
}

console.log(result.trim());