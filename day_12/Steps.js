"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var file = "input_test.txt";
// const file = "input.txt";
var lines = fs.readFileSync(file, "utf8").split("\n");
//return new object to avoid side effects between part 1 and part 2
function getInput() {
    var res = {
        // result
        start: { y: 0, x: 0 },
        end: { y: 0, x: 0 },
        grid: [], //number values of each letter
    };
    res.grid = lines.map(function (line, y) {
        return line.split("").map(function (ch, x) {
            if (ch === "S") {
                res.start = { y: y, x: x };
                return 0;
            }
            if (ch === "E") {
                res.end = { y: y, x: x };
                return 25;
            }
            return ch.charCodeAt(0) - "a".charCodeAt(0);
        });
    });
    //   console.log(res);
    return res;
}
//function returns a unique identifier for a point on the grid
function pointToInt(x, y) {
    return y * 1e3 + x; //1e3 = 10 ** 3 = 1000
}
//function gets back coordinates from integer
function intToPoint(int) {
    return {
        y: Math.floor(int / 1e3),
        x: int % 1e3,
    };
}
//gets neighbours with higher or equal elevation as current
function getNeighbours(x, y, grid) {
    var res = [];
    // check if neighbour above is valid and if elevation value is greater than the or equal to current elevation value
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
//iterating over the neighbors, calculating the alternative distance, and updating the distances and previous points if a shorter path is found
function dijkstra(grid, start, end) {
    var dist = {}; //stores the shortest distance from start pt to other pts on the grid
    var prev = {}; //used to keep track of the prev pt that leads to the current pt in the shortest path
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
                console.log(intToPoint(u));
            }
        }
        if (u === pointToInt(end.x, end.y)) {
            return "break";
        }
        queue = queue.filter(function (x) { return x !== u; }); //removes value u from queue
        var point = intToPoint(u); //Coordinate
        var neighbours = getNeighbours(point.x, point.y, grid);
        for (var _a = 0, neighbours_1 = neighbours; _a < neighbours_1.length; _a++) {
            var v = neighbours_1[_a];
            if (queue.includes(v)) {
                //ensures that we only process neighbours that havent been processed yet
                var alt = dist[u] + 1; //calculates the alternative dist by adding 1 to the dist of pt u
                if (alt < dist[v]) {
                    //if alt dist is shorter, we update the dist and prev pt for the neighbour
                    dist[v] = alt; //represents the shortest dist found so far from start pt to neighbour
                    prev[v] = u; //keeps track of the shortest path by storing the previous pt that leads to the neighbor.
                }
            }
        }
    };
    //algorithm iterates until the queue array is empty
    //it selects point "u" with the shortest dist from the "queue"
    //it updates the dist and prev pts for the neighbouring pts of u if the new dist is shorter
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
function part1() {
    var input = getInput();
    var data = dijkstra(input.grid, input.start, input.end);
    var distance = data.dist[pointToInt(input.end.x, input.end.y)];
    console.log(distance);
}
function part2() {
    var input = getInput();
}
part1(); //394
part2();
