from collections import deque
import sys

input = sys.stdin.readline

M, N, K = map(int, input().split())

graph = [[0] * N for _ in range(M)]
# print(graph)


dx = [-1, 1, 0, 0]
dy = [0, 0, -1, 1]

def bfs(x, y):
    queue = deque([(x, y)])
    graph[x][y] = 1
    count = 1
    
    while queue:
        x, y = queue.popleft()
        for i in range(4):
            nx = x + dx[i]
            ny = y + dy[i]
            
            if nx < 0 or ny < 0 or nx >= M or ny >= N:
                continue
            
            # 직사각형이면 지나감
            if graph[nx][ny] == 1:
                continue
            # 직사각형이 아닌 부분을 만날 경우
            if graph[nx][ny] == 0:
                graph[nx][ny] = 1
                queue.append((nx, ny))
                count += 1
    return count






for _ in range(K):
    a, b, c, d = map(int, input().split())
    for i in range(b, d):
        for j in range(a, c):
            graph[i][j] = 1
            
map = []

for i in range(M):
    for j in range(N):
        if graph[i][j] == 1:
            map.append(bfs(i, j))
            
map.sort()
print(len(map))

for i in map:
    print(i, end=' ')

    
    
    