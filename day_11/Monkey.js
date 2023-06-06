"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var file = "input_test.txt";
// const file = "input.txt";
var lines = fs.readFileSync(file, "utf8").trim().split("\n\n");
var monkeyArr = lines.map(function (monkey) {
    var line = monkey.split("\n");
    var items = line[1].split(": ")[1].split(", ");
    var _a = line[2].split("= ")[1].split(" "), first = _a[0], symbol = _a[1], second = _a[2];
    var divisible = parseInt(line[3].split("by ")[1]);
    var isTrue = parseInt(line[4].split("monkey ")[1]);
    var isFalse = parseInt(line[5].split("monkey ")[1]);
    return {
        items: items,
        first: first,
        symbol: symbol,
        second: second,
        divisible: divisible,
        isTrue: isTrue,
        isFalse: isFalse,
        count: 0,
    };
});
for (var round = 0; round < 20; round++) {
    for (var _i = 0, monkeyArr_1 = monkeyArr; _i < monkeyArr_1.length; _i++) {
        var monkey = monkeyArr_1[_i];
        while (monkey.items.length > 0) {
            //for each item
            var before = parseInt(monkey.first.replace("old", monkey.items[0]));
            var after = parseInt(monkey.second.replace("old", monkey.items[0]));
            var worry = monkey.symbol === "*" ? before * after : before + after;
            var finalWorry = Math.floor(worry / 3);
            var toMonkey = finalWorry % monkey.divisible === 0 ? monkey.isTrue : monkey.isFalse;
            // count number of items inspected in Monkey
            monkey.count++;
            // remove item from monkey and push it to new monkey
            monkey.items.shift();
            monkeyArr[toMonkey].items.push(String(finalWorry));
        }
    }
}
//get highest count in monkeyArr
var countArr = [];
for (var _a = 0, monkeyArr_2 = monkeyArr; _a < monkeyArr_2.length; _a++) {
    var monkey = monkeyArr_2[_a];
    countArr.push(monkey.count);
}
// console.log(countArr);
countArr.sort(function (a, b) { return a - b; }); //ascending order
var max = countArr[countArr.length - 1];
var secondMax = countArr[countArr.length - 2];
console.log(max * secondMax);
//120756
