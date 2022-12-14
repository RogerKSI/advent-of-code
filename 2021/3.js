const { readFileSync } = require('fs')
const { argv } = require('process')
const { count, occurs } = require('../util.js')

let lines = readFileSync(argv[2]).toString().split(/\r?\n/).slice(0, -1)
let ansi = 0
let anss = ""

let len = lines[0].length

const erode = (lists, index, mo1, mo2) => {
    let map = occurs([...(lists.map((line, j) => {
        return line[index];
    }))]);

    if (map["1"] >= lists.length / 2) {
        lists = lists.length > 1 ? lists.filter((s) => s[index] == mo1) : lists;
    }
    else {
        lists = lists.length > 1 ? lists.filter((s) => s[index] == mo2) : lists;
    }
    return lists
}

first = lines
second = lines
for (let i = 0; i < len; i++) {

    first = erode(first, i, "1", "0")
    second = erode(second, i, "0", "1")
}

console.log(parseInt(second[0], 2) * parseInt(first[0], 2))
