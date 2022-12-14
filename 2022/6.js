const { readFileSync } = require('fs');
const { argv } = require('process');
const { range, zip, countNoDup, occurs, array, print, dict, norm } = require('../util.js')
const { count, sum, avg, median, min, max, gcd, lcm, Stack } = require('/usr/local/lib/node_modules/mathball')
const PriorityQueue = require('/usr/local/lib/node_modules/js-priority-queue')

let lines = readFileSync(argv[2]).toString().split(/\r?\n/).slice(0, -1);
let ansi = 0;
let anss = "";

lines.forEach((line, idx) => {
    for (let i = 13; i < line.length; i++) {
        if (Object.keys(occurs(line.substring(i - 13, i + 1))).length == 14) {
            console.log(i + 1)
        }
    }
});

console.log(ansi);
console.log(anss);
