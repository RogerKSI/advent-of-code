from collections import defaultdict
import sys

f = open(sys.argv[1], "r")
lines = [line[:-1] for line in f.readlines()]
answer = ""

step = 0

slots = defaultdict(list)
rows = 0
for idx, line in enumerate(lines):
    if line == "":
        continue

    if line.strip()[0] == "[":
        for i in range(1, len(line), 4):
            if line[i] == " ":
                continue

            col = int(((i - 1) / 4) + 1)
            rows = max(col, rows)

            slots[col].append(line[i])

    elif line[0] == "m":
        part = line.split(" ")
        numb = int(part[1])
        st = int(part[3])
        en = int(part[5])

        temp = slots[st][:numb]
        # temp.reverse()
        slots[en] = temp + slots[en]
        slots[st] = slots[st][numb:]


for i in range(1, rows + 1):
    answer = answer + slots[i][0]
print(answer)
