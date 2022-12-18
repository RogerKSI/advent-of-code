const { readFileSync } = require('fs');
const { argv, stdout } = require('process');
const { range, zip, countNoDup, occurs, array, print, dict, norm, direct4, direct8, ascIntCmp, descIntCmp, ord, printTable, isOrder } = require('../util.js')
const { count, sum, avg, median, min, max, gcd, lcm, Stack } = require('/usr/local/lib/node_modules/mathball')
const PriorityQueue = require('/usr/local/lib/node_modules/js-priority-queue')

const set = new Set();
const pq = new PriorityQueue({ initialValues: [], comparator: ascIntCmp });
let lines = readFileSync(argv[2]).toString().split(/\r?\n/).slice(0, -1);
let n = lines.length;

let z = 50;
let table = array([z, z, z], 0);
let ansi = 0;
let anss = "";
let direct = [[0, 0, -1], [0, 0, 1], [0, -1, 0], [0, 1, 0], [-1, 0, 0], [1, 0, 0]];

const bfs = (a, b, c) => {
    let q = [];
    q.push([a, b, c])
    table[a][b][c] = 1;

    let counter = 0;
    while (counter < q.length) {
        let [i, j, k] = q[counter++];
        for (let dir of direct) {
            if (isOrder(0, i + dir[0], z) && isOrder(0, j + dir[1], z) && isOrder(0, k + dir[2], z) && table[i + dir[0]][j + dir[1]][k + dir[2]] == 0) {
                table[i + dir[0]][j + dir[1]][k + dir[2]] = 1
                q.push([i + dir[0], j + dir[1], k + dir[2]])
            }
        }
    }
}

lines.forEach((line, idx) => {
    lines[idx] = line.split(",").map(x => parseInt(x) + 20);
    table[lines[idx][0]][lines[idx][1]][lines[idx][2]] = -1;
});


for (let i = 0; i < z; i++) {
    for (let j = 0; j < z; j++) {
        for (let k = 0; k < z; k++) {
            if ((i == 0 || j == 0 || k == 0 || i == z || j == z || k == z) && table[i][j][k] == 0) {
                bfs(i, j, k);
            }
        }
    }
}

for (let i = 0; i < n; i++) {
    for (let dir of direct) {
        if (table[lines[i][0] + dir[0]][lines[i][1] + dir[1]][lines[i][2] + dir[2]] > 0) {
            ansi++;
        }
    }
}

console.log(ansi);
console.log(anss);
