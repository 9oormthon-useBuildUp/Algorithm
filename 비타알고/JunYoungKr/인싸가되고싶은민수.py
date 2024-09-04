a, b = map(int, input().split())

# a와 b가 다르면 2를 출력
if a != b:
    print(2)
else:
    # a와 b가 같을 경우, a의 가장 작은 약수를 찾음
    i = 2
    while i * i <= a:  # i * i가 a보다 작거나 같을 때까지 반복
        if a % i == 0:  # a가 i로 나누어 떨어지면
            print(i)    # i가 가장 작은 약수이므로 출력하고 종료
            break
        i += 1
    else:
        # 만약 루프가 종료될 때까지 나누어 떨어지지 않으면 a는 소수
        print(a)  # a를 출력
