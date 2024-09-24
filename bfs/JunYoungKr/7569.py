from collections import deque
import sys
 
input = sys.stdin.readline

# 상자의 가로 칸의 수 M, 상자의 세루 칸의 수 N, H
M, N, H = map(int, input().split())

graph = [[list(map(int, input().split())) for _ in range(N)] for _ in range(H)]
# print(graph)

queue = deque([])
for i in range(H):
    for j in range(N):
        for k in range(M):
            if graph[i][j][k] == 1:
                queue.append((i, j, k))

# print(queue)

dx = [-1, 1, 0, 0, 0, 0]
dy = [0, 0, -1, 1, 0, 0]
dz = [0, 0, 0, 0, -1, 1]

while queue:
    x, y, z = queue.popleft()
    
    for i in range(6):
        nx = x + dx[i]
        ny = y + dy[i]
        nz = z + dz[i]
        
        # 범위 안에 있으면서 아직 익지 않은 토마토를 만났을 때
        if 0 <= nx < H and 0 <= ny < N and 0 <= nz < M and graph[nx][ny][nz] == 0:
            graph[nx][ny][nz] = graph[x][y][z] + 1
            queue.append((nx, ny, nz)) 
            
count = 0

# 7576번의 2차원 배열의 경우 행과 열로 이루어져 있기 때문에 각 행과 열을 순회하는 방식으로 배열을 처리할 수 있다.
# 하지만 7569번의 경우 3차원 배열이기 때문에 높이, 행, 열 순으로 순회를 해야한다.
for i in range(H):
    for j in range(N):
        for k in range(M):
            if graph[i][j][k] == 0:
                print(-1)
                exit(0)
            count = max(count, graph[i][j][k])
            
print(count-1)