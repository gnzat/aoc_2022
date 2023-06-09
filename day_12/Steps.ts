//learning round
import * as fs from "fs";

const file = "input_test.txt";
// const file = "input.txt";
const lines = fs.readFileSync(file, "utf8").split("\n");

type Coordinate = { y: number; x: number };
type Grid = number[][];
type Res = {
  start: Coordinate;
  end: Coordinate;
  grid: Grid;
};

//return new object to avoid side effects between part 1 and part 2
function getInput() {
  const res: Res = {
    // result
    start: { y: 0, x: 0 },
    end: { y: 0, x: 0 },
    grid: [], //number values of each letter
  };
  res.grid = lines.map((line, y) => {
    return line.split("").map((ch, x) => {
      if (ch === "S") {
        res.start = { y, x };
        return 0;
      }
      if (ch === "E") {
        res.end = { y, x };
        return 25;
      }
      return ch.charCodeAt(0) - "a".charCodeAt(0);
    });
  });
  //   console.log(res);
  return res;
}

//function returns a unique identifier for a point on the grid
function pointToInt(x: number, y: number) {
  return y * 1e3 + x; //1e3 = 10 ** 3 = 1000
}

//function gets back coordinates from integer
function intToPoint(int: number) {
  return {
    y: Math.floor(int / 1e3),
    x: int % 1e3,
  };
}

//gets neighbours with higher or equal elevation as current
function getNeighbours(x: number, y: number, grid: Grid) {
  const res: number[] = [];
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
function dijkstra(grid: Grid, start: Coordinate, end: Coordinate) {
  const dist = {}; //stores the shortest distance from start pt to other pts on the grid
  const prev = {}; //used to keep track of the prev pt that leads to the current pt in the shortest path
  let queue: number[] = [];
  for (let y = 0; y < grid.length; y++) {
    //rows
    for (let x = 0; x < grid[y].length; x++) {
      //cols
      const id = pointToInt(x, y);
      dist[id] = Infinity;
      queue.push(id); //initialized with all the points on the grid
    }
  }
  dist[pointToInt(start.x, start.y)] = 0;

  //algorithm iterates until the queue array is empty
  //it selects point "u" with the shortest dist from the "queue"
  //it updates the dist and prev pts for the neighbouring pts of u if the new dist is shorter
  while (queue.length) {
    let u!: number; // add non-null assertion operator here, it will not be null or undefined
    for (const current of queue) {
      if (u === undefined || dist[current] < dist[u]) {
        u = current; // go in order of alphabetical order 
        console.log(intToPoint(u));
      }
    }
    if (u === pointToInt(end.x, end.y)) {
      //if it reaches the end pt
      break;
    }
    queue = queue.filter((x) => x !== u); //removes value u from queue

    const point = intToPoint(u); //Coordinate
    const neighbours = getNeighbours(point.x, point.y, grid);
    for (const v of neighbours) {
      if (queue.includes(v)) {
        //ensures that we only process neighbours that havent been processed yet
        const alt = dist[u] + 1; //calculates the alternative dist by adding 1 to the dist of pt u
        if (alt < dist[v]) {
          //if alt dist is shorter, we update the dist and prev pt for the neighbour
          dist[v] = alt; //represents the shortest dist found so far from start pt to neighbour
          prev[v] = u; //keeps track of the shortest path by storing the previous pt that leads to the neighbor.
        }
      }
    }
  }
  return {
    dist, //shortest distances for each point
    prev, //prev pts in the shortest path
  };
}

function part1() {
  const input = getInput();
  const data = dijkstra(input.grid, input.start, input.end);
  const distance = data.dist[pointToInt(input.end.x, input.end.y)];
  console.log(distance);
}

function part2() {
  const input = getInput();
}

part1();//394
part2();
