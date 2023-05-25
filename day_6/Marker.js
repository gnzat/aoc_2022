"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
// const file = "input_test.txt";
var file = "input.txt";
var content = fs.readFileSync(file, "utf8");
for (var start = 0; start < content.length - 13; start++) {
    var letters = new Set;
    for (var i = 0; i < 14; i++) {
        letters.add(content[start + i]);
        // console.log(content[start + i]);
        // console.log(letters);
    }
    if (letters.size !== 14) {
        continue;
    }
    else if (letters.size === 14) {
        console.log(start + 14);
        break;
    }
}
//1566
