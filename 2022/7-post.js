const { readFileSync } = require('fs');
const { argv } = require('process');
const { range, zip, countNoDup, occurs, array1d, array2d, array3d, print } = require('../util.js')
const { count, sum, avg, median, min, max, gcd, lcm, PriorityQueue, Stack } = require('/usr/local/lib/node_modules/mathball')

let lines = readFileSync(argv[2]).toString().split(/\r?\n/).slice(0, -1);
let ansi = 0;
let anss = "";

let sizes = {}
let paths = ["root"]

lines.forEach((line, idx) => {
    let parts = line.split(" ")
    if (line[0] == "$") {
        if (parts[1] == "cd") {
            if (parts[2] == "..") {
                paths.pop();
            } else if (parts[2] == "/") {
                paths = ["root"]
            } else {
                paths.push(parts[2])
            }
        }
    } else {
        if (parts[0] != "dir") {
            for (let i = 0; i < paths.length; i++) {
                let path = paths.slice(0, i + 1);
                sizes[path.join("/")] = sizes[path.join("/")] ?? 0
                sizes[path.join("/")] += parseInt(parts[0])
            }
        }
    }
});

let now = sizes['root'];
let have = 70000000 - now;
need = 30000000 - have;
ansi = 700000000000
Object.values(sizes).forEach((size) => {
    if (size >= need)
        ansi = Math.min(ansi, size)
})

console.log(ansi);
console.log(anss);
