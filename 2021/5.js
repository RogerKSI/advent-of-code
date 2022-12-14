const { readFileSync } = require('fs');
const { argv } = require('process');
const { range, zip, countNoDup, occurs, array } = require('../util.js')
const { count, sum, avg, median, min, max, gcd, lcm, PriorityQueue, Stack } = require('/usr/local/lib/node_modules/mathball')

let lines = readFileSync(argv[2]).toString().split(/\r?\n/).slice(0, -1);
let table = array([2000, 2000], 0)
let ansi = 0;
let anss = "";

lines.forEach((line, idx) => {
    let [col1, row1, col2, row2] = line.split(" -> ").map(x => x.split(",")).flat().map(x => parseInt(x));
    if (col1 == col2) {
        for (let i = Math.min(row1, row2); i <= Math.max(row1, row2); i++) {
            table[i][col1]++;
        }
    } else if (row1 == row2) {
        for (let i = Math.min(col1, col2); i <= Math.max(col1, col2); i++) {
            table[row1][i]++;
        }
    }
    else {
        zip(range(row1, row2, 1, true), range(col1, col2, 1, true)).forEach(([a, b]) => {
            table[a][b]++;
        })
    }
});

for (let i = 0; i < 2000; i++) {
    for (let j = 0; j <= 2000; j++) {
        if (table[i][j] > 1)
            ansi++;
    }
}

console.log(ansi);
console.log(anss);
