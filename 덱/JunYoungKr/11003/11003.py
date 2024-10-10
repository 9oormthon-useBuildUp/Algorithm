from collections import deque
import sys

input = sys.stdin.readline

# print(queue)

N, L = map(int, input().split(' '))
# print(N, L)

A = list(map(int, input().split(' ')))
# print(A)

queue = deque()
result = []

for i in range(N):
    while queue and queue[0] <= i - L:
        queue.popleft()
        
    while queue and A[queue[-1]] > A[i]:
        queue.pop()
        
    queue.append(i)
    
    result.append(A[queue[0]])

for i in result:
    print(i, end=" ")
    