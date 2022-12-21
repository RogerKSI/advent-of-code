const { readFileSync } = require('fs');
const { argv, stdout } = require('process');
const { range, zip, countNoDup, occurs, array, print, dict, norm, direct4, direct8, ascIntCmp, descIntCmp, ord, printTable, isOrder } = require('../util.js')
const { count, sum, avg, median, min, max, gcd, lcm, Stack } = require('/usr/local/lib/node_modules/mathball')
const PriorityQueue = require('/usr/local/lib/node_modules/js-priority-queue')

let lines = readFileSync(argv[2]).toString().split(/\r?\n/).slice(0, -1);
let n = lines.length;
let list = {};
let number = {};

lines.forEach((line, idx) => {
    let parts = line.split(": ");
    if (parts[0] == "humn")
        return;
    if (Number.isNaN(parseInt(parts[1]))) {
        list[parts[0]] = parts[1].split(" ");
        number[parts[0]] = null;
    } else {
        number[parts[0]] = parseInt(parts[1]);
    }
});

for (let i = 0; i < n; i++) {
    for (let [key, value] of Object.entries(list)) {
        if (number[key] == null && key != 'humn') {
            if (number[value[0]] != null && number[value[2]] != null) {
                number[key] = eval(`number['${value[0]}'] ${value[1]} number['${value[2]}']`)
            }
        }
    }
}

let search = "root";
let find = 1;
list['root'][1] = "/"

while (true) {
    if (search == "humn") {
        console.log(find)
        break;
    }
    let k = list[search];

    if (number[k[0]] == null) {
        search = k[0];
        if (k[1] == '+')
            find = find - number[k[2]];
        else if (k[1] == '-')
            find = find + number[k[2]];
        else if (k[1] == '*')
            find = find / number[k[2]];
        else if (k[1] == '/')
            find = find * number[k[2]];
    } else {
        search = k[2];
        if (k[1] == '+')
            find = find - number[k[0]];
        else if (k[1] == '-')
            find = number[k[0]] - find;
        else if (k[1] == '*')
            find = find / number[k[0]];
        else if (k[1] == '/')
            find = number[k[0]] / find;
    }
}

// console.log(number['root']);
// console.log(anss);
