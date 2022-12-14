const countNoDup = (str, s) => {
    return str.split(s).length - 1;
};

const occurs = (str) => {
    let dicts = {};
    [...str].forEach((c) => {
        dicts[c] = dicts[c] ?? 0;
        dicts[c]++;
    })
    return dicts;
};

const array = (d, def = 0) => {
    if (d.length > 1) {
        let dim = d[0];
        let rest = d.slice(1);
        let newArray = [];
        for (let i = 0; i < dim; i++) {
            newArray.push(array(rest, def));
        }
        return newArray;
    } else {
        return Array(d[0]).fill(def);
    }
};

const zip = (list1, list2) => {
    if (list1.length <= list2.length) {
        return list1.map((e, i) => [e, list2[i]]);
    } else {
        return list2.map((e, i) => [list1[i], e]);
    }
};

const dict = (list1, list2) => {
    return zip(list1, list2).reduce((m, [k, v]) => {
        m[k] = v;
        return m;
    }, {});
};

const norm = (n) => {
    if (n == 0)
        return 0;
    return n / Math.abs(n);
};

const print = (...inp) => {
    inp.forEach((val) => {
        if (typeof val === 'object' && val != null && !Array.isArray(val)) {
            console.log("aa")
            console.dir(val, { depth: null })
        } else {
            console.log(val)
        }
    })
};

const printTable = (table, suffix = "", n = null, m = null, a = 0, b = 0) => {
    n = n ?? table.length;
    m = m ?? table[0].length;
    for (let i = a; i < n; i++) {
        console.log(table[i].slice(b, m).join(suffix))
    }
}

// inc = inclusive for en
const range = (st, en, step = 1, inc = false) => {
    let extra = inc == true ? 1 : 0;
    if (st < en)
        return Array(Math.ceil((en - st + extra) / step)).fill().map((_, i) => st + step * i);
    else
        return Array(Math.ceil((st - en + extra) / step)).fill().map((_, i) => st + step * i * -1);
};

const isOrder = (...arr) => {
    let order = true;
    for (let i = 0; i < arr.length - 1; i++) {
        if (i == arr.length - 2) {
            order &= arr[i] < arr[i + 1]
        } else {
            order &= arr[i] <= arr[i + 1]
        }
    }
    return order
}

module.exports = {
    countNoDup: countNoDup,
    occurs: occurs,
    array: array,
    zip: zip,
    dict: dict,
    norm: norm,
    print: print,
    printTable: printTable,
    range: range,
    direct4: [[1, 0], [-1, 0], [0, 1], [0, -1]],
    direct8: [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]],
    ascIntCmp: (a, b) => a - b,
    descIntCmp: (a, b) => b - a,
    ord: (c) => c.charCodeAt(0),
    isOrder: isOrder
};
