"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
// const text = "input_test.txt";
var text = "input.txt";
var data = fs.readFileSync(text, "utf8");
var _a = data.split("\n\n"), stacks_data = _a[0], instructions_data = _a[1];
var stacks = stacks_data
    .split("\n")
    .filter(Boolean)
    .map(function (line) {
    return line.includes("[")
        ? Array.from(line.matchAll(/([A-Z]+|\s{4})/g)).map(function (m) { return m[1]; })
        : Array.from(line.matchAll(/(\d+)/g)).map(function (m) { return m[1]; });
});
// console.log(stacks);
// sort into individual crates
var out = [];
for (var i = stacks.length - 2; i >= 0; i--) {
    for (var x = 0; x < stacks[i].length; x++) {
        if (i === stacks.length - 2) {
            var first_arr = [];
            first_arr.push(stacks[i][x]);
            out.push(first_arr);
        }
        else if (stacks[i][x].trim() === "") {
            continue;
        }
        else {
            out[x].push(stacks[i][x]);
        }
    }
}
// console.log(out);
// [ [ 'Z', 'N' ], [ 'M', 'C', 'D' ], [ 'P' ] ]
// handling instructions part
var instructions = instructions_data.split("\n").map(function (line) {
    var _a = Array.from(line.matchAll(/(\d+)/g))
        .map(function (m) { return m[1]; })
        .map(Number), move = _a[0], from = _a[1], to = _a[2];
    return { move: move, from: from - 1, to: to - 1 };
});
// console.log(instructions);
// sorting crates
for (var i = 0; i < instructions.length; i++) {
    var number = instructions[i].move;
    var from = instructions[i].from;
    var to = instructions[i].to;
    //part 1:
    //   for (let count = 1; count <= number; count++) {
    //     out[to].push(String(out[from].pop()));
    //   }
    //part 2:
    //start from index of element we want from crate and sort to to_crate
    for (var n = out[from].length - number; n < out[from].length; n++) {
        out[to].push(String(out[from][n]));
        // console.log(out[from][n]);
    }
    // remove elements from from_crate
    out[from].splice(-number, number);
}
console.log(out);
var result = [];
for (var x = 0; x < out.length; x++) {
    result.push(out[x][out[x].length - 1]);
}
console.log(result.join(""));
//GFTNRBZPF
