"use strict";
//CODE HAS ERROR
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
// const file = "input_test2.txt";
var file = "test2.txt";
var data = fs.readFileSync(file, "utf8");
var lines = data.split("\n");
var record = {
    "0,0": 1,
};
var history = {
    "1": "0,0",
};
// let before: number[][] = [];
var temp = [];
for (var i = 0; i < 10; i++) {
    temp.push([0, 0]);
}
for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
    var line = lines_1[_i];
    var _a = line.split(" "), direction = _a[0], amount = _a[1];
    // head:
    for (var i = 1; i <= Number(amount); i++) {
        var head = temp[0];
        if (direction === "R") {
            head[0] += 1;
        }
        else if (direction === "L") {
            head[0] -= 1;
        }
        else if (direction === "U") {
            head[1] += 1;
        }
        else if (direction === "D") {
            head[1] -= 1;
        }
        // remaining numbers:
        for (var j = 1; j < 10; j++) {
            // figure out how to get previous value
            var first = temp[j - 1];
            var second = temp[j];
            if (!isOne(second, first)) {
                // if one step away horizontally
                if (first[0] - second[0] === 2 && first[1] === second[1]) {
                    second[0] += 1;
                }
                else if (second[0] - first[0] === 2 && first[1] === second[1]) {
                    second[0] -= 1;
                }
                // if one step away vertically
                else if (first[1] - second[1] === 2 && first[0] === second[0]) {
                    second[1] += 1;
                }
                else if (second[1] - first[1] === 2 && first[0] === second[0]) {
                    second[1] -= 1;
                }
                // if away diagonally (can be in any direction)
                else {
                    // second =
                    console.log("need previous value");
                    continue;
                }
                console.log(temp);
            }
            if (j === 9) {
                var moves = second.join(",");
                // console.log(moves);
                if (!(moves in record)) {
                    record[moves] = 1;
                }
                else if (moves in record) {
                    record[moves] += 1;
                }
            }
        }
    }
}
//function to check if tail is one step away - returns T/F
function isOne(tail, head) {
    var tailX = tail[0];
    var tailY = tail[1];
    var headX = head[0];
    var headY = head[1];
    if (headY === tailY && headX === tailX) {
        return true;
    }
    // check up/down (y-axis):
    else if ((Math.abs(headY - tailY) === 1 && headX === tailX) ||
        (Math.abs(headY - tailY) === 0 && headX === tailX)) {
        return true;
    }
    // check right/left (x-axis):
    else if ((Math.abs(headX - tailX) === 1 && headY === tailY) ||
        (Math.abs(headX - tailX) === 0 && headY === tailY)) {
        return true;
    }
    // check diagonal:
    else if (Math.abs(headX - tailX) === 1 && Math.abs(headY - tailY) === 1) {
        return true;
    }
    return false;
}
//get number of moves:
var number = Object.keys(record).length;
console.log(number);
console.log(record);
//2514
