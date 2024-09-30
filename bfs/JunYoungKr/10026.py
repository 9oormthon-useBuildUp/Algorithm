from collections import deque
import sys, copy

input = sys.stdin.readline

# N 입력
N = int(input())

graph = [list(input().strip()) for _ in range(N)]
copy_graph = copy.deepcopy(graph)
# print(graph)

# 적록색약은 빨간색과 초록색의 차이를 느끼지 못함

dx = [-1, 1, 0, 0]
dy = [0, 0, -1, 1]


# 적록색약이 아닌 사람이 봤을 때의 구역의 수
def bfs_none(x, y, color):
    queue = deque([(x, y)])
    graph[x][y] = 1  # 방문 처리
    
    while queue:
        x, y = queue.popleft()
        
        for i in range(4):
            nx = x + dx[i]
            ny = y + dy[i]
            
            if 0 <= nx < N and 0 <= ny < N and graph[nx][ny] == color:
                graph[nx][ny] = 1
                queue.append((nx, ny))
count1 = 0
for i in range(N):
    for j in range(N):
        if graph[i][j] == 'R' or graph[i][j] == 'G' or graph[i][j] == 'B':
            bfs_none(i, j, graph[i][j])
            count1 += 1
print(count1)

# 적록색약인 사람이 봤을 때의 구역의 수 (첫 번째 먼저 구한 후 G를 R로 바꿈, 어차피 차이를 못느끼기 때문)
for i in range(N):
    for j in range(N):
        if copy_graph[i][j] == 'G':
            copy_graph[i][j] = 'R'
            
# print(graph)

def bfs(x, y, color):
    queue = deque([(x, y)])
    copy_graph[x][y] = 1
    
    while queue:
        x, y = queue.popleft()
        for i in range(4):
            nx = x + dx[i]
            ny = y + dy[i]
            
            if 0 <= nx < N and 0 <= ny < N and copy_graph[nx][ny] == color:
                copy_graph[nx][ny] = 1
                queue.append((nx, ny))
                
count2 = 0
for i in range(N):
    for j in range(N):
        if copy_graph[i][j] == 'R' or copy_graph[i][j] == 'B':
                bfs(i, j, copy_graph[i][j])
                count2 += 1
                
print(count2)
    
    