const { readFileSync } = require('fs');
const { argv } = require('process');
const { range, zip, countNoDup, occurs, array, print } = require('../util.js')
const { count, sum, avg, median, min, max, gcd, lcm, PriorityQueue, Stack } = require('/usr/local/lib/node_modules/mathball')

let lines = readFileSync(argv[2]).toString().split(/\r?\n/).slice(0, -1);
let n = lines.length
let marks = array([n], 0)
let lists = array([n, lines[0].length], 0)
let tables = array([n, 1, 0], 0)
let ansi = 0;
let anss = "";


for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
        let [a, b, c, d] = Array(4).fill(0);

        let maxx = -1
        for (let k = 1; k <= 1000; k++) {
            if (j + k < lines[i].length) {
                maxx = parseInt(lines[i][j + k])
                a++;
                if (parseInt(lines[i][j + k]) >= parseInt(lines[i][j]))
                    break
            } else {
                break
            }
        }

        maxx = -1
        for (let k = 1; k <= 1000; k++) {
            if (j - k >= 0) {
                maxx = parseInt(lines[i][j - k])
                b++;
                if (parseInt(lines[i][j - k]) >= parseInt(lines[i][j]))
                    break
            } else {
                break
            }

        }
        maxx = -1
        for (let k = 1; k <= 1000; k++) {
            if (i + k < lines.length) {
                maxx = parseInt(lines[i + k][j])
                c++;
                if (parseInt(lines[i + k][j]) >= parseInt(lines[i][j]))
                    break
            } else {
                break
            }

        }
        maxx = -1
        for (let k = 1; k <= 1000; k++) {
            if (i - k >= 0) {
                maxx = parseInt(lines[i - k][j])
                d++;
                if (parseInt(lines[i - k][j]) >= parseInt(lines[i][j]))
                    break
            } else {
                break
            }
        }
        // console.log(a * b * c * d, i, j, a, b, c, d)
        ansi = Math.max(ansi, a * b * c * d)
    }
}

// print(lists)
console.log(ansi);
console.log(anss);
