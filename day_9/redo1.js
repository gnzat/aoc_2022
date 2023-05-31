"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
// need to apply instructions - one at a time
function oneInstruction(direction, data) {
    // const amount = Number(arr[1]); //lets not care about the amount first
    switch (direction) {
        case "U": {
            data.prevHead = data.head;
            data.head = [data.head[0], data.head[1] + 1];
            break;
        }
        case "D": {
            data.prevHead = data.head;
            data.head = [data.head[0], data.head[1] - 1];
            break;
        }
        case "L": {
            data.prevHead = data.head;
            data.head = [data.head[0] - 1, data.head[1]];
            break;
        }
        case "R": {
            data.prevHead = data.head;
            data.head = [data.head[0] + 1, data.head[1]];
            break;
        }
    }
    return data.head;
}
// check if its within the one step radius
function isWithin(tail, head) {
    //create an array of whats within
    var within = [
        [head[0], head[1]],
        [head[0] + 1, head[1]],
        [head[0] - 1, head[1]],
        [head[0], head[1] + 1],
        [head[0], head[1] - 1],
        [head[0] + 1, head[1] + 1],
        [head[0] - 1, head[1] - 1],
        [head[0] + 1, head[1] - 1],
        [head[0] - 1, head[1] + 1],
    ];
    var newArr = within.map(function (coord) { return coord.toString(); });
    var result = newArr.includes(tail.toString());
    return result;
}
var data = {
    head: [0, 0],
    prevHead: [0, 0],
    tail: [0, 0],
    tailMoves: [[0, 0]],
};
//need to adjust tail and update tail movements
function adjust(data) {
    var head = data.head;
    var tail = data.tail;
    //horizontal
    if (tail[0] === head[0]) {
        if (tail[1] - head[1] === 2) {
            data.tail = [tail[0], tail[1] - 1];
        }
        else if (head[1] - tail[1] === 2) {
            data.tail = [tail[0], tail[1] + 1];
        }
    } //vertical
    else if (tail[1] === head[1]) {
        if (tail[0] - head[0] === 2) {
            data.tail = [tail[0] - 1, tail[1]];
        }
        else if (head[0] - tail[0] === 2) {
            data.tail = [tail[0] + 1, tail[1]];
        }
    } //diagonal
    else {
        data.tail = data.prevHead;
    }
    return data.tail;
}
//need to process amount in instructions
function process(data, instructions) {
    var instruction = instructions.split(" ");
    var direction = instruction[0];
    var amount = Number(instruction[1]);
    var arr = [];
    for (var i = 0; i < amount; i++) {
        arr.push(direction);
    } //[R, R, R, R]
    var move = arr.map(function (direction) {
        var newHead = oneInstruction(direction, data);
        var oldTail = data.tail;
        var outcome = isWithin(oldTail, newHead);
        if (!outcome) {
            var newTail = adjust(data);
            data.tailMoves.push(newTail);
        }
    });
    return data;
}
var file = "input.txt";
var lines = fs.readFileSync(file, "utf8").split("\n");
for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
    var line = lines_1[_i];
    process(data, line);
}
var uniqueTails = new Set(data.tailMoves.map(function (coord) { return coord.toString(); })); //need toString() as set can add in same arrays
console.log(uniqueTails.size);
