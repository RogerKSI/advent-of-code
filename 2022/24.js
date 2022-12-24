const { readFileSync } = require('fs');
const { argv, stdout } = require('process');
const { range, zip, countNoDup, occurs, array, print, dict, norm, direct4, direct8, ascIntCmp, descIntCmp, ord, printTable, isOrder, hash } = require('../util.js')
const { count, sum, avg, median, min, max, gcd, lcm, Stack } = require('/usr/local/lib/node_modules/mathball')
const PriorityQueue = require('/usr/local/lib/node_modules/js-priority-queue')
const _ = require('/usr/local/lib/node_modules/lodash')

let lines = readFileSync(argv[2]).toString().split(/\r?\n/).slice(0, -1);
let n = lines.length;
let m = lines[0]?.length;
let monst = [];
let seen = {};

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
            mons[hash(idx, i)].push(">v<^".indexOf(line[i]));
        }
    }
});
monst.push(mons);

let idx = 0;
let q = [];
let start = [0, 1];
let target = [n - 1, m - 2];
q.push([start, 1, 0])

while (idx < q.length) {
    let [[x, y], step, stage] = q[idx++];

    if (_.isEqual([x, y], target)) {
        if (stage == 0) {
            q = [];
            idx = 0;
            stage++;
        } else if (stage == 2) {
            console.log(step - 1)
            break;
        }
    }

    if (_.isEqual([x, y], start)) {
        if (stage == 1) {
            q = [];
            idx = 0;
            stage++;
        }
    }

    if (step >= monst.length) {
        addMonst(step)
    }

    for (let [dx, dy] of [...direct4, [0, 0]]) {
        let [nx, ny] = [x + dx, y + dy]

        if (hash(nx, ny) in monst[step])
            continue

        if (nx < 0 || nx > n - 1 || ny < 0 || ny > m - 1 || lines[nx][ny] == '#')
            continue;

        if (hash(nx, ny, step + 1, stage) in seen)
            continue;
        seen[hash(nx, ny, step + 1, stage)] = 1

        q.push([[nx, ny], step + 1, stage])
    }
}
