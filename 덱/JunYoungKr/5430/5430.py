# 함수 R은 배열에 있는 수의 순서를 뒤집는 함수
# D는 첫 번째 수를 버리는 함수. 배열이 비어있는 경우에 호출하면 에러 발생
from collections import deque


# 테스트 케이스 개수 T
T = int(input())

for i in range(T):
    # 수행할 함수 p
    p = input()
    
    # 배열에 들어있는 수의 개수 n
    n = int(input())
    
    queue = deque(input().strip('[]').split(','))
    # print(queue)
    
    # RR일때는 뒤집어 줄 필요가 없기에 홀수일 때만 뒤집기
    flag = 0
    
    # 찾아본 결과 deque는 ['']의 길이를 1로 취급하기 때문에 초기화 해야한다고 함
    if n == 0:
        queue = []
        
    # 수행할 함수의 길이만큼 반복문
    for i in p:
        if i == 'R':
            flag += 1
        elif i == 'D':
            if len(queue) == 0:
                print('error')
                break
            else:
                if flag % 2 == 1:
                    queue.pop()
                else:
                    queue.popleft()
    else:
        if flag % 2 == 1:
            queue.reverse()
        print('[' + ','.join(queue) + ']')
    
