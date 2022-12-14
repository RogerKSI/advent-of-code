from collections import defaultdict
import sys

f = open(sys.argv[1], "r")
lines = [line.strip() for line in f.readlines()]
ansi = 0
anss = ""
dictl = defaultdict(list)
dicti = defaultdict(int)
dicts = defaultdict(str)

for i, line in enumerate(lines):
    parts = [int(x) for x in line.split(",")]

print(ansi)
print(anss)
