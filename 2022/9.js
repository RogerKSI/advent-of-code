const { readFileSync } = require('fs');
const { argv } = require('process');
const { range, zip, countNoDup, occurs, array, print, dict, norm } = require('../util.js')
const { count, sum, avg, median, min, max, gcd, lcm, Stack } = require('/usr/local/lib/node_modules/mathball')
const PriorityQueue = require('/usr/local/lib/node_modules/js-priority-queue')

let direct4 = [[1, 0], [-1, 0], [0, 1], [0, -1]];
let lines = readFileSync(argv[2]).toString().split(/\r?\n/).slice(0, -1);

let px = Array(10).fill(0);
let py = Array(10).fill(0);
const set = new Set();
set.add("0,0")

let mapping = dict([..."RLUD"], direct4);

const movetail = (current, next) => {
    if (Math.abs(px[current] - px[next]) <= 1 && Math.abs(py[current] - py[next]) <= 1) {
        return;
    } else {
        px[next] += norm(px[current] - px[next])
        py[next] += norm(py[current] - py[next])
    }

    if (next == 9) {
        set.add(`${px[next]},${py[next]}`)
    }
}

lines.forEach((line, idx) => {
    let parts = line.split(" ")
    parts[1] = parseInt(parts[1])

    for (let i = 0; i < parts[1]; i++) {
        px[0] += mapping[parts[0]][0];
        py[0] += mapping[parts[0]][1];
        for (let j = 0; j < 9; j++) {
            movetail(j, j + 1)
        }
    }

});

console.log(set.size)
