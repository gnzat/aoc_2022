"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function readFile(file) {
    var data = fs.readFileSync(file, "utf8");
    var content = data.split("\n");
    return content;
}
function overlap(line) {
    var index = line.indexOf(",");
    var first = line.slice(0, index);
    var second = line.slice(index + 1);
    var arr1 = first.split("-");
    var arr2 = second.split("-");
    var a1 = Number(arr1[0]);
    var b1 = Number(arr1[1]);
    var a2 = Number(arr2[0]);
    var b2 = Number(arr2[1]);
    if (a1 >= a2 && b1 <= b2 && a1 <= b2 && b1 >= a2) {
        return true;
    }
    else if (a2 >= a1 && b2 <= b1 && a2 <= b1 && b2 >= a1) {
        return true;
    }
    else if ((a1 < a2 && b1 >= a2) || (a2 < a1 && b2 >= a1)) {
        return true;
    }
    return false;
}
// const arr = readFile("input_test.txt");
var arr = readFile("input.txt");
var total = 0;
for (var i = 0; i < arr.length; i++) {
    if (overlap(arr[i])) {
        total += 1;
    }
}
console.log(total);
// 794
