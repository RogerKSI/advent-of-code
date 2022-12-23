const { readFileSync } = require('fs');
const { argv, stdout } = require('process');
const { range, zip, countNoDup, occurs, array, print, dict, norm, direct4, direct8, ascIntCmp, descIntCmp, ord, printTable, isOrder, hash } = require('../util.js')
const { count, sum, avg, median, min, max, gcd, lcm, Stack } = require('/usr/local/lib/node_modules/mathball')
const PriorityQueue = require('/usr/local/lib/node_modules/js-priority-queue')

let lines = readFileSync(argv[2]).toString().split(/\r?\n/).slice(0, -1);
let anss = "";
let seqs = [[[[-1, 0], [-1, 1], [-1, -1]], [-1, 0]],
[[[1, 0], [1, 1], [1, -1]], [1, 0]],
[[[-1, -1], [0, -1], [1, -1]], [0, -1]],
[[[-1, 1], [0, 1], [1, 1]], [0, 1]]
];

let bees = {};
lines.forEach((line, idx) => {
    for (let i = 0; i < line.length; i++) {
        if (line[i] == '#') {
            bees[hash(idx, i)] = 1;
        }
    }
});

for (let round = 0; ; round++) {
    let proposes = {}
    let newbees = {};

    for (let [bee, idx] of Object.entries(bees)) {
        let [x, y] = bee.split(",").map((v) => parseInt(v))

        let found = false
        for (let [dx, dy] of direct8) {
            let [nx, ny] = [x + dx, y + dy]
            if (hash(nx, ny) in bees) {
                found = true;
            }
        }
        if (!found) {
            newbees[hash(x, y)] = 1;
            continue;
        }

        let any = false;
        for (let [seq, goal] of seqs) {
            found = false;
            for (let [dx, dy] of seq) {
                let [nx, ny] = [x + dx, y + dy]
                if (hash(nx, ny) in bees) {
                    found = true;
                }
            }
            if (!found) {
                let key = hash(x + goal[0], y + goal[1]);
                any = true;
                if (key in proposes) {
                    newbees[hash(x, y)] = 1;
                    newbees[proposes[key]] = 1;
                    proposes[key] = -1;
                }
                else
                    proposes[key] = hash(x, y);
                break;
            }
        }
        if (!any) {
            newbees[hash(x, y)] = 1;
        }
    }

    let move = false
    for (let [propose, val] of Object.entries(proposes)) {
        if (val == -1) continue;
        newbees[hash(propose)] = 1;
        move = true;
    }
    if (!move) {
        console.log("no move ", round + 1)
        break;
    }

    bees = newbees;
    seqs = [...seqs.slice(1), seqs[0]];
}

let minx = 1 << 30;
let miny = 1 << 30;
let maxx = -1 * (1 << 30);
let maxy = -1 * (1 << 30);
for (let [key, _] of Object.entries(bees)) {
    let [x, y] = key.split(",").map((v) => parseInt(v))
    minx = Math.min(minx, x)
    miny = Math.min(miny, y)
    maxx = Math.max(maxx, x)
    maxy = Math.max(maxy, y)
}

let area = (maxx - minx + 1) * (maxy - miny + 1)
console.log(area - Object.keys(bees).length);
console.log(anss);
