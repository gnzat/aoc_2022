import * as fs from "fs";

// const file = "input_test.txt";
const file = "input.txt";
const lines = fs.readFileSync(file, "utf8").split("\n");

type Coordinate = { y: number; x: number };
type Grid = number[][];
type Res = {
  start: Coordinate[];
  end: Coordinate;
  grid: Grid;
};

function getInput() {
  const res: Res = {
    // result
    start: [],
    end: { y: 0, x: 0 },
    grid: [], //number values of each letter
  };
  res.grid = lines.map((line, y) => {
    return line.split("").map((ch, x) => {
      if (ch === "a") {
        const coordinate: Coordinate = { y, x };
        res.start.push(coordinate);
        return 0;
      }
      if (ch === "E") {
        res.end = { y, x };
        return 25;
      }
      return ch.charCodeAt(0) - "a".charCodeAt(0);
    });
  });
  return res;
}

function pointToInt(x: number, y: number) {
  return y * 1e3 + x;
}

function intToPoint(int: number) {
  return {
    y: Math.floor(int / 1e3),
    x: int % 1e3,
  };
}

function getNeighbours(x: number, y: number, grid: Grid) {
  const res: number[] = [];
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

function dijkstra(grid: Grid, start: Coordinate, end: Coordinate) {
  const dist = {};
  const prev = {};

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

  while (queue.length) {
    let u!: number; // add non-null assertion operator here, it will not be null or undefined
    for (const current of queue) {
      if (u === undefined || dist[current] < dist[u]) {
        u = current;
      }
    }
    if (u === pointToInt(end.x, end.y)) {
      break;
    }
    queue = queue.filter((x) => x !== u);

    const point = intToPoint(u); 
    const neighbours = getNeighbours(point.x, point.y, grid);
    for (const v of neighbours) {
      if (queue.includes(v)) {
        const alt = dist[u] + 1;
        if (alt < dist[v]) {
          dist[v] = alt;
          prev[v] = u;
        }
      }
    }
  }
  return {
    dist,
    prev,
  };
}

function part2() {
  let distances: number[] = [];
  const input = getInput();

  for (const start of input.start) {
    const data = dijkstra(input.grid, start, input.end);
    const distance = data.dist[pointToInt(input.end.x, input.end.y)];
    if (distance < 394) {
      //from part 1 -> answer is 394
      distances.push(distance);
    }
  }

  distances.sort((a, b) => {
    return a - b;
  });
  const least = distances[0];
  console.log(least);
}

part2();
//388