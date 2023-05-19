"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function readFile(filename) {
    var data = fs.readFileSync(filename, "utf8");
    var content = data.split("\n");
    console.log(content);
    return content;
}
var arr = readFile("./day_1/input.txt");
// const test = readFile("./day_1/test_input.txt");
// console.log(test.length);
function getTotals(arr) {
    var group = [];
    var i = 0;
    var total = 0;
    while (i < arr.length) {
        if (arr[i] === "") {
            group.push(total);
            // console.log(total);
            total = 0;
        }
        if (arr[i] !== "") {
            var num = Number(arr[i]);
            // console.log(num);
            total += num;
            if (i === arr.length - 1) {
                group.push(total);
            }
        }
        i++;
    }
    return group;
}
var out = getTotals(arr);
// console.log(out);
//to get Max value:
console.log(Math.max.apply(Math, out));
//67027
// get sum of top 3 elfs:
var total2 = 0;
function getTopThree(arr) {
    var i = 0;
    while (i < 3) {
        total2 += Math.max.apply(Math, arr);
        var index = arr.indexOf(Math.max.apply(Math, arr));
        arr.splice(index, 1);
        i++;
    }
    return total2;
}
console.log(getTopThree(out));
