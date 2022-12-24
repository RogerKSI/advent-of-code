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
    parts = [int(x) for x in line.split(",")]

print(ansi)
print(anss)
