import sys
from collections import deque
input = sys.stdin.readline


# '.': 빈 공간
# '#': 벽
# '@': 상근이의 시작 위치
# '*': 불

# 테스트 케이스 T 입력
T = int(input())

for _ in range(T):
    # for _ in range(T):
    # 너비와 높이 w, h 입력
    w, h = map(int, input().split())

    graph = [list(map(str, input().strip())) for _ in range(h)]
    # print(graph)

    # 상근이는 벽을 통과할 수 없고, 불이 옮겨진 칸 또는 이제 불이 붙으려는 칸으로 이동할 수 없다
    # 즉 불이 먼저 움직이고, 상근이가 움직이는 구조로 진행

    queue_불 = deque([])
    queue_상근 = deque([])

    # -1이면 초기값이므로 아직 방문하지 않은 상태
    visited_불 = [[-1] * w for _ in range(h)]
    visited_상근 = [[-1] * w for _ in range(h)]

    for i in range(h):
        for j in range(w):
            if graph[i][j] == '*': # 불의 초기 위치
                queue_불.append((i, j))
                visited_불[i][j] = 0
            elif graph[i][j] == '@': # 상근이의 초기 위치
                queue_상근.append((i, j))
                visited_상근[i][j] = 0
            
    dx = [-1, 1, 0, 0]
    dy = [0, 0, -1, 1]   

    def bfs_fire():
        while queue_불:
            x, y = queue_불.popleft()
            
            for i in range(4):
                nx = x + dx[i]
                ny = y + dy[i]
                
                # 불이 번지는 방향
                # 빈 공간일 경우에만 번짐
                if 0 <= nx < h and 0 <= ny < w and graph[nx][ny] == '.' and visited_불[nx][ny] == -1:
                    queue_불.append((nx, ny))
                    visited_불[nx][ny] = visited_불[x][y] + 1


    def bfs_상근():
        while queue_상근:
            x, y = queue_상근.popleft()
            
            for i in range(4):
                nx = x + dx[i]
                ny = y + dy[i]
                
                # 상근이가 미로의 경계를 벗어나면 탈출 성공
                if nx < 0 or nx >= h or ny < 0 or ny >= w:
                    return visited_상근[x][y] + 1  # 탈출한 시간을 리턴
                
                # 상근이가 이동할 수 있는 경우
                # 벽이 아니여야함
                # 불이 번 진곳이 아니여야함
                if graph[nx][ny] == '.' and visited_상근[nx][ny] == -1:
                    # 불이 퍼지지 않았거나 불보다 먼저 상근이가 도착하는 경우
                    if visited_불[nx][ny] == -1 or visited_불[nx][ny] > visited_상근[x][y] + 1:
                        visited_상근[nx][ny] = visited_상근[x][y] + 1
                        queue_상근.append((nx, ny))
                    
        return "IMPOSSIBLE"

    bfs_fire()
    answer = bfs_상근()
    print(answer)