"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
// const file = "input_test.txt";
var file = "input.txt";
var lines = fs.readFileSync(file, "utf8").split("\n");
var cycle = 0;
var row = "";
var x = 1;
for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
    var line = lines_1[_i];
    var loops = 0;
    if (line.slice(0, 4) === "noop") {
        loops = 1;
    }
    else {
        loops = 2;
    }
    for (var i = 0; i < loops; i++) {
        var column = cycle % 40; //rows of 40
        // check if x in within sprite (3 pixels)
        if (x - 1 <= column && column <= x + 1) {
            row += "#";
        }
        else {
            row += ".";
        }
        if (column === 39) {
            console.log(row);
            row = ""; //reset row
        }
        cycle++;
        // only add value to x on the 2nd loop
        if (i === 1) {
            x += Number(line.split(" ")[1]);
        }
    }
}
//ZCBAJFJZ
