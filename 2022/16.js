const { readFileSync } = require('fs');
const { argv, stdout } = require('process');
const { range, zip, countNoDup, occurs, array, print, dict, norm, direct4, direct8, ascIntCmp, descIntCmp, ord, printTable, isOrder } = require('../util.js')
const { count, sum, avg, median, min, max, gcd, lcm, Stack } = require('/usr/local/lib/node_modules/mathball')
const PriorityQueue = require('/usr/local/lib/node_modules/js-priority-queue')

const set = new Set();
const pq = new PriorityQueue({ initialValues: [], comparator: ascIntCmp });
let lines = readFileSync(argv[2]).toString().split(/\r?\n/).slice(0, -1);
let list = {};
let visit = {};
let table = {};
let maxx = {};
let ansi = 0;
let anss = "";

let len = 27;

const dfs = (posa, timea, suma) => {

    let state = Object.entries(visit).filter(([k, v]) => list[k]['rate'] != 0).map((x) => x[1]).join(",")
    let key = `${posa},${timea},${state}`;
    maxx[key] = maxx[key] ?? 0;
    if (suma < maxx[key]) {
        return;
    }
    maxx[key] = suma;

    if (timea > len)
        return

    if (timea == len) {
        // ansi = Math.max(ansi, suma);
        return;
    }

    dfs(posa, timea + (len - timea), suma)

    for (let i = 0; i < list[posa]['real'].length; i++) {
        if (visit[list[posa]['real'][i][0]] == 0) {
            visit[list[posa]['real'][i][0]] = 1;
            dfs(list[posa]['real'][i][0], timea + list[posa]['real'][i][1] + 1, suma + (len - (timea + list[posa]['real'][i][1] + 1)) * list[[list[posa]['real'][i][0]]]['rate'])
            visit[list[posa]['real'][i][0]] = 0;
        }
    }
}

lines.forEach((line, idx) => {
    let parts = line.split("; ");
    let label = parts[0].split(" ")[1];

    list[label] = {
        "rate": parseInt(parts[0].split("=")[1]),
        "edge": parts[1].split("valve")[1].slice(1).trim().split(", "),
        "real": []
    }

    table[label] = table[label] ?? {};
    for (let e of list[label]['edge']) {
        table[label][e] = 1;
    }

    visit[label] = 0;
});

let nodes = Object.keys(list);
for (let i of nodes) {
    for (let j of nodes) {
        table[i][j] = table[i][j] ?? 0;
    }
}

for (let k of nodes) {
    for (let i of nodes) {
        for (let j of nodes) {
            if (i != j && j != k && table[i][k] != 0 && table[k][j] != 0 && (table[i][k] + table[k][j] < table[i][j] || table[i][j] == 0)) {
                table[i][j] = table[i][k] + table[k][j]
            }
        }
    }
}

for (let i of nodes) {
    for (let j of nodes) {
        if (table[i][j] > 0 && list[j]['rate'] != 0) {
            list[i]['real'] = list[i]['real'] ?? [];
            list[i]['real'].push([j, table[i][j]]);
        }
    }
}

dfs("AA", 1, 0);

let neww = {}
Object.entries(maxx).filter(([k, v]) => {
    let [, time,] = k.split(",");
    return time == len
}).forEach(([k, v]) => {
    let [, , ...state] = k.split(",");
    let statekey = parseInt(state.join(""), 2)
    neww[statekey] = neww[statekey] ?? 0;
    neww[statekey] = Math.max(neww[statekey], v);
})

for (let [ka, va] of Object.entries(neww)) {
    for (let [kb, vb] of Object.entries(neww)) {
        if ((ka & kb) == 0) {
            // console.log(ka, va, kb, vb)
            ansi = Math.max(ansi, va + vb);
        }
    }
}
console.log(ansi);
console.log(anss);
