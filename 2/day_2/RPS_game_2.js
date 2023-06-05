"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function readFile(filename) {
    var data = fs.readFileSync(filename, "utf8");
    var content = data.split("\n");
    //   console.log(data);
    return content;
}
function getScore(round) {
    var oppCh = round[0];
    var outcome = round[2];
    var result = 0;
    if (outcome === "Y") {
        result += 3;
        if (oppCh === "A") {
            result += 1;
        }
        else if (oppCh === "B") {
            result += 2;
        }
        else if (oppCh === "C") {
            result += 3;
        }
    }
    if (outcome === "X") {
        if (oppCh === "A") {
            result += 3;
        }
        else if (oppCh === "B") {
            result += 1;
        }
        else if (oppCh === "C") {
            result += 2;
        }
    }
    if (outcome === "Z") {
        result += 6;
        if (oppCh === "A") {
            result += 2;
        }
        else if (oppCh === "B") {
            result += 3;
        }
        else if (oppCh === "C") {
            result += 1;
        }
    }
    return result;
}
var file = readFile("./input.txt");
var total2 = 0;
for (var i = 0; i < file.length; i++) {
    var result = getScore(file[i]);
    total2 += result;
}
// console.log(file);
console.log(total2);
// 11373
