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


list = "0,1,2,3,4,5,6,7,8,9,one,two,three,four,five,six,seven,eight,nine,zero".split(
    ","
)
val = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]


for i, line in enumerate(lines):
    miidx = len(line) + 1000
    mival = 0
    mxidx = -1
    mxval = 0
    for j, l in enumerate(list):
        idx = line.find(l)
        if idx != -1:
            if idx < miidx:
                miidx = idx
                mival = val[j]

        idx = line.rfind(l)
        if idx != -1:
            if idx > mxidx:
                mxidx = idx
                mxval = val[j]

    n = int(str(mival) + str(mxval))
    ansi += n

print(ansi)
