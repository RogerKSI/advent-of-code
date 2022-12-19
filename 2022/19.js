const { readFileSync } = require('fs');
const { argv, stdout, off } = require('process');
const { range, zip, countNoDup, occurs, array, print, dict, norm, direct4, direct8, ascIntCmp, descIntCmp, ord, printTable, isOrder } = require('../util.js')
const { count, sum, avg, median, min, max, gcd, lcm, Stack } = require('/usr/local/lib/node_modules/mathball')
const PriorityQueue = require('/usr/local/lib/node_modules/js-priority-queue')

let lines = readFileSync(argv[2]).toString().split(/\r?\n/).slice(0, -1);
let list = [];
let changes = [];
let mem = {};
let ansi = 1;
let anss = "";
let maxx = 0;

let target = 32;
let cap = [4, 20, 20];

const dfs = (time, ...state) => {
    if (state[0] > cap[0] || state[1] > cap[1] || state[2] > cap[2] || time > target)
        return;

    for (let i = 4; i < 7; i++) {
        state[i] = Math.min(state[i], cap[i - 4] * (target - time))
    }

    let key = [state[0], state[1], state[2], state[4], state[5], state[6], time].join(",");
    let value = state[7] + state[3] * (target - time)
    if (key in mem && mem[key] >= value) {
        return
    }
    mem[key] = value;
    maxx = Math.max(value, maxx)

    for (let change of changes) {

        let delta = 1;
        let temp = array([8], 0);

        // do the action
        let canDo = true;
        for (let i = 0; i < 8; i++) {
            if (i >= 4 && change[i] < 0) {
                if (change[i] + state[i] < 0) {
                    if (state[i - 4] == 0) {
                        canDo = false;
                        break;
                    }
                    delta = Math.max(delta, 1 + Math.ceil(Math.abs(change[i] + state[i]) / state[i - 4]));
                }
            }
            temp[i] = state[i];
        }
        if (!canDo)
            continue;

        // robot product
        for (let i = 7; i >= 0; i--) {
            if (i >= 4) {
                temp[i] += temp[i - 4] * delta;
            }
            temp[i] += change[i];
        }

        dfs(time + delta, ...temp)
    }
}

lines.forEach((line, idx) => {
    if (idx <= 2) {
        let parts = line.split(": ")[1].split(". ").map((x) => x.split(" "));
        list.push({
            "oreRobot": parseInt(parts[0][4]),
            "claRobot": parseInt(parts[1][4]),
            "obsRobot": [parseInt(parts[2][4]), parseInt(parts[2][7])],
            "geoRobot": [parseInt(parts[3][4]), parseInt(parts[3][7])]
        })
        changes = [];
        mem = {};
        maxx = 0;
        changes.push([1, 0, 0, 0, -1 * list[idx]['oreRobot'], 0, 0, 0])
        changes.push([0, 1, 0, 0, -1 * list[idx]['claRobot'], 0, 0, 0])
        changes.push([0, 0, 1, 0, -1 * list[idx]['obsRobot'][0], -1 * list[idx]['obsRobot'][1], 0, 0])
        changes.push([0, 0, 0, 1, -1 * list[idx]['geoRobot'][0], 0, -1 * list[idx]['geoRobot'][1], 0])

        dfs(0, 1, 0, 0, 0, 0, 0, 0, 0)
        ansi *= maxx
        // console.log(maxx)
        // console.log(ansi)    
    }
});

console.log(ansi);
console.log(anss);
