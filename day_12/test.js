"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//error
var fs = require("fs");
var file = "input_test.txt";
var lines = fs.readFileSync(file, "utf8").split("\n");
var letters = "abcdefhijklmnopqrstuvwxyz";
var record = [];
var endPos;
var startPos;
// Get start and end coordinates:
for (var line = 0; line < lines.length; line++) {
    for (var ch = 0; ch < lines[line].length; ch++) {
        if (lines[line][ch] === "E") {
            endPos = [ch, line];
        }
        if (lines[line][ch] === "S") {
            startPos = [ch, line];
        }
    }
}
// console.log(startPos!, endPos!);
//function to get surrounding values:
function getValuesAround(currentPos) {
    var _a = [currentPos[0], currentPos[1]], x = _a[0], y = _a[1];
    var compass = [];
    //right, left, top, bottom
    var right = lines[y][x + 1];
    var left = lines[y][x - 1];
    var top = lines[y - 1][x];
    var bottom = lines[y + 1][x];
    //filter out undefined
    // compass.push(right, left, top, bottom);
    // compass.filter((d) => {
    //   if (d !== undefined) {
    //     return d;
    //   }
    // })
    return compass;
}
console.log(getValuesAround(startPos));
// function to move one step at a time - return new coordinate
function movePos(currentPos) {
    var _a = [currentPos[0], currentPos[1]], xValue = _a[0], yValue = _a[1];
    var character = lines[yValue][xValue];
    var index = letters.indexOf(character);
    var compass = getValuesAround(currentPos);
    // const valuesAround = Object.values(getValues(currentPos)).filter((ch) => {
    //     if (letters.indexOf(ch) - 1 === index) {
    //         return ch;
    //     } //for one letter after current
    // });
    var direction;
    var newPos;
    for (var _i = 0, _b = Object.keys(compass); _i < _b.length; _i++) {
        var key = _b[_i];
        var i = letters.indexOf(compass[key]);
        if (i === index + 1) {
            direction = key; //find first one, but how to make it sarch through all in the case of multiplt same letters?
        }
    }
    if (direction != undefined) {
        if (direction === "up") {
            newPos = [xValue, yValue + 1];
        }
        else if (direction === "down") {
            newPos = [xValue, yValue - 1];
        }
        else if (direction === "left") {
            newPos = [xValue - 1, yValue];
        }
        else {
            newPos = [xValue + 1, yValue];
        }
    }
    return newPos;
}
// console.log(movePos(startPos!));
function getSteps(record, startPos, endPos) {
    record.push(startPos);
    var newPos;
    if (startPos[0] === 0 && startPos[1] === 0) {
        var _a = [startPos[0], startPos[1]], xValue = _a[0], yValue = _a[1];
        var compass = getValuesAround(startPos);
        var direction = void 0;
        for (var _i = 0, _b = Object.keys(compass); _i < _b.length; _i++) {
            var key = _b[_i];
            if (compass[key] === "a") {
                direction = key;
            }
            if (direction != undefined) {
                if (direction === "up") {
                    newPos = [xValue, yValue + 1];
                }
                else if (direction === "down") {
                    newPos = [xValue, yValue - 1];
                }
                else if (direction === "left") {
                    newPos = [xValue - 1, yValue];
                }
                else {
                    newPos = [xValue + 1, yValue];
                }
            }
        }
    }
    while (newPos !== endPos) {
        var pos = movePos(newPos);
        record.push(pos);
    }
    return record;
}
// console.log(getSteps(record, startPos!, endPos!));
