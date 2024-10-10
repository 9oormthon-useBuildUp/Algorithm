num = input()

# "12"와 "21"의 첫 출현 위치를 찾음
find_12 = num.find("12")
find_21 = num.find("21")
# print(find_12, find_21)
# 만약 "12"가 먼저 나타난다면, 그 다음에 오는 "21"을 확인
if find_12 != -1 and num.find("21", find_12 + 2) != -1:
    print("Yes")
# 아니면 "21"이 먼저 나타나고, 그 다음에 오는 "12"를 확인
elif find_21 != -1 and num.find("12", find_21 + 2) != -1:
    print("Yes")
else:
    print("No")
