import sys

sys.path.append("..")
from collections import defaultdict, Counter, deque
import numpy as np
from math import lcm
from queue import PriorityQueue
from functools import cmp_to_key
from itertools import cycle
from util import direct4, direct8

uniq = set()
pq = PriorityQueue()
dictl, dicti = defaultdict(list), defaultdict(int)
ansi, anss = [], ""

f = open(sys.argv[1], "r")
lines = [line.strip() for line in f.readlines()]
n, m = len(lines), max(len(line) for line in lines)
array, table = [], np.zeros((n, m))

step = lines[0]
lines = lines[2:]

map = {}
points = []

for i, line in enumerate(lines):
    if line.strip() == "":
        continue
    key, way = [x.strip() for x in line.split("=")]
    left, right = way[1:-1].split(", ")
    map[key] = (left, right)

    if key.endswith("A"):
        points.append(key)

counter = 0
s = 0
while True:
    s = s + 1
    for i in range(0, len(points)):
        if points[i].endswith("Z"):
            continue

        if step[counter] == "L":
            points[i] = map[points[i]][0]
        else:
            points[i] = map[points[i]][1]

        # input has only one z and no offset of the cycle
        # so, we just need the length
        if points[i].endswith("Z"):
            ansi.append(s)
            continue

    if len(ansi) == len(points):
        break

    counter = counter + 1
    counter = counter % len(step)


print(lcm(*ansi))
print(anss)
