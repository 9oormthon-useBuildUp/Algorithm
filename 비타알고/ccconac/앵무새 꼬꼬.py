def solution(sentences):
	vowels = 'aeiouAEIOU'
	answer = []
	
	for sentence in sentences:
		vowel_characters = [char for char in sentence if char in vowels]
		
		if vowel_characters:
			answer.append(''.join(vowel_characters))
		else:
			answer.append('???')

	return answer

n = int(input()) 
sentences = [input() for _ in range(n)]

output = solution(sentences)
for result in output:
	print(result)
