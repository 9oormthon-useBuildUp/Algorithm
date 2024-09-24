from collections import deque
import sys

input = sys.stdin.readline

# 미로 행의 개수 R, 열의 개수 C 입력
R, C = map(int, input().split())

# 미로 입력받기
graph = [list(input().strip()) for _ in range(R)]

queue_j = deque()  # 지훈이의 큐
queue_f = deque()  # 불의 큐

# 방문 여부를 기록할 배열 (지훈이와 불의 방문 기록)
visited_j = [[-1] * C for _ in range(R)]  # 지훈이의 방문 기록
visited_f = [[-1] * C for _ in range(R)]  # 불의 방문 기록

# 미로 상태 파악 및 큐 초기화
for i in range(R):
    for j in range(C):
        if graph[i][j] == 'F':
            queue_f.append((i, j))  # 불의 초기 위치
            visited_f[i][j] = 0     # 불의 초기 위치 시간 0으로 설정
        elif graph[i][j] == 'J':
            queue_j.append((i, j))  # 지훈이의 초기 위치
            visited_j[i][j] = 0     # 지훈이의 초기 위치 시간 0으로 설정

# 상하좌우 이동을 위한 방향 설정
dx = [-1, 1, 0, 0]
dy = [0, 0, -1, 1]

# 불의 확산을 BFS로 처리
def bfs_fire():
    while queue_f:
        x, y = queue_f.popleft()

        for i in range(4):
            nx = x + dx[i]
            ny = y + dy[i]

            # 범위 안에 있으며 이동할 수 있는 경우
            if 0 <= nx < R and 0 <= ny < C and graph[nx][ny] == '.' and visited_f[nx][ny] == -1:
                visited_f[nx][ny] = visited_f[x][y] + 1  # 불이 퍼진 시간을 기록
                queue_f.append((nx, ny))

# 지훈이의 이동을 BFS로 처리
def bfs_j():
    while queue_j:
        x, y = queue_j.popleft()

        for i in range(4):
            nx = x + dx[i]
            ny = y + dy[i]

            # 지훈이가 미로의 경계를 벗어나면 탈출 성공
            if nx < 0 or nx >= R or ny < 0 or ny >= C:
                return visited_j[x][y] + 1  # 탈출한 시간을 리턴

            # 지훈이가 이동할 수 있는 조건: 빈 공간이고 방문하지 않았고, 불보다 먼저 도착해야 함
            if graph[nx][ny] == '.' and visited_j[nx][ny] == -1:
                # 불이 퍼지지 않았거나, 불보다 지훈이가 먼저 도착하는 경우 (위에 if문과 합칠 수 있음)
                if visited_f[nx][ny] == -1 or visited_f[nx][ny] > visited_j[x][y] + 1:
                    visited_j[nx][ny] = visited_j[x][y] + 1
                    queue_j.append((nx, ny))

    return "IMPOSSIBLE"  # 탈출할 수 없는 경우

# 불이 먼저 퍼지고, 그 다음에 지훈이가 이동
bfs_fire()  # 불의 확산 먼저 처리
answer = bfs_j()  # 지훈이의 이동 처리
print(answer)
