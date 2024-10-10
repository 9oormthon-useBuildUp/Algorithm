from collections import deque

queue = deque()

N = int(input())

for i in range(1, N+1):
    queue.append(i)
    
# print(queue)

while len(queue) != 1:
    queue.popleft()
    queue.append(queue.popleft())
    
print(queue[0])
    