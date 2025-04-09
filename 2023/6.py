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

time = int("".join(lines[0].split(":")[1].strip().split()))
distance = int("".join(lines[1].split(":")[1].strip().split()))

for j in range(0, time):
    if (time - j) * j > distance:
        ansi = ansi + 1

print(ansi)
print(anss)
