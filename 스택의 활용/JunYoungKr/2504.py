from collections import deque
import sys

input = sys.stdin.readline

str = list(input().strip())
print(str)

# 결과값
result = 0

stack = []

for i in str:
    # 여는 괄호라면 stack에 넣음
    if i in '([':
        stack.append(i)
        continue
    
    # stack의 길이가 0이 아닌 경우
    if len(stack) != 0:
        # stack.pop() 과 i 비교
        if stack[-1] == '(':
            # 짝이 이뤄지는 경우
            if i == ')':
                result += 2
                stack.pop()
            # 같은 괄호인 경우
            elif i == '(':
                stack.append(i)
        elif stack[-1] == '[':
            if i == ']':
                result += 3
                stack.pop()
            elif i == '[':
                stack.append(i)
    print("stack: ", stack)
    print("result: ", result)
        
    
                
        
print(result)          
        


# (()[[]])([])

# 연산의 끝
# stack.pop == '('이고 i == ')' 일 때 result += 2
# stack.pop == '['이고 i == '