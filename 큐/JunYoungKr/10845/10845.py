from collections import deque
import sys

input = sys.stdin.readline
N = int(input())

queue = deque()
# print(queue)

for i in range(N):
    command = input().strip().split(' ')
    order = command[0]
    # push X: 정수 X를 큐에 넣는 연산이다.
    if order == 'push':
        queue.append(int(command[1]))
    # pop: 큐에서 가장 앞에 있는 정수를 빼고, 그 수를 출력한다. 만약 큐에 들어있는 정수가 없는 경우에는 -1을 출력한다.
    elif order == 'pop':
        if len(queue) == 0:
            print(-1)
        else:
            print(queue.popleft())
    # size: 큐에 들어있는 정수의 개수를 출력한다.
    elif order == 'size':
        print(len(queue))
    # empty: 큐가 비어있으면 1, 아니면 0을 출력한다.
    elif order == 'empty':
        if len(queue) == 0:
            print(1)
        else:
            print(0)
    # front: 큐의 가장 앞에 있는 정수를 출력한다. 만약 큐에 들어있는 정수가 없는 경우에는 -1을 출력한다.
    elif order == 'front':
        if len(queue) == 0:
            print(-1)
        else:
            print(queue[0])
    # back: 큐의 가장 뒤에 있는 정수를 출력한다. 만약 큐에 들어있는 정수가 없는 경우에는 -1을 출력한다.
    elif order == 'back':
        if len(queue) == 0:
            print(-1)
        else:
            print(queue[-1])
        