N = int(input())

arr = list(map(int, input().split( )))

dp = [0] * (N+2)
dp[0] = arr[0]

max = dp[0]

for i in range(1, len(arr)):
    if dp[i-1] + arr[i] >= abs(arr[i]):
        dp[i] = dp[i-1] + arr[i]
    else:
        dp[i] = arr[i]
   
    if dp[i] > max:
        max = dp[i]
print(max)