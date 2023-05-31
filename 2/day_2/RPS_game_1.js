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
    var opp_ch = round[0];
    var my_ch = round[2];
    var opp_val = "";
    var my_val = "";
    var result = 0;
    var put = 0;
    console.log(opp_ch);
    console.log(my_ch);
    if (my_ch === "X") {
        put += 1;
    }
    else if (my_ch === "Y") {
        put += 2;
    }
    else if (my_ch === "Z") {
        put += 3;
    }
    if (my_ch === "X" && opp_ch === "C") {
        result += 6;
    }
    else if (my_ch === "Y" && opp_ch === "A") {
        result += 6;
    }
    else if (my_ch === "Z" && opp_ch === "B") {
        result += 6;
    }
    else if (my_ch === "Y" && opp_ch === "B") {
        result += 3;
    }
    else if (my_ch === "Z" && opp_ch === "C") {
        result += 3;
    }
    else if (my_ch === "X" && opp_ch === "A") {
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
