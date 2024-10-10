from collections import deque
import sys

input = sys.stdin.readline

MAX = 1000001
visited = [0] * MAX

def bfs(S):
    queue = deque([S])
    
    # 출발지는 방문했으므로 1로 변경
    visited[S] = 1
    
    while queue:
        v = queue.popleft()
        
        # 목적지에 도착한 경우
        if v == G:
            return visited[v] - 1
        
        for i in (v + U, v - D):
            if 0 < i <= F and visited[i] == 0 and i != S:
                visited[i] = visited[v] + 1
                queue.append(i)
    return "use the stairs"

F, S, G, U, D = map(int, input().split())
# S : 출발지
# G : 목적지
# U : 위로 U층으로 가는 버튼
# D : 아래로 D층을 가는 버튼

# U층 위, 또는 D층 아래에 해당하는 층이 없을 때는, 엘리베이터는 움직이지 않는다
print(bfs(S))    