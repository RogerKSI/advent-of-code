const { readFileSync } = require('fs');
const { argv, stdout, exit } = require('process');
const { range, zip, countNoDup, occurs, array, print, dict, norm, direct4, direct8 } = require('../util.js')
const { count, sum, avg, median, min, max, gcd, lcm, Stack } = require('/usr/local/lib/node_modules/mathball')
const PriorityQueue = require('/usr/local/lib/node_modules/js-priority-queue')

let lines = readFileSync(argv[2]).toString().split(/\r?\n/).slice(0, -1);
let table = array([100, 500], " ");
let ansi = 0;
let anss = "";

let x = 1;
let list = [];

const update = () => {
    let len = list.length;
    table[parseInt(Math.floor(len / 40))][len % 40] = Math.abs((len % 40) - x) <= 1 ? "#" : " "
};

lines.forEach((line, idx) => {
    let parts = line.split(" ")
    update();
    if (parts[0] == "noop") {
        list.push(x)
    } else {
        list.push(x)
        update();
        list.push(x += parseInt(parts[1]))
    }
});

for (let i of range(0, 6)) {
    console.log(table[i].slice(0, 41).join(""))
}

console.log(ansi)
console.log(anss);
