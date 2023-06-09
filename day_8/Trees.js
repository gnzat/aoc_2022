"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
// const file = "input_test.txt";
var file = "input.txt";
var data = fs.readFileSync(file, "utf8");
var lines = data.split("\n");
var inner = new Set(); //to avoid double counting, record all the positions of the visible trees
var edge = 0; //perimeter of trees
for (var row = 0; row < lines.length; row++) {
    if (row === 0 || row === lines.length - 1) {
        edge += lines[row].length;
    }
    else {
        edge += 2;
        //tackle horizontal of target:
        for (var col = 1; col < lines[row].length - 1; col++) {
            var x = col;
            var y = row;
            var target = Number(lines[row][col]);
            var position = String(x) + "," + String(y);
            //settle left side:
            var max_left = 0;
            for (var i = 0; i < col; i++) {
                if (Number(lines[row][i]) > max_left) {
                    max_left = Number(lines[row][i]);
                }
            }
            if (max_left < target) {
                inner.add(position);
            }
            //settle right side:
            var max_right = 0;
            for (var i = col + 1; i < lines[row].length; i++) {
                if (Number(lines[row][i]) > max_right) {
                    max_right = Number(lines[row][i]);
                }
            }
            if (max_right < target) {
                inner.add(position);
            }
        }
        // settle vertical of target:
        // row n col switched
        for (var col = 1; col < lines.length - 1; col++) {
            var x = col;
            var y = row;
            var target = Number(lines[col][row]);
            var position = String(y) + "," + String(x);
            //settle top:
            var max_top = 0;
            for (var i = 0; i < col; i++) {
                if (Number(lines[i][row]) > max_top) {
                    max_top = Number(lines[i][row]);
                }
            }
            if (max_top < target) {
                inner.add(position);
            }
            //settle bottom:
            var max_bottom = 0;
            for (var i = col + 1; i < lines.length; i++) {
                if (Number(lines[i][row]) > max_bottom) {
                    max_bottom = Number(lines[i][row]);
                }
            }
            if (max_bottom < target) {
                inner.add(position);
            }
        }
    }
}
var middle = inner.size;
var total = middle + edge;
console.log(total);
// 1676
