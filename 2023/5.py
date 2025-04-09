import sys

sys.path.append("..")
from collections import defaultdict, Counter, deque
import numpy as np
from queue import PriorityQueue
from functools import cmp_to_key
from itertools import cycle
from util import direct4, direct8

uniq = set()
pq = PriorityQueue()
dictl, dicti = defaultdict(list), defaultdict(int)
ansi, anss = 0, ""

f = open(sys.argv[1], "r")
seed, *others = f.read().split("\n\n")
arr = [int(x) for x in seed.split(":")[1].strip().split()]
arr = [(arr[i], arr[i] + arr[i + 1]) for i in range(0, len(arr), 2)]

for i, other in enumerate(others):
    lines = other.split("\n")

    mapper = []
    for j, line in enumerate(lines):
        if j == 0 or line == "":
            continue

        es, ss, le = [int(x) for x in line.split()]
        mapper.append((ss, es, le))
    mapper = sorted(mapper, key=lambda x: x[0])

    narr = []
    for a in arr:
        st, en = a
        for m in mapper:
            if m[0] > st:
                if m[0] >= en:
                    narr.append((st, en))
                    break
                narr.append((st, m[0]))
                st = m[0]
            if m[0] + m[2] < st:
                continue

            ne = min(en, m[0] + m[2])
            narr.append((st - m[0] + m[1], ne - m[0] + m[1]))
            st = ne

            if st >= en:
                break
        if st < en:
            narr.append((st, en))
    arr = narr

arr = sorted(arr, key=lambda x: x[0])
print(arr[0][0])
print(anss)
