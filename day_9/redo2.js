"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
// need to apply instructions - one at a time
// apply to head only
function oneInstruction(direction, data) {
    switch (direction) {
        case "U": {
            data.head = [data.head[0], data.head[1] + 1];
            break;
        }
        case "D": {
            data.head = [data.head[0], data.head[1] - 1];
            break;
        }
        case "L": {
            data.head = [data.head[0] - 1, data.head[1]];
            break;
        }
        case "R": {
            data.head = [data.head[0] + 1, data.head[1]];
            break;
        }
    }
    data.knots[0] = data.head;
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
var num = 10;
var arr = [];
for (var i = 0; i < num; i++) {
    arr.push([0, 0]);
}
var data = {
    head: [0, 0],
    knots: arr,
    tailMoves: [[0, 0]], //refer to knot 9
};
//need to adjust remaining knots - return new knot value
function adjust(tail, head) {
    //horizontal
    if (tail[0] === head[0]) {
        if (tail[1] - head[1] === 2) {
            tail = [tail[0], tail[1] - 1];
        }
        else if (head[1] - tail[1] === 2) {
            tail = [tail[0], tail[1] + 1];
        }
    } //vertical
    else if (tail[1] === head[1]) {
        if (tail[0] - head[0] === 2) {
            tail = [tail[0] - 1, tail[1]];
        }
        else if (head[0] - tail[0] === 2) {
            tail = [tail[0] + 1, tail[1]];
        }
    } //diagonal
    else if (tail[0] > head[0] && tail[1] > head[1]) {
        tail = [tail[0] - 1, tail[1] - 1];
    }
    else if (tail[0] > head[0] && tail[1] < head[1]) {
        tail = [tail[0] - 1, tail[1] + 1];
    }
    else if (tail[0] < head[0] && tail[1] > head[1]) {
        tail = [tail[0] + 1, tail[1] - 1];
    }
    else if (tail[0] < head[0] && tail[1] < head[1]) {
        tail = [tail[0] + 1, tail[1] + 1];
    }
    return tail;
}
//need to process amount in instructions
function process(head, knots, instructions) {
    var instruction = instructions.split(" ");
    var direction = instruction[0];
    var amount = Number(instruction[1]);
    var arr = [];
    for (var i = 0; i < amount; i++) {
        arr.push(direction);
    } //[R, R, R, R, R]
    var move = arr.map(function (direction) {
        var newHead = oneInstruction(direction, data); //returns new head value & changes head value in data
        for (var i = 1; i < num; i++) {
            //move the rest of the knots
            var oldKnot = data.knots[i];
            var prevKnot = data.knots[i - 1];
            var outcome = isWithin(oldKnot, prevKnot);
            if (!outcome) {
                var newKnot = adjust(oldKnot, prevKnot); //for this adjust returns value but does not add into the actual data set itself
                data.knots[i] = newKnot;
                if (i === 9) {
                    data.tailMoves.push(newKnot);
                }
            }
        }
    });
    return data;
}
var file = "input.txt";
var lines = fs.readFileSync(file, "utf8").split("\n");
for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
    var line = lines_1[_i];
    process(data.head, data.knots, line);
}
var uniqueTails = new Set(data.tailMoves.map(function (coord) { return coord.toString(); })); //need toString() as set can add in same arrays
console.log(uniqueTails.size);
//2154
