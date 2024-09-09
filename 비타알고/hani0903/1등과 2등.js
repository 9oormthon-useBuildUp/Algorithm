const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
let input = fs.readFileSync(filePath, 'utf-8').trim();

let idx21 = input.indexOf('21');

if (idx21 !== -1){
    input = input.slice(0, idx21) + input.slice(idx21 + 2);
    let idx12 = input.indexOf('12');

    if(idx12 !== -1){
        console.log('Yes');
    }else{
        console.log('No');
    }
}else{
    console.log('No');
}




