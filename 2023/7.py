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


def rank(k):
    free = k.count("J")
    c = k.replace("J", "")
    num = sorted([c.count(i) for i in set(c)], reverse=True)

    if len(num) == 0:
        num.append(free)
    else:
        num[0] = num[0] + free

    if num[0] > 3:
        return num[0] + 2
    if num[0] == 3:
        if num[1] == 2:
            return 5
        return 4
    if num[0] == 2:
        if num[1] == 2:
            return 3
        return 2
    return 1


arr = []
for i, line in enumerate(lines):
    cards, bid = line.split()
    arr.append(
        (
            rank(cards),
            [
                int(
                    x.replace("T", "10")
                    .replace("J", "1")
                    .replace("Q", "12")
                    .replace("K", "13")
                    .replace("A", "14")
                )
                for x in cards
            ],
            int(bid),
        )
    )

arr = sorted(arr)
for i, a in enumerate(arr):
    ansi += a[2] * (i + 1)

print(ansi)
print(anss)
