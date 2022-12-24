const { readFileSync } = require('fs');
const { argv, stdout } = require('process');
const { range, zip, countNoDup, occurs, array, print, dict, norm, direct4, direct8, ascIntCmp, descIntCmp, ord, printTable, isOrder, hash } = require('../util.js')
const { count, sum, avg, median, min, max, gcd, lcm, Stack } = require('/usr/local/lib/node_modules/mathball')
const PriorityQueue = require('/usr/local/lib/node_modules/js-priority-queue')

let lines = readFileSync(argv[2]).toString().split(/\r?\n/).slice(0, -1);
let n = lines.length;
let m = lines[0]?.length;
let monst = [];
let seen = {};

let map = {
    ">": 0,
    "v": 1,
    "<": 2,
    "^": 3,
}

const addMonst = (step) => {
    let nmons = {};
    for (let [mon, dirs] of Object.entries(monst[step - 1])) {
        for (let dir of dirs) {
            let [nx, ny] = mon.split(",").map((v) => parseInt(v))
            nx = ((nx + direct4[dir][0] + n - 3) % (n - 2)) + 1
            ny = ((ny + direct4[dir][1] + m - 3) % (m - 2)) + 1
            nmons[hash(nx, ny)] = nmons[hash(nx, ny)] ?? [];
            nmons[hash(nx, ny)].push(dir)
        }
    }
    monst.push(nmons)
}

let mons = {};
lines.forEach((line, idx) => {
    for (let i = 0; i < line.length; i++) {
        if (line[i] != "." && line[i] != "#") {
            mons[hash(idx, i)] = mons[hash(idx, i)] ?? [];
            mons[hash(idx, i)].push(map[line[i]]);
        }
    }
});
monst.push(mons);

let idx = 0;
let q = [];
q.push({
    "pos": [0, 1],
    "step": 1
})

let enfirst = true;
let stfirst = true;
while (idx < q.length) {
    let top = q[idx++];
    let [x, y] = top['pos'];

    if (x == n - 1 && y == m - 2) {
        if (enfirst) {
            q = [];
            idx = 0;
            enfirst = false;
        } else if (!stfirst) {
            console.log(top['step'] - 1)
            break;
        }
    }

    if (x == 0 && y == 1) {
        if (enfirst == false && stfirst) {
            q = [];
            idx = 0;
            stfirst = false
        }
    }

    if (top['step'] >= monst.length) {
        addMonst(top['step'])
    }

    for (let [dx, dy] of [...direct4, [0, 0]]) {
        let [nx, ny] = [x + dx, y + dy]

        if (hash(nx, ny) in monst[top['step']])
            continue

        if (nx < 0 || nx > n - 1 || ny < 0 || ny > m - 1 || lines[nx][ny] == '#')
            continue;

        if (hash(nx, ny, top['step'] + 1) in seen)
            continue;
        seen[hash(nx, ny, top['step'] + 1)] = 1

        q.push({
            "pos": [nx, ny],
            "step": top['step'] + 1
        })
    }
}
