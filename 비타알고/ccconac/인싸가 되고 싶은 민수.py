def solution(a, b):
	if a != b: return 2
	else:
		min = 0
		for i in range(2, int(a**(1/2)) + 1):
			if a % i == 0:
				min = i
				break
	
		if min == 0: return a
		else: return min

[a, b] = map(int, input().split())

answer = solution(a, b)
print(answer)