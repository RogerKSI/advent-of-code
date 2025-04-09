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

for i, line in enumerate(lines):
    rounds = line.split(":")[1].strip().split(";")
    check = True

    mx = {"blue": 0, "red": 0, "green": 0}
    for round in rounds:
        round = [a.strip().split(" ") for a in round.strip().split(",")]
        arr = {"blue": 0, "red": 0, "green": 0}
        for a, b in round:
            arr[b] += int(a)

        for c in ["blue", "red", "green"]:
            if arr[c] > mx[c]:
                mx[c] = arr[c]

    x = 1
    for c in ["blue", "red", "green"]:
        x *= mx[c]
    ansi += x

print(ansi)
print(anss)
