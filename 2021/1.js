const { readFileSync } = require('fs')
const { argv } = require('process')

let lines = readFileSync(argv[2]).toString().split(/\r?\n/).slice(0, -1).map((x) => parseInt(x))
let answer = 0

prev = 0
for (const [idx, line] of lines.entries()) {
    if (idx > 2 && lines[idx] > lines[idx - 3])
        answer++
}

console.log(answer)
