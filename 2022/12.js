const { readFileSync } = require('fs');
const { argv, stdout } = require('process');
const { range, zip, countNoDup, occurs, array, print, dict, norm, direct4, direct8, ascIntCmp, descIntCmp, ord, printTable, isOrder } = require('../util.js')
const { count, sum, avg, median, min, max, gcd, lcm, Stack } = require('/usr/local/lib/node_modules/mathball')
const PriorityQueue = require('/usr/local/lib/node_modules/js-priority-queue')

let lines = readFileSync(argv[2]).toString().split(/\r?\n/).slice(0, -1);
let n = lines.length;
let m = lines[0]?.length;
let list = [];
let table = array([n, m], 0);
let ansi = 0;
let anss = "";

lines.forEach((line, idx) => {
    [...line].forEach((c, idx2) => {
        if (c == 'S' || c == 'a') {
            list.push([idx, idx2, 1])
            table[idx][idx2] = 1
        }
    })
});

let current = 0;
while (current < list.length) {
    let [a, b, c] = list[current];
    if (lines[a][b] == 'E') {
        ansi = c - 1;
        break;
    }

    direct4.forEach(([x, y]) => {
        let nx = a + x, ny = b + y;
        if (isOrder(0, nx, lines.length) && isOrder(0, ny, lines[nx].length) && table[nx][ny] == 0) {
            let v = lines[nx][ny] == "E" ? ord("z") : ord(lines[nx][ny]);
            v -= lines[a][b] == "S" ? ord("a") : ord(lines[a][b]);

            if (v <= 1) {
                table[nx][ny] = c + 1;
                list.push([nx, ny, c + 1]);
            }
        }
    })

    current++;
}

console.log(ansi);
console.log(anss);
