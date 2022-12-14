const { readFileSync } = require('fs');
const { argv } = require('process');
const { zip, countNoDup, occurs, array } = require('../util.js')
const { count, sum, avg, median, min, max, gcd, lcm, PriorityQueue, Stack } = require('/usr/local/lib/node_modules/mathball')

let lines = readFileSync(argv[2]).toString().split(/\r?\n/).slice(0, -1);
let ansi = 0;
let anss = "";

let n = Math.floor((lines.length - 1) / 6)
let numbers = lines[0].split(",").flat().map(x => parseInt(x));
let marks = Array(n).fill().map((_) => Array(25).fill(0))
let wins = Array(n).fill(0)
let tables = Array(n).fill([])

lines.forEach((line, idx) => {
    let parts = line.split(" ").flat().filter(x => x != "").map(x => parseInt(x));
    if (idx > 1) {
        let boardIdx = Math.floor((idx - 2) / 6);
        tables[boardIdx] = tables[boardIdx].concat(parts)
    }
});

const check = (mark) => {
    for (let i = 0; i < 5; i++) {
        if (sum([...Array(5).keys()].map((j) => {
            return mark[i * 5 + j]
        })) == 5)
            return true

        if (sum([...Array(5).keys()].map((j) => {
            return mark[j * 5 + i]
        })) == 5)
            return true
    }
}

const rest = (table, mark) => {
    return zip(mark, table).reduce((total, [m, val]) => {
        return total + (m == 0 ? val : 0)
    }, 0)
}

numbers.forEach((number) => {
    tables.forEach((table, i) => {
        if (wins[i] == 0) {
            let pos = table.indexOf(number)
            if (pos != -1) {
                marks[i][pos] = 1
            }
            if (check(marks[i])) {
                console.log(number * rest(tables[i], marks[i]))
                wins[i] = 1
            }
        }
    })
})
