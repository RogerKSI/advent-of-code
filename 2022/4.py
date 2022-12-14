import sys

f = open(sys.argv[1], "r")
lines = [line.strip() for line in f.readlines()]
answer = 0

for idx, line in enumerate(lines):
    a, b, c, d = [int(y) for x in line.split(",") for y in x.split("-")]

    if (c <= b and d >= a) or (a <= d and b >= c):
        answer = answer + 1

print(answer)
