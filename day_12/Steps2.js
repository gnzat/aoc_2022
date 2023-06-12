"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
// const file = "input_test.txt";
var file = "input.txt";
var lines = fs.readFileSync(file, "utf8").split("\n");
function getInput() {
    var res = {
        // result
        start: [],
        end: { y: 0, x: 0 },
        grid: [], //number values of each letter
    };
    res.grid = lines.map(function (line, y) {
        return line.split("").map(function (ch, x) {
            if (ch === "a") {
                var coordinate = { y: y, x: x };
                res.start.push(coordinate);
                return 0;
            }
            if (ch === "E") {
                res.end = { y: y, x: x };
                return 25;
            }
            return ch.charCodeAt(0) - "a".charCodeAt(0);
        });
    });
    return res;
}
function pointToInt(x, y) {
    return y * 1e3 + x;
}
function intToPoint(int) {
    return {
        y: Math.floor(int / 1e3),
        x: int % 1e3,
    };
}
function getNeighbours(x, y, grid) {
    var res = [];
    if (y + 1 < grid.length && grid[y + 1][x] <= grid[y][x] + 1) {
        res.push(pointToInt(x, y + 1));
    }
    if (y - 1 >= 0 && grid[y - 1][x] <= grid[y][x] + 1) {
        res.push(pointToInt(x, y - 1));
    }
    if (x + 1 < grid[y].length && grid[y][x + 1] <= grid[y][x] + 1) {
        res.push(pointToInt(x + 1, y));
    }
    if (x - 1 >= 0 && grid[y][x - 1] <= grid[y][x] + 1) {
        res.push(pointToInt(x - 1, y));
    }
    return res;
}
function dijkstra(grid, start, end) {
    var dist = {};
    var prev = {};
    var queue = [];
    for (var y = 0; y < grid.length; y++) {
        //rows
        for (var x = 0; x < grid[y].length; x++) {
            //cols
            var id = pointToInt(x, y);
            dist[id] = Infinity;
            queue.push(id); //initialized with all the points on the grid
        }
    }
    dist[pointToInt(start.x, start.y)] = 0;
    var _loop_1 = function () {
        var u; // add non-null assertion operator here, it will not be null or undefined
        for (var _i = 0, queue_1 = queue; _i < queue_1.length; _i++) {
            var current = queue_1[_i];
            if (u === undefined || dist[current] < dist[u]) {
                u = current;
            }
        }
        if (u === pointToInt(end.x, end.y)) {
            return "break";
        }
        queue = queue.filter(function (x) { return x !== u; });
        var point = intToPoint(u);
        var neighbours = getNeighbours(point.x, point.y, grid);
        for (var _a = 0, neighbours_1 = neighbours; _a < neighbours_1.length; _a++) {
            var v = neighbours_1[_a];
            if (queue.includes(v)) {
                var alt = dist[u] + 1;
                if (alt < dist[v]) {
                    dist[v] = alt;
                    prev[v] = u;
                }
            }
        }
    };
    while (queue.length) {
        var state_1 = _loop_1();
        if (state_1 === "break")
            break;
    }
    return {
        dist: dist,
        prev: prev,
    };
}
function part2() {
    var distances = [];
    var input = getInput();
    for (var _i = 0, _a = input.start; _i < _a.length; _i++) {
        var start = _a[_i];
        var data = dijkstra(input.grid, start, input.end);
        var distance = data.dist[pointToInt(input.end.x, input.end.y)];
        if (distance < 394) {
            //from part 1 -> answer is 394
            distances.push(distance);
        }
    }
    distances.sort(function (a, b) {
        return a - b;
    });
    var least = distances[0];
    console.log(least);
}
part2();
//388
