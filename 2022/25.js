const { readFileSync } = require('fs');
const { argv, stdout } = require('process');
const { range, zip, countNoDup, occurs, array, print, dict, norm, direct4, direct8, ascIntCmp, descIntCmp, ord, printTable, isOrder, hash } = require('../util.js')
const { count, sum, avg, median, min, max, gcd, lcm, Stack } = require('/usr/local/lib/node_modules/mathball')
const PriorityQueue = require('/usr/local/lib/node_modules/js-priority-queue')
const _ = require('/usr/local/lib/node_modules/lodash')

let lines = readFileSync(argv[2]).toString().split(/\r?\n/).slice(0, -1);
let map = "=-012"

const digit = (c) => {
    return map.indexOf(c) - 2
}

const real = (str) => {
    let base = 1;
    let val = 0;
    for (let i = str.length - 1; i >= 0; i--) {
        val += digit(str[i]) * base
        base *= 5;
    }
    return val;
}

const snaf = (num) => {
    let anss = ""
    while (num) {
        num += 2;
        let v = num % 5;
        anss = map[v] + anss
        num = Math.floor(num / 5);
    }
    return anss
}

let need = 0;
lines.forEach((line, idx) => {
    need += real(line)
});

console.log(need)
console.log(snaf(need));
