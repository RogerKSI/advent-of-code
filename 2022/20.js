const { readFileSync } = require('fs');
const { argv, stdout } = require('process');
const { range, zip, countNoDup, occurs, array, print, dict, norm, direct4, direct8, ascIntCmp, descIntCmp, ord, printTable, isOrder } = require('../util.js')
const { count, sum, avg, median, min, max, gcd, lcm, Stack } = require('/usr/local/lib/node_modules/mathball')
const PriorityQueue = require('/usr/local/lib/node_modules/js-priority-queue')

let lines = readFileSync(argv[2]).toString().split(/\r?\n/).slice(0, -1);
let n = lines.length;
let arr = [];
let anss = "";

lines.forEach((line, idx) => {
    lines[idx] = parseInt(lines[idx])
    arr.push([(lines[idx] * 811589153), idx]);
});

for (let round = 1; round <= 10; round++) {
    for (let i = 0; i < n; i++) {

        let p = -1;
        for (let j = 0; j < arr.length; j++) {
            if (arr[j][1] == i) {
                p = j;
            }
        }

        let num = arr[p][0] % (n - 1);
        let temp = [...arr.slice(p + 1), ...arr.slice(0, p)]
        arr = [...temp.slice(0, num), arr[p], ...temp.slice(num)]
    }
}

let pos = -1;
for (let i = 0; i < n; i++) {
    if (arr[i][0] == 0) {
        pos = i;
    }
}

console.log(arr[(pos + 1000) % n][0] + arr[(pos + 2000) % n][0] + arr[(pos + 3000) % n][0]);
console.log(anss);
