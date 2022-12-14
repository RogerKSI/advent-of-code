const { readFileSync } = require('fs');
const { argv, stdout, off, listeners } = require('process');
const { range, zip, countNoDup, occurs, array, print, dict, norm, direct4, direct8, ascIntCmp, descIntCmp, ord, printTable, isOrder } = require('../util.js')
const { count, sum, avg, median, min, max, gcd, lcm, Stack } = require('/usr/local/lib/node_modules/mathball')
const PriorityQueue = require('/usr/local/lib/node_modules/js-priority-queue')

let lines = readFileSync(argv[2]).toString().split(/\r?\n/).slice(0, -1);
let list = [];
let ansi = 0;

const cmp = (a, b) => {
    if (Array.isArray(a) && Array.isArray(b)) {

        for (let i = 0, j = 0; i < a.length; i++, j++) {
            if (j >= b.length)
                return 1;
            let v = cmp(a[i], b[j])
            if (v != 0) return v;
        }

        return a.length == b.length ? 0 : -1;

    } else if (Array.isArray(a) || Array.isArray(b)) {
        return Array.isArray(a) ? cmp(a, [b]) : cmp([a], b);
    } else {
        return a - b;
    }
};

let counter = 0;
let pd = 0;
lines.forEach((line, idx) => {
    if (idx % 3 == 0) {
        pd++;
        let first = eval(lines[idx]);
        let second = eval(lines[idx + 1]);
        list.push([first, ++counter])
        list.push([second, ++counter])

        if (cmp(first, second) <= 0) {
            ansi += pd;
        }
    }

});
console.log(ansi)

list.push([[[2]], -1])
list.push([[[6]], -1])
list.sort((a, b) => cmp(a[0], b[0]) - 1);

list = list.map((a, i) => [...a, i + 1]).filter((a) => a[1] == -1)
console.log(list[0][2] * list[1][2])
