const { readFileSync } = require('fs');
const { argv, stdout } = require('process');
const { range, zip, countNoDup, occurs, array, print, dict, norm, direct4, direct8, ascIntCmp, descIntCmp } = require('../util.js')
const { count, sum, avg, median, min, max, gcd, lcm, Stack } = require('/usr/local/lib/node_modules/mathball')
const PriorityQueue = require('/usr/local/lib/node_modules/js-priority-queue')

let lines = readFileSync(argv[2]).toString().split(/\r?\n/).slice(0, -1);
let n = (lines.length + 1) / 7;
let monkeys = array([n], {});
let anss = "";
let moder = 1;

for (let s of range(0, lines.length, 7)) {
    let id = lines[s].split(" ")[1].split(":")[0]
    monkeys[id] = {
        "items": lines[s + 1].split(": ")[1].split(", ").map(x => parseInt(x)),
        "formula": eval(`(old) => ${lines[s + 2].split(" = ")[1]}`),
        "cond": range(3, 6).map(a => parseInt(lines[s + a].split(" ").at(-1))),
        "count": 0
    }
    moder = lcm([moder, parseInt(lines[s + 3].split(" by ")[1])])
}

for (let i of range(0, 10000)) {
    for (let monkey of monkeys) {
        for (let worry of monkey['items']) {
            monkey['count']++;
            let news = monkey['formula'](worry);
            news = Math.floor(news) % moder;
            if (news % monkey['cond'][0] == 0) {
                monkeys[monkey['cond'][1]]['items'].push(news);
            } else {
                monkeys[monkey['cond'][2]]['items'].push(news);
            }
        }
        monkey['items'] = [];
    }
}

let ans = monkeys.map(x => x['count']).sort(descIntCmp);
console.log(ans[0] * ans[1]);
console.log(anss);
