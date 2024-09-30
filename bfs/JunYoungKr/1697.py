from collections import deque
import sys
sys.setrecursionlimit(10**6)

input = sys.stdin.readline

# 수빈이의 위치 N, 동생의 위치 K
N, K = map(int, input().split())

MAX = 100001
visited = [0] * MAX

def bfs(start):
    queue = deque([start])
    visited[start] = 0
    while queue:
        current = queue.popleft()

        if current == K:
            return visited[current]
            
        for i in (current - 1, current + 1, current * 2):
            if 0 <= i < MAX and visited[i] == 0:
                visited[i] = visited[current] + 1
                queue.append(i)
            
        
print(bfs(N))
        