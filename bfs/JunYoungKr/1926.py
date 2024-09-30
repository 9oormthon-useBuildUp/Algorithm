from collections import deque
import sys

input = sys.stdin.readline

dx = [-1, 1, 0, 0]
dy = [0, 0, -1, 1]

def bfs(x, y):
    queue = deque([(x, y)])
    count = 0
    while queue:
        x, y = queue.popleft()
        
        for i in range(4):
            nx = x + dx[i]
            ny = y + dy[i]
            
            if nx < 0 or ny < 0 or nx >= n or ny >= m:
                continue
            if graph[nx][ny] == 0:
                continue
            
            if graph[nx][ny] == 1:
                count += 1
                queue.append([nx, ny])
                graph[nx][ny] = 0
    return count


# 도화지의 세로 n, 가로 m 입력
n, m = map(int, input().split())

graph = []
for _ in range(n):
    graph.append(list(map(int, input().split())))
    
    
ans = 0
count = 0
for i in range(n):
    for j in range(m):
        if graph[i][j] == 1:
            count += 1
            ans = max(bfs(i, j), ans)
            
print(count)
print(ans)