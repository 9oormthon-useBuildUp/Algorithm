
N = int(input())


for i in range(N):
	str=input()
	flag=False
	for char in str:
		if(char.lower() in ['a','e','i','o','u']):
			print(char,end='')
			flag=True
	
	if(flag):
			print()
	else:
			print("???")
			