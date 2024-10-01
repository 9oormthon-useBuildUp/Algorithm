input_string = input().strip()

found_21 = []
found_12 = []

i = 0
while i < len(input_string) - 1:
  if input_string[i:i + 2] == '21':
    found_21.append(i)
    i += 1
  elif input_string[i:i + 2] == '12':
    found_12.append(i)
    i += 1
  else:
    i += 1

for idx21 in found_21:
  for idx12 in found_12:
    if (idx21 + 2 <= idx12) or (idx12 + 2 <= idx21):
      print('Yes')
      exit()

print('No')
