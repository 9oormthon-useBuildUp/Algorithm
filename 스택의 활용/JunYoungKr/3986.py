import sys 

input = sys.stdin.readline

# 단어의 수 N 입력
N = int(input())

count = 0
flag = False

# N만큼 문자열 입력
for i in range(N):
    str = list(input().strip())
    
    stack = []
    
    # 반복문을 돌면서 추가, 비교
    for e in str:
        # stack이 비어있으면 추가
        if len(stack) == 0:
            stack.append(e)
            continue
        
        if len(stack) != 0:
            # stack의 마지막 요소와 곧 들어올 e를 비교
            # 같다면 마지막요소 pop
            if stack[-1] == e:
                stack.pop()
            # 같지 않다면 그대로 stack에 추가
            elif stack[-1] != e:
                stack.append(e)
    
    # 반복문을 다 돌고나서도 stack의 길이가 0이라면 count += 1
    if len(stack) == 0:
        count += 1
             
print(count)
