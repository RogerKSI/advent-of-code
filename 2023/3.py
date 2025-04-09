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
lines = [line.strip() for line in f.readlines()]
n, m = len(lines), max(len(line) for line in lines)
array, table = [], np.zeros((n, m))

mp = {}
for i in range(0, n):
    for j in range(0, m):
        if lines[i][j].isdigit():
            v = 0
            length = 0
            for k in range(j, m):
                if lines[i][k].isdigit():
                    length = length + 1
                    v = v * 10 + int(lines[i][k])
                    lines[i] = lines[i][:k] + "." + lines[i][k + 1 :]
                else:
                    break

            for k in range(i - 1, i + 2):
                for l in range(j - 1, j + length + 1):
                    if k < 0 or k > n - 1:
                        continue
                    if l < 0 or l > m - 1:
                        continue
                    if k == i and (l != j - 1 and l != j + length):
                        continue
                    if lines[k][l] == "*":
                        if not (k, l) in mp:
                            mp[(k, l)] = []
                        mp[(k, l)].append(v)

for k in mp:
    if len(list(mp[k])) == 2:
        ansi += mp[k][0] * mp[k][1]

print(ansi)
