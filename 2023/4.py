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


tab = [1] * 300
for i, line in enumerate(lines):
    corrects, numbers = line.split(":")[1].strip().split(" | ")
    arr = {}
    for correct in corrects.split(" "):
        if correct.strip() == "":
            continue
        arr[correct.strip()] = 1
    c = 0
    for number in numbers.split(" "):
        if number.strip() == "":
            continue
        if number.strip() in arr:
            c = c + 1

    for j in range(i + 1, i + c + 1):
        tab[j] += tab[i]

    ansi += tab[i]

print(ansi)
print(anss)
