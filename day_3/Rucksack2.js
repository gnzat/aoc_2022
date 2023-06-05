"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function readFile(filename) {
    var data = fs.readFileSync(filename, "utf8");
    var content = data.split("\n");
    return content;
}
function getPriority2(group) {
    var set1 = new Set(group[0]);
    var set2 = new Set(group[1]);
    var set3 = new Set(group[2]);
    var str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var intersection = Array.from(set1).filter(function (char) { return set2.has(char) && set3.has(char); });
    var index = str.indexOf(intersection[0]);
    return index + 1;
}
var arr = readFile("./input.txt");
var total = 0;
var i = 0;
while (i < arr.length - 2) {
    var group = [arr[i], arr[i + 1], arr[i + 2]];
    // console.log(group);
    var result = getPriority2(group);
    total += result;
    i += 3;
}
console.log(total);
// 2689
