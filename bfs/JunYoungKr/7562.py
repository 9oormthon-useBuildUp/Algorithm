from collections import deque
import sys
input = sys.stdin.readline

dx = [-2, -1, 1, 2, 2, 1, -1, -2]
dy = [-1, -2, -2, -1, 1, 2, 2, 1]

def bfs(x, y, len):
    queue = deque([(x, y)])
    
    while queue:
        x, y = queue.popleft()
        
        # 목표 위치에 도착하면 이동 횟수를 반환 (초기 값이 1이므로 -1 해줌)
        if x == fx and y == fy:
            return chess[x][y] - 1
        
        for i in range(8):
            nx = x + dx[i]
            ny = y + dy[i]
            
            if nx < 0 or nx >= len or ny < 0 or ny >= len:
                continue
            
            if chess[nx][ny] == 0:
                chess[nx][ny] = chess[x][y] + 1
                queue.append((nx, ny))
            
        
    
# 테스트 케이스 T 입력
T = int(input())

for _ in range(T):
    # 체스판의 한 변의 길이
    len = int(input())
    # 체스판 생성
    chess = [[0] * len for _ in range(len)]
    # 나이트가 현재 있는 칸
    x, y = map(int, input().split())
    # 나이트가 이동하려고 하는 칸
    fx, fy = map(int, input().split())
    
    if x == fx and y == fy:
        print(0)
        continue
    else:
        chess[x][y] = 1
        print(bfs(x, y, len))
        