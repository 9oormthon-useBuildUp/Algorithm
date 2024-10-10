# 모음 (a, e, i, o, u)

N = int(input())
# print(type(N))

for i in range(N):
	str = input()
	# 빈 문장 선언
	str1 = ""
	for ch in str:
		if ch in ["a", "e", "i", "u", "o", "A", "E", "I", "O", "U"]:
			str1 += ch
	
	if str1:
		print(str1)
	else:
		print("???")
