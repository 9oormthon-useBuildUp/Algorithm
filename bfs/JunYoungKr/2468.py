from collections import deque
import sys, copy

input = sys.stdin.readline

N = int(input())

graph = [list(map(int, input().split())) for _ in range(N)]

# print(graph)

maxHeight = 0

for i in range(N):
    for j in range(N):
        if maxHeight < (graph[i][j]):
            maxHeight = graph[i][j]
        
# print(maxHeight)

dx = [-1, 1, 0, 0]
dy = [0, 0, -1, 1]

def bfs(x, y, copy_graph):
    queue = deque([(x, y)])
    copy_graph[x][y] = -1  # 방문한 곳은 -1로 표시
    
    while queue:
        x, y = queue.popleft()
        
        for i in range(4):
            nx = x + dx[i]
            ny = y + dy[i]
            
            if nx < 0 or nx >= N or ny < 0 or ny >= N:
                continue
            if copy_graph[nx][ny] == 0:
                continue
            
            if copy_graph[nx][ny] == 1:
                queue.append((nx, ny))
                copy_graph[nx][ny] = -1
                

max_cnt = 0
# 높이가 1부터 최대 높이까지
for i in range(1, maxHeight+1):
    copy_graph = copy.deepcopy(graph)
    for j in range(N):
        for k in range(N):
            # copy_graph에서 현재 높이보다 작은 경우 0으로 치환
            if copy_graph[j][k] < i:
                copy_graph[j][k] = 0
            # copy_graph에서 현재 높이보다 큰 경우 1로 치환
            else:
                copy_graph[j][k] = 1
                
    # print(copy_graph)      
    
    count = 0
    for j in range(N):
        for k in range(N):
            if copy_graph[j][k] == 1:
                bfs(j, k, copy_graph)
                count += 1
    # print("count", count)
    if max_cnt < count:
        max_cnt = count

print(max_cnt)

# 제일 높은 높이를 구함 => maxHeight
# graph를 돌면서 if graph[i][j] <= maxHeight이면
    # graph[i][j] = 0으로 변환 -> 잠겼다는 뜻
    
# 변환된 전체 graph를 돌면서 
    # 만약 0이 아닌 부분이 있다면(잠기지 않음) count += 1, 
