import sys
from collections import deque
input = sys.stdin.readline

# N, M 입력
N, M = map(int, input().split())

graph = [list(map(int, input().strip())) for _ in range(N)]

dx = [-1, 1, 0, 0]
dy = [0, 0, -1, 1]

def bfs(x, y):
    # 큐 구현을 위해 deque 라이브러리 사용
    queue = deque()
    queue.append((x, y))  # 여기서 튜플로 (x, y) 추가
    
    # 큐가 빌 때까지 반복
    while queue:
        x, y = queue.popleft()
        
        for i in range(4):
            nx = x + dx[i]
            ny = y + dy[i]
            
            # 범위를 벗어나면 무시
            if nx < 0 or nx >= N or ny < 0 or ny >= M:
                continue
            
            # 벽이거나 이미 방문한 곳이면 무시
            if graph[nx][ny] == 0:
                continue
            
            # 처음 방문하는 노드라면 거리 기록
            if graph[nx][ny] == 1:
                graph[nx][ny] = graph[x][y] + 1
                queue.append((nx, ny))  # 여기서도 튜플로 (nx, ny) 추가
    
    return graph[N-1][M-1]

print(bfs(0, 0))
