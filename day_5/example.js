"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { readFile } from 'node:fs/promises';
var fs = require("fs");
var input = fs.readFileSync('input.txt', 'utf-8');
var _a = input.split('\n\n'), starting = _a[0], operations = _a[1];
var stacks = starting
    .split('\n')
    .map(function (line) {
    return line.includes('[')
        ? Array.from(line.matchAll(/([A-Z]+|\s{3})/g)).map(function (m) { return m[1]; })
        : Array.from(line.matchAll(/(\d+)/g)).map(function (m) { return m[1]; });
});
var startingStacks = stacks.slice(0, -1).reduce(function (acc, curr) { return (curr.forEach(function (box, i) {
    /\S/.test(box) && acc[i].unshift(box);
}),
    acc); }, stacks.slice(-1)[0].map(function (_) { return []; }));
var instructions = operations
    .split('\n')
    .filter(Boolean)
    .map(function (operationString) {
    var _a = Array.from(operationString.matchAll(/(\d+)/g))
        .map(function (m) { return m[1]; })
        .map(Number), toMove = _a[0], from = _a[1], to = _a[2];
    return { toMove: toMove, from: from - 1, to: to - 1 };
});
var part = function (stacks, part) {
    if (part === void 0) { part = 1; }
    var endStacks = JSON.parse(JSON.stringify(stacks));
    instructions.forEach(function (_a) {
        var _b;
        var toMove = _a.toMove, from = _a.from, to = _a.to;
        // console.log({ toMove, from, to });
        var boxes = endStacks[from].splice(-toMove);
        // console.log('moving', boxes, 'from', from + 1, 'to', to + 1);
        (_b = endStacks[to]).push.apply(_b, (part === 1 ? boxes.reverse() : boxes));
        // console.log(endStacks.map((stack) => stack.join('')));
    });
    // console.log(endStacks.map((stack) => stack.join('')));
    return endStacks.map(function (stack) { return stack.slice(-1)[0]; }).join('');
};
console.log(part(startingStacks, 1));
console.log(part(startingStacks, 2));
