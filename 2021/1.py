import sys

f = open(sys.argv[1], "r")

last = None
count = 0
while line := f.readline():
    number = int(line.strip())

    if last is not None:
        if number > last:
            count = count + 1

    last = number

print(count)
