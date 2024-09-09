h=int(input())
score=[0]
for i in range(h):
	str=list(input())
	for s in str:
		score.append(ord(s) - ord('A') + 1)

for i in range(2,len(score)):
	score[i]+=score[i//2]
	
lastCnt=2**(h-1)

lastScore=score[-lastCnt:]

print(min(lastScore))
print(max(lastScore))