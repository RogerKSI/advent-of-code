const { readFileSync, symlinkSync } = require('fs');
const { argv, stdout } = require('process');
const { range, zip, countNoDup, occurs, array, print, dict, norm, direct4, direct8, ascIntCmp, descIntCmp, ord, printTable, isOrder } = require('../util.js')
const { count, sum, avg, median, min, max, gcd, lcm, Stack } = require('/usr/local/lib/node_modules/mathball')
const PriorityQueue = require('/usr/local/lib/node_modules/js-priority-queue')

let lines = readFileSync(argv[2]).toString().split(/\r?\n/).slice(0, -1);
let table = array([1000, 1000], 0);
let ansi = 0;
let anss = "";

let minx = 0, maxx = 0, miny = 500, maxy = 500;

lines.forEach((line, idx) => {
    let parts = line.split(" -> ").map(x => x.split(",").map(y => parseInt(y)));

    let last = -1;
    parts.forEach((p, idx) => {
        minx = Math.min(minx, p[1]);
        maxx = Math.max(maxx, p[1]);
        miny = Math.min(miny, p[0]);
        maxy = Math.max(maxy, p[0]);

        if (idx != 0) {
            for (let i of range(last[1], p[1], 1, true)) {
                for (let j of range(last[0], p[0], 1, true)) {
                    table[i][j] = 1;
                }
            }
        }

        last = p;
    })
});

for (let i = 0; i < 1000; i++) {
    table[maxx + 2][i] = 1;
}

while (true) {
    let x = 0, y = 500;
    table[x][y] = 2;

    while (true) {
        let mark = false;
        for (let [dx, dy] of [[1, 0], [1, -1], [1, 1]]) {
            let nx = x + dx, ny = y + dy;

            if (table[nx][ny] == 0) {
                table[x][y] = 0;
                table[nx][ny] = 2;
                mark = true;
                x = nx;
                y = ny;

                break;
            }


        }

        if (table[0][500] == 2) {
            console.log(ansi + 1);
            process.exit()
        }

        if (mark == false) {
            break;
        }
    }

    ansi++;
}

console.log(ansi);
console.log(anss);
