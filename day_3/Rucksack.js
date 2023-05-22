"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function readFile(filename) {
    var data = fs.readFileSync(filename, "utf8");
    var content = data.split("\n");
    return content;
}
function getPriority(rucksack) {
    var len = rucksack.length;
    var first = rucksack.slice(0, len / 2);
    var last = rucksack.slice(len / 2);
    var str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var index = 0;
    //   let letter: string = "";
    //   console.log(first, last);
    for (var i = 0; i < first.length; i++) {
        for (var x = 0; x < first.length; x++) {
            if (first[i] === last[x]) {
                var index_1 = str.indexOf(first[i]);
                // console.log(index);
                // console.log(first[i]);
                return index_1 + 1;
            }
        }
    }
    return 0;
}
var arr = readFile("./input.txt");
var total = 0;
for (var i = 0; i < arr.length; i++) {
    var result = getPriority(arr[i]);
    total += result;
}
// console.log(line);
console.log(total);
// 8176
