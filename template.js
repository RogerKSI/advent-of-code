const { readFileSync } = require('fs');
const { argv, stdout } = require('process');
const { range, zip, countNoDup, occurs, array, print, dict, norm, direct4, direct8, ascIntCmp, descIntCmp, ord, printTable, isOrder } = require('../util.js')
const { count, sum, avg, median, min, max, gcd, lcm, Stack } = require('/usr/local/lib/node_modules/mathball')
const PriorityQueue = require('/usr/local/lib/node_modules/js-priority-queue')

const set = new Set();
const pq = new PriorityQueue({ initialValues: [], comparator: ascIntCmp });
let lines = readFileSync(argv[2]).toString().split(/\r?\n/).slice(0, -1);
let n = lines.length;
let m = lines[0]?.length;
let list = [];
let visit = array([n], 0);
let table = array([n, m], 0);
let ansi = 0;
let anss = "";

lines.forEach((line, idx) => {
    let parts = line.split(",").flat().map(x => parseInt(x));

});

console.log(ansi);
console.log(anss);
