a, b = map(int, input().split(' '))
print(a,b)

if (a != b): print("2")
else:
    i = 2
    while i * i <= a:
        if a % i == 0:
            print(i)
            break
        i+=1
    else:
        print(a)
        