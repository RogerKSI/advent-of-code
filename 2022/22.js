const { readFileSync, lutimesSync } = require('fs');
const { argv, stdout } = require('process');
const { range, zip, countNoDup, occurs, array, print, dict, norm, direct4, direct8, ascIntCmp, descIntCmp, ord, printTable, isOrder, hash } = require('../util.js')
const { count, sum, avg, median, min, max, gcd, lcm, Stack } = require('/usr/local/lib/node_modules/mathball')
const PriorityQueue = require('/usr/local/lib/node_modules/js-priority-queue')

let lines = readFileSync(argv[2]).toString().split(/\r?\n/).slice(0, -1);
let n = 0;
let m = 0;
let map = {};

let keys = null;
let sx = null;
let sy = null;
let dir = 0;

lines.forEach((line, idx) => {
    if (line == "") {
        keys = "";
    } else if (keys == null) {
        n++;
        m = Math.max(m, line.length);
        for (let i = 0; i < line.length; i++) {
            if (line[i] == "." && sx == null) {
                sx = idx;
                sy = i;
            }

            if (line[i] != " ") {
                map[hash(idx, i)] = line[i];
            }
        }
    } else {
        keys = line.replaceAll("R", " R ").replaceAll("L", " L ").split(" ").filter((x) => x != "").map((x) => (x != "L" && x != "R") ? parseInt(x) : x);
    }
});

let size = n / 4;
// This is hardcode of wrapping. So, it can work with only input format like this.
//   1 2
//   3
// 4 5
// 6
let wrapper = {
    "-1,1,3": (x, y) => [y + 2 * size, -1, 0],
    "-1,2,3": (x, y) => [4 * size, y - 2 * size, 3],
    "4,0,1": (x, y) => [-1, y + 2 * size, 1],
    "2,-1,2": (x, y) => [3 * size - 1 - x, 1 * size - 1, 0],
    "3,-1,2": (x, y) => [-1, x - 2 * size, 1],
    "0,3,0": (x, y) => [3 * size - 1 - x, 2 * size, 2],
    "0,0,2": (x, y) => [3 * size - 1 - x, - 1, 0],
    "1,0,2": (x, y) => [2 * size - 1, x - size, 1],
    "1,0,3": (x, y) => [size + y, size - 1, 0],
    "1,2,1": (x, y) => [y - size, 2 * size, 2],
    "1,2,0": (x, y) => [size, size + x, 3],
    "2,2,0": (x, y) => [3 * size - 1 - x, 3 * size, 2],
    "3,1,1": (x, y) => [2 * size + y, size, 2],
    "3,1,0": (x, y) => [3 * size, x - 2 * size, 3],
}

for (let key of keys) {
    if (key == "R") {
        dir = (dir + 1 + direct4.length) % direct4.length;
    } else if (key == "L") {
        dir = (dir - 1 + direct4.length) % direct4.length;
    } else {
        let nx = sx;
        let ny = sy;
        let ndir = dir;
        for (let i = 0; i < key; i++) {
            nx = nx + direct4[ndir][0];
            ny = ny + direct4[ndir][1];
            if (hash(nx, ny) in map) {
                if (map[hash(nx, ny)] == '.') {
                    sx = nx;
                    sy = ny;
                    dir = ndir;
                } else if (map[hash(nx, ny)] == '#') {
                    break;
                }
            } else {
                let regX = Math.floor(nx / size);
                let regY = Math.floor(ny / size);
                [nx, ny, ndir] = wrapper[hash(regX, regY, ndir)](nx, ny);
                i--;
            }
        }
    }
}

// console.log(sx, sy, dir)
console.log((sx + 1) * 1000 + (sy + 1) * 4 + dir)

