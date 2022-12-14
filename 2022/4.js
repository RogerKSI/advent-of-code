const { readFileSync } = require('fs')
const { argv } = require('process')

let lines = readFileSync(argv[2]).toString().split(/\r?\n/).slice(0, -1)
let answer = 0

for (const [idx, line] of lines.entries()) {
    let [a, b, c, d] = line.split(",").map((x) => x.split("-")).flat().map(x => parseInt(x))

    if ((b >= c && a <= d) || (d >= a && c <= b))
        answer++
}

console.log(answer)
