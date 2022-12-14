import sys
import math

f = open(sys.argv[1], "r")
answer = 0

lists = []

while line := f.readline():
    line = line.strip()
    lists.append(line)

for i in range(0, len(lists), 3):

    cha = {}
    for j in range(0, 3):
        for k in range(0, len(lists[i + j])):
            if lists[i + j][k] not in cha:
                cha[lists[i + j][k]] = 0

            if cha[lists[i + j][k]] == j:
                cha[lists[i + j][k]] += 1

    dup = None
    for a in cha:
        if cha[a] == 3:
            dup = a

    if ord("a") <= ord(dup) and ord(dup) <= ord("z"):
        answer += ord(dup) - ord("a") + 1
    else:
        answer += ord(dup) - ord("A") + 27

print(answer)
