import sys

f = open(sys.argv[1], "r")
answer = None

list = []
max = 0
keep = 0
while line := f.readline():
    line = line.strip()
    if line == "":
        list.append(keep)
        keep = 0
    else:
        keep += int(line)

list.append(keep)
slist = sorted(list)

print(sum(slist[-3:]))
