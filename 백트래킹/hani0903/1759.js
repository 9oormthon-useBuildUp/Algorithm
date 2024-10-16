const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [L, C] = input[0].split(' ').map(Number);
const alphabet = input[1].split(' ').sort();

const isUsed = Array.from({length : C}).fill(false);
let vowelUsed = 0;
let consonantUsed = 0;
const vowels = ['a', 'e', 'i', 'o', 'u'];
let answer = [];

function backTracking(k, c) {

    if(k === L && vowelUsed >= 1 && consonantUsed >= 2 ) {
        console.log(answer.join(''));
        return;
    }

    for(let i = c; i < C; i++) {
        if(!isUsed[i]) {
            // vowels 확인
            if(vowels.indexOf(alphabet[i]) !== -1) vowelUsed++;
            else consonantUsed++;

            isUsed[i] = true;
            answer.push(alphabet[i]);
            backTracking(k + 1, i + 1);

            // vowels 확인
            if(vowels.indexOf(alphabet[i]) !== -1) vowelUsed--;
            else consonantUsed--;
            isUsed[i] = false;
            answer.pop();
        }
    }
}

backTracking(0, 0);
