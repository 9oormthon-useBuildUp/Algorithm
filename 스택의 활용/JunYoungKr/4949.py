from collections import deque
import sys

input = sys.stdin.readline


while True:
    str = list(input())
    # print(str)

    if str[0] == '.':
        break
    
    stack = []

    # flag가 true인 경우 yes, false인 경우 no
    flag = True

    for e in str:
        if e in '([':
            stack.append(e)
            continue

        # 닫는 괄호라면 stack[-1]랑 비교
        if e in ')]':
            # 스택 길이가 0이라면
            if len(stack) == 0:
                flag = False
                break
            # 스택 길이가 0이 아니라면
            elif len(stack) != 0:
                마지막요소 = stack.pop()
                if 마지막요소 == '(' and e == ']':
                    flag = False
                    break
                elif 마지막요소 == '[' and e == ')':
                    flag = False
                    break
                
    if len(stack) >= 1:
        flag = False
            
        
    if flag:
        print("yes")
    else:
        print("no")
            
