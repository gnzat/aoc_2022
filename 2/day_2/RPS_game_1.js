"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function readFile(filename) {
    var data = fs.readFileSync(filename, "utf8");
    var content = data.split("\n");
    //   console.log(data);
    return content;
}
var arr = readFile("./input.txt");
function getRound(round) {
    var oppCh = round[0];
    var myCh = round[2];
    var result = 0;
    var put = 0;
    // console.log(opp_ch);
    // console.log(my_ch);
    if (myCh === "X") {
        put += 1;
    }
    else if (myCh === "Y") {
        put += 2;
    }
    else if (myCh === "Z") {
        put += 3;
    }
    if (myCh === "X" && oppCh === "C") {
        result += 6;
    }
    else if (myCh === "Y" && oppCh === "A") {
        result += 6;
    }
    else if (myCh === "Z" && oppCh === "B") {
        result += 6;
    }
    else if (myCh === "Y" && oppCh === "B") {
        result += 3;
    }
    else if (myCh === "Z" && oppCh === "C") {
        result += 3;
    }
    else if (myCh === "X" && oppCh === "A") {
        result += 3;
    }
    return put + result;
}
var total = 0;
for (var i = 0; i < arr.length; i++) {
    var result = getRound(arr[i]);
    total += result;
}
console.log(total);
// 13005
