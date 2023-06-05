"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
// const file = "input_test.txt";
var file = "input.txt";
var data = fs.readFileSync(file, "utf8");
var lines = data.split("\n");
var cd = ["/"];
var sizes = { "/": 0 };
for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
    var line = lines_1[_i];
    var l = line.split(" "); //split line into array
    if (l[0] === "$") {
        //handle paths
        if (l[1] === "cd") {
            if (l[2] === "/") {
                cd = ["/"];
            }
            else if (l[2] === "..") {
                cd.pop();
            }
            else {
                cd.push(l[2]);
            }
        }
        //handle lists:
        if (l[1] === "ls") {
            continue;
        }
    }
    else if (l[0] === "dir") {
        var path = cd.join("") + l[1];
        sizes[path] = 0;
    }
    //if it is a number (file size)
    else if (!isNaN(Number(l[0]))) {
        var path = cd.join("");
        sizes[path] += Number(l[0]);
        //to add file sizes to all directories involved:
        for (var i = 1; i < cd.length; i++) {
            var newCd = cd.slice(0, -i).join("");
            sizes[newCd] += Number(l[0]);
        }
    }
}
// part 1:
// let total: number = 0;
// for (const key of Object.keys(sizes)) {
//     if (sizes[key] <= 100000) {
//         total += sizes[key];
//     }
// }
// console.log(total);
// //2031851
//part 2:
var unused = 70000000 - sizes["/"];
var need = 30000000 - unused;
var min = sizes["/"];
for (var _a = 0, _b = Object.keys(sizes); _a < _b.length; _a++) {
    var key = _b[_a];
    if (sizes[key] >= need && sizes[key] < min) {
        min = sizes[key];
    }
}
console.log(min);
//2568781
