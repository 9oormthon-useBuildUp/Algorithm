from collections import deque
import sys

input = sys.stdin.readline

dx = [-1, 1, 0, 0]
dy = [0, 0, -1, 1]

def bfs(x, y):
    queue = deque([(x, y)])
    graph[x][y] = 0  # 시작 지점을 방문 처리
    count = 1  # 시작 지점도 집이므로 count는 1로 시작
    
    while queue:
        x, y = queue.popleft()
        
        for i in range(4):
            nx = x + dx[i]
            ny = y + dy[i]
            
            if nx < 0 or nx >= N or ny < 0 or ny >= N:
                continue
            
            # 이미 방문했거나 집이 없는 경우 무시
            if graph[nx][ny] == 0:
                continue
            
            # 집이 있는 경우 (1일 경우)
            if graph[nx][ny] == 1:
                queue.append((nx, ny)) # 큐에 좌표를 추가해 계속 탐색
                count += 1 # 집의 개수를 증가
                graph[nx][ny] = 0 # 방문 처리
    return count
                
    

# 지도의 크기 N 입력
N = int(input())

graph = [list(map(int, input().strip())) for _ in range(N)]
# print(graph)

    
cnt = []
count = 0
for i in range(N):
    for j in range(N):
        # 방문하지 않은 집(1)이 있을 때만 BFS 실행
        if graph[i][j] == 1:
            cnt.append(bfs(i, j)) # BFS를 통해 단지 내 집의 수를 리스트에 추가

cnt.sort()
print(len(cnt))

for i in cnt:
    print(i, end='\n')