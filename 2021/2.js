const { readFileSync } = require('fs')
const { argv } = require('process')

let lines = readFileSync(argv[2]).toString().split(/\r?\n/).slice(0, -1)
let ansi = 0
let anss = ""

let x = 0
let aim = 0
for (const [idx, line] of lines.entries()) {
    let parts = line.split(" ")
    if (parts[0] == "forward") {
        ansi += parseInt(parts[1])
        x += parseInt(parts[1]) * aim
    }
    else if (parts[0] == "up")
        aim -= parseInt(parts[1])
    else
        aim += parseInt(parts[1])

}

console.log(ansi * x)
