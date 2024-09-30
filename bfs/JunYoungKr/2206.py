from collections import deque
import sys
 
input = sys.stdin.readline

# N, M 입력
N, M = map(int, input().split())

graph = [list(map(int, input().strip())) for _ in range(N)]

# 0은 이동할 수 있는 곳
# 1은 이동할 수 없는 곳 (벽이 존재)
# (1, 1) 에서 (N, M)까지 이동하려고 함

dx = [-1, 1, 0, 0]
dy = [0, 0, -1, 1]


def bfs():
    queue = deque([(0, 0, 0)])  # x, y, 벽을 부순 상태 0 또는 1
    visited = [[[0] * 2 for _ in range(M)] for _ in range(N)]
    visited[0][0][0] = 1  # 시작 지점 (벽을 부수지 않은 상태로 방문 기록)
    
    while queue:
        x, y, flag = queue.popleft()
        
        # 도착지점에 도착했을 경우
        if x == N-1 and y == M-1:
            return visited[x][y][flag]
        
        for i in range(4):
            nx = x + dx[i]
            ny = y + dy[i]
            
            # 범위 내에 있어야 함
            if 0 <= nx < N and 0 <= ny < M:
                # 1. 벽을 부수지 않고 가는 경우 (flag == 0 또는 flag == 1)
                if graph[nx][ny] == 0 and visited[nx][ny][flag] == 0:
                    visited[nx][ny][flag] = visited[x][y][flag] + 1
                    queue.append((nx, ny, flag))
                
                # 2. 벽을 부술 수 있고, 벽을 부순 후 이동하는 경우 (flag == 0일 때만 벽을 부술 수 있음)
                elif graph[nx][ny] == 1 and flag == 0 and visited[nx][ny][1] == 0:
                    visited[nx][ny][1] = visited[x][y][flag] + 1
                    queue.append((nx, ny, 1))  # 벽을 부순 상태로 이동

    return -1

print(bfs())
