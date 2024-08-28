const input = require('fs').readFileSync('text.txt').toString().trim().split('\n');
input.shift();

const answer = input.map(str => {
	const firstStr = str.split(' ')[0].split('').sort().join('');
	const secondStr = str.split(' ')[1].split('').sort().join('');

	if (firstStr === secondStr) return 'Possible';
	else return 'Impossible';
})

console.log(answer.join('\n'));
