from collections import deque
import sys

input = sys.stdin.readline


# 가로 칸의 수 M, 세로 칸의 수 N 입력
M, N = map(int, input().split())

# 하나의 토마토의 인접한 곳은 왼쪽, 오른쪽, 앞, 뒤 네 방향에 있는 토마토를 의미한다
# 대각선 방향에는 영향을 주지 못함

# 정수 1은 익은 토마토
# 정수 0은 익지 않은 토마토
# 정수 -1은 토마토가 들어있지 않은 칸을 나타냄

graph = [list(map(int, input().split())) for _ in range(N)]

print(graph)

queue = deque()

# graph를 돌면서 가장 먼저 익은 토마토를 찾기
for i in range(N):
    for j in range(M):
        if graph[i][j] == 1:
            queue.append([i, j]) # 익은 토마토의 좌표를 큐에 저장
        

dx = [-1, 1, 0, 0]
dy = [0, 0, -1, 1]


while queue:
    x, y = queue.popleft()
    
    for i in range(4):
        
        nx = x + dx[i]
        ny = y + dy[i]
        
        if nx < 0 or nx >= N or ny < 0 or ny >= M:
            continue
        
        # 익은 토마토일 경우 지나침
        if graph[nx][ny] == 1:
            continue
        
        # 익지 않은 토마토일 경우(값이 0인 경우) 익히고 그 좌표를 큐에 추가
        # 익힌 토마토의 날짜를 현재 토마토 값 +1로 설정
        if graph[nx][ny] == 0:
            # 1로 바꿔주고
            graph[nx][ny] = graph[x][y] + 1
            queue.append((nx, ny))
    
              
count = 0  
for i in graph:
    for j in i:
        if j == 0:
            print(-1) # 익지 않은 토마토가 하나라도 있으면 -1 출력 후 종료
            exit(0)
    # 모든 행에서 가장 큰 값을 찾아 count에 저장
    count = max(count, max(i))

# 처음부터 익어있던 토마토는 1로 시작했으므로, 최종 일수는 count - 1
print(count-1)