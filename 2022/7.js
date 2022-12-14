const { readFileSync } = require('fs');
const { argv } = require('process');
const { range, zip, countNoDup, occurs, array, print, dict, norm } = require('../util.js')
const { count, sum, avg, median, min, max, gcd, lcm, Stack } = require('/usr/local/lib/node_modules/mathball')
const PriorityQueue = require('/usr/local/lib/node_modules/js-priority-queue')

let lines = readFileSync(argv[2]).toString().split(/\r?\n/).slice(0, -1);
let ansi = 0;
let anss = "";

let dirs = {
    "root": {}
}
let current = dirs['root']
let paths = [dirs['root']]

lines.forEach((line, idx) => {
    let parts = line.split(" ")
    if (line[0] == "$") {
        if (parts[1] == "cd") {
            if (parts[2] == "..") {
                paths.pop();
                current = paths[paths.length - 1];
            } else if (parts[2] == "/") {
                paths = [dirs["root"]]
                current = dirs['root']
            } else {
                current[parts[2]] = current[parts[2]] ?? {};
                paths.push(current[parts[2]])
                current = current[parts[2]];
            }
        }
    } else {
        if (parts[0] == "dir") {
            current[parts[1]] = current[parts[1]] ?? {};
        } else {
            current[parts[1]] = current[parts[1]] ?? parseInt(parts[0]);
        }
    }
});

let need = 0;
const cal = (dir) => {
    let sum = 0;
    for (const [key, value] of Object.entries(dir)) {
        if (typeof value === 'object') {
            sum += cal(dir[key])
        }
        else {
            sum += value;
        }
    }
    if (need != 0 && sum >= need) {
        ansi = Math.min(ansi, sum)
    }
    return sum;
}

let now = cal(dirs['root'])
let have = 70000000 - now;
need = 30000000 - have;
ansi = 700000000000
cal(dirs['root'])

console.log(ansi);
console.log(anss);
