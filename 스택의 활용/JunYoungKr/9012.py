from collections import deque
import sys

input = sys.stdin.readline

# N 입력
N = int(input())

for _ in range(N):
    arr = list(input().strip())
    
    stack = []
    flag = True
    
    # 여는 괄호라면 받음
    for e in arr:
        if e in '([':
            stack.append(e)
            continue
        
        # stack의 길이가 0이 아닌 경우
        if e in ')]':
            if len(stack) == 0:
                flag = False
                break
            # 마지막 요소가 여는 괄호인데
            elif len(stack) != 0:
                마지막요소 = stack.pop()
                if 마지막요소 == '(' and e == ']':
                    flag = False
                    break
                elif 마지막요소 == '[' and e == ')':
                    flag = False
                    break
                
                
     # stack의 길이가 0인 경우
    if len(stack) >= 1:
        flag = False
    
    if flag:
        print("YES")
    else:
        print("NO")
            
            