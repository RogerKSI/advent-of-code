const { readFileSync } = require('fs');
const { argv } = require('process');
const { range, zip, countNoDup, occurs, array, print, dict, norm } = require('../util.js')
const { count, sum, avg, median, min, max, gcd, lcm, PriorityQueue, Stack } = require('/usr/local/lib/node_modules/mathball')

let direct4 = [[1, 0], [-1, 0], [0, 1], [0, -1]]
let direct8 = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
const set = new Set();
let lines = readFileSync(argv[2]).toString().split(/\r?\n/).slice(0, -1);
let n = lines.length
let marks = array([10], 0)
let lists = array([n, 0], 0)
let tables = array([n, 1, 0], 0)
let ansi = 0;
let anss = "";
let arr = array([32, 32, 10, 10, 2], 0)

for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
        for (let k = 1; k <= 3; k++) {
            marks[i + j + k]++;
        }
    }
}

let [a, b] = lines.map((line) => parseInt(line.split(" ").slice(-1)[0]));
a--;
b--;

arr[0][0][a][b][1] = 1;

for (let i = 0; i < 21; i++) {
    for (let j = 0; j < 21; j++) {
        for (let k = 0; k < 10; k++) {
            for (let l = 0; l < 10; l++) {
                for (let m = 3; m <= 9; m++) {
                    let newp = (k + m) % 10;
                    arr[i + newp + 1][j][newp][l][0] += marks[m] * arr[i][j][k][l][1]

                    newp = (l + m) % 10;
                    arr[i][j + newp + 1][k][newp][1] += marks[m] * arr[i][j][k][l][0]
                }
            }
        }
    }
}

let aa = 0;
let bb = 0;
for (let i = 0; i < 31; i++) {
    for (let j = 0; j < 31; j++) {
        for (let k = 0; k < 10; k++) {
            for (let l = 0; l < 10; l++) {
                if (i >= 21 && j < 21) {
                    aa += arr[i][j][k][l][0];
                } else if (j >= 21 && i < 21) {
                    bb += arr[i][j][k][l][1];
                }
            }
        }
    }
}

console.log(aa > bb ? aa : bb);
console.log(anss);
