import sys

f = open(sys.argv[1], "r")
answer = None

score = 0
while line := f.readline():
    line = line.strip()
    part = line.split(" ")

    enemy = ord(part[0]) - ord("A")
    target = ord(part[1]) - ord("X") - 1

    me = enemy - (-1) * target
    me = me % 3

    score += me + 1

    if me - enemy == 1 or enemy - me == 2:
        score += 6
    elif me == enemy:
        score += 3

print(score)
