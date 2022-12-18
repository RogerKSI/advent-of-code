const { readFileSync } = require('fs');
const { argv, stdout } = require('process');
const { range, zip, countNoDup, occurs, array, print, dict, norm, direct4, direct8, ascIntCmp, descIntCmp, ord, printTable, isOrder } = require('../util.js')
const { count, sum, avg, median, min, max, gcd, lcm, Stack } = require('/usr/local/lib/node_modules/mathball')
const PriorityQueue = require('/usr/local/lib/node_modules/js-priority-queue')

const set = new Set();
const pq = new PriorityQueue({ initialValues: [], comparator: ascIntCmp });
let lines = readFileSync(argv[2]).toString().split(/\r?\n/).slice(0, -1);
let height = array([7], -1);
let table = array([500000, 7], 0);
let mem = {};


let blocks = [
    [
        "####"
    ],
    [
        ".#.",
        "###",
        ".#.",
    ],
    [
        "..#",
        "..#",
        "###",
    ],
    [
        "#",
        "#",
        "#",
        "#",
    ],
    [
        "##",
        "##",
    ],
]

let line = lines[0];

const checkCanMove = (rx, ry, lIdx) => {

    if (rx - blocks[lIdx].length + 1 < 0)
        return false;
    if (ry + blocks[lIdx][0].length - 1 > 6)
        return false;

    let canMove = true;
    for (let k = 0; k < blocks[lIdx].length; k++) {
        for (let l = 0; l < blocks[lIdx][k].length; l++) {
            if (table[rx - k][ry + l] != 0 && blocks[lIdx][k][l] == '#') {
                canMove = false;
            }
        }
    }

    return canMove;
}

let legIdx = -1;
let inpIdx = 0;
let maxHeight = -1;
let loopHeight = 0;
let target = 1000000000000

for (let i = 0; i < target; i++) {
    let lIdx = (++legIdx) % 5;
    let y = 2;
    let start = maxHeight + 3 + blocks[lIdx].length

    // check mem if we reach this state before
    // Note: I can't proof if this state is enough but it's correct for my input.
    let key = `${lIdx},${inpIdx},${height.map((h) => start - h).join(",")}`
    if (loopHeight == 0 && key in mem) {
        let diffN = i - mem[key][0];
        let diffH = maxHeight - mem[key][1];
        loopHeight += diffH * Math.floor((target - i) / diffN)
        i += Math.floor((target - i) / diffN) * diffN;
    } else {
        mem[key] = [i, maxHeight]
    }

    for (let x = start; x >= 0;) {

        // move left / right
        let ny = line[inpIdx] == '>' ? y + 1 : y - 1;
        y = checkCanMove(x, ny, lIdx) ? ny : y;
        inpIdx = ++inpIdx % line.length

        // move down
        if (!checkCanMove(x - 1, y, lIdx)) {
            for (let k = 0; k < blocks[lIdx].length; k++) {
                for (let l = 0; l < blocks[lIdx][k].length; l++) {
                    if (blocks[lIdx][k][l] == '#') {
                        height[y + l] = Math.max(height[y + l], x - k);
                        table[x - k][y + l] = 1
                    }
                }
            }

            maxHeight = Math.max(maxHeight, x);
            break
        }

        x--;

    }
}

console.log(loopHeight + maxHeight + 1);
