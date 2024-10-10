import sys
from collections import deque

# BFS 탐색
def bfs():
    queue = deque([[sz, sy, sx]])
    dx = [1, -1, 0, 0, 0, 0]
    dy = [0, 0, -1, 1, 0, 0]
    dz = [0, 0, 0, 0, 1, -1]

    while queue:
        z, y, x = queue.popleft()

        # 도착지점에 도착했을 때 시간 출력
        if x == ex and y == ey and z == ez:
            return "Escaped in {0} minute(s).".format(visited[z][y][x])

        # 6방향 탐색
        for i in range(6):
            nx = x + dx[i]
            ny = y + dy[i]
            nz = z + dz[i]

            # 범위 내에 있고, 아직 방문하지 않았으며, 금이 아닌 곳만 탐색
            if 0 <= nx < c and 0 <= ny < r and 0 <= nz < l and visited[nz][ny][nx] == 0:
                if graph[nz][ny][nx] == "." or graph[nz][ny][nx] == "E":
                    visited[nz][ny][nx] = visited[z][y][x] + 1
                    queue.append([nz, ny, nx])

    # 도착하지 못하면 "Trapped!" 출력
    return "Trapped!"

while True:
    # L: 층 수, R: 행 수, C: 열 수 입력
    l, r, c = map(int, sys.stdin.readline().split())

    # 종료 조건
    if l == 0 and r == 0 and c == 0:
        break

    # 빌딩 정보 입력받기
    graph = [[] for _ in range(l)]
    visited = [[[0 for _ in range(c)] for _ in range(r)] for _ in range(l)]

    for i in range(l):
        for _ in range(r):
            graph[i].append(list(sys.stdin.readline().strip()))
        sys.stdin.readline()  # 층 사이의 빈 줄 제거

    # 시작점과 도착점 찾기
    for i in range(l):
        for j in range(r):
            for k in range(c):
                if graph[i][j][k] == "S":
                    sx, sy, sz = k, j, i
                elif graph[i][j][k] == "E":
                    ex, ey, ez = k, j, i

    # BFS 결과 출력
    print(bfs())
