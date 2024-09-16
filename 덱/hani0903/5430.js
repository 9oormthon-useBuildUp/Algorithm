const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');

let N = parseInt(input[0]);


const testCases = [];

for(let i = 1; i < parseInt(input[0]) * 3; i += 3){

    const p = input[i].split('');
    const n = input[i+1].split('');
    const x = (input[i + 2].match(/\d+/g) || []).map(Number);

    testCases.push([p, n, x]);
}

class Deque {

    constructor(arr) {        
        this.storage = arr;
        this.head = 0;
        this.tail = arr.length - 1;
        this.reverse = false;
        this.error = false;
    }

    R() {
        this.reverse = !this.reverse;
    }

    D() {
        if(this.empty()){
            this.error = true;
        }
        else if(this.reverse){
            this.tail--;
        }else{
            this.head++;
        }
    }

    size() {
        return this.tail - this.head + 1;
    }

    empty() {
        return this.size() <= 0;
    }

    result(){
        if(this.error){
            return 'error';
        }
        else if(this.reverse){
            return '[' +this.storage.slice(this.head, this.tail + 1).reverse().join(',') + ']';
        }else{
            return '[' +this.storage.slice(this.head, this.tail + 1).join(',') + ']';
        }
    }
}

let res = [];
result();

function result() {

    for(let i = 0; i < N; i++){ //테스트 케이스만큼

        const deque = new Deque(testCases[i][2]);

        for(let f  of testCases[i][0]){
            switch (f) {
                case 'R':
                    deque.R();
                    break;
        
                case 'D':
                    deque.D();
                    break;
            }
        }

        res.push(deque.result());
    }
}

console.log(res.join('\n'));
