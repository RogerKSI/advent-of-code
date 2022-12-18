const { readFileSync } = require('fs');
const { argv, stdout } = require('process');
const { range, zip, countNoDup, occurs, array, print, dict, norm, direct4, direct8, ascIntCmp, descIntCmp, ord, printTable, isOrder } = require('../util.js')
const { count, sum, avg, median, min, max, gcd, lcm, Stack } = require('/usr/local/lib/node_modules/mathball')
const PriorityQueue = require('/usr/local/lib/node_modules/js-priority-queue')

let lines = readFileSync(argv[2]).toString().split(/\r?\n/).slice(0, -1);
let list = [];
let ansi = 0;
let anss = "";

lines.forEach((line, idx) => {
    let parts = line.split("x=").filter((idx, i) => i >= 1).map((x) => x.split(", ")).flat()
    list.push([parseInt(parts[0]), parseInt(parts[1].split(": ")[0].split("y=")[1]), parseInt(parts[2]), parseInt(parts[3].split("y=")[1])])
});

const dist = (a, b, c, d) => {
    return Math.abs(a - c) + Math.abs(b - d);
}

for (let x = 0; x <= 4000000; x++) {
    for (let y = 0; y <= 4000000; y++) {
        let mark = false;
        list.forEach((inp) => {
            let [sx, sy] = [inp[1], inp[0]];
            let [bx, by] = [inp[3], inp[2]];

            let distn = dist(sx, sy, bx, by);
            let distc = dist(sx, sy, x, y);
            if (distc <= distn) {
                y += distn - distc
                mark = true;
            }

        })
        if (mark == false) {
            console.log(x + y * 4000000)
        }
    }
}
console.log(ansi);
console.log(anss);
