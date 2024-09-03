def findMinDivisor(n):
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return i
    # 만약 약수가 발견되지 않으면, b는 소수
    return n

a,b=map(int,input().split(' '))

if(abs(b-a)>=1):
	print(2)
elif(b-a==0):
	i=2
	print(findMinDivisor(b))
	
	
	
