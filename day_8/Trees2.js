"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
// const file = "input_test.txt";
var file = "input.txt";
var data = fs.readFileSync(file, "utf8");
var lines = data.split("\n");
var scores = new Set();
for (var row = 0; row < lines.length; row++) {
    if (row === 0 || row === lines.length - 1) {
        continue;
    }
    else {
        //tackle horizontal of target:
        for (var col = 1; col < lines.length - 1; col++) {
            var target = Number(lines[row][col]);
            //settle left side:
            var max_left = 0;
            for (var i = col - 1; i >= 0; i--) {
                var tree = Number(lines[row][i]);
                if (tree < target) {
                    max_left++;
                }
                else {
                    max_left += 1;
                    break;
                }
            }
            //settle right side:
            var max_right = 0;
            for (var i = col + 1; i < lines[row].length; i++) {
                var tree = Number(lines[row][i]);
                if (tree < target) {
                    max_right++;
                }
                else {
                    max_right += 1;
                    break;
                }
            }
            // settle vertical of target:
            //settle top:
            var max_top = 0;
            for (var i = row - 1; i >= 0; i--) {
                var tree = Number(lines[i][col]);
                if (tree < target) {
                    max_top++;
                }
                else {
                    max_top += 1;
                    break;
                }
            }
            //settle bottom:
            var max_bottom = 0;
            for (var i = row + 1; i < lines.length; i++) {
                var tree = Number(lines[i][col]);
                if (tree < target) {
                    max_bottom++;
                }
                else {
                    max_bottom += 1;
                    break;
                }
            }
            //   console.log(target ,": ", max_left);
            var total = max_bottom * max_top * max_right * max_left;
            scores.add(total);
            total = 0;
        }
    }
}
var max = 0;
scores.forEach(function (value) {
    if (max < value) {
        max = value;
    }
});
console.log(max);
// 313200
