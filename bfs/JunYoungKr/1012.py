from collections import deque
import sys
 
input = sys.stdin.readline

dx = [-1, 1, 0, 0]
dy = [0, 0, -1, 1]

def bfs(x, y):
    queue = deque([(x, y)])
    
    # 방문한 좌표는 2로 바꾸어 재방문하지 않도록 처리
    graph[x][y] = 2
    
    # 큐가 빌 때까지
    while queue:
        x, y = queue.popleft()
        
        for i in range(4):
            nx = x + dx[i]
            ny = y + dy[i]
            
            # 범위를 벗어나면 무시
            if nx < 0 or nx >= N or ny < 0 or ny >= M:
                continue
            # 배추가 있는 곳이면 방문 처리하고 큐에 추가
            if graph[nx][ny] == 1:
                graph[nx][ny] = 2
                queue.append((nx, ny))
                
    return count          
        
        
# 테스트 케이스 T 입력
T = int(input())

for _ in range(T):
    # 배추밭의 가로길이 M, 세로길이 N, 배추가 심어져 있는 위치의 개수 K 입력
    M, N, K = map(int, input().split())
    
    # 가로 M, 세로 N 크기의 배추밭 배열 생성
    graph = [[0] * M for _ in range(N)]
    
    # K줄 배추의 위치 X, Y 입력 / 각각의 범위는 0 <= X <= M-1, 0 <= Y <= N-1
    for _ in range(K):
        x, y = map(int, input().split())
        graph[y][x] = 1
        
    count = 0
    for i in range(N):
        for j in range(M):
            if graph[i][j] == 1:  # 배추가 심어진 곳을 발견하면
                bfs(i, j)  # 그 구역을 탐색
                count += 1  # 구역을 하나 찾았으므로 count 증가
    print(count)
    
