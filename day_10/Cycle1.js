"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function getValue(lines, cycle) {
    var i = 1;
    var j = 0;
    var X = 1;
    while (i <= cycle) {
        var line = lines[j]; //"noop"
        var action = line.slice(0, 4);
        if (action === "noop") {
            i++;
        }
        else if (action === "addx") {
            var value = Number(line.split(" ")[1]); // 3
            for (var round = 1; round <= 2; round++) {
                if (i === cycle + 1) {
                    break;
                }
                if (round === 2) {
                    X += value;
                }
                i++;
            }
        }
        j++;
    }
    return X;
}
// const file = "input_test.txt"; //13360
var file = "input.txt";
var data = fs.readFileSync(file, "utf8");
var lines = data.split("\n");
// const cycle = 180;
// const X = getValue(lines, cycle);
// console.log(X * cycle);
var cycleArray = [20, 60, 100, 140, 180, 220];
var total = cycleArray
    .map(function (cycle) { return getValue(lines, cycle) * cycle; })
    .reduce(function (total, num) { return (total += num); }, 0);
console.log(total);
// 17940
