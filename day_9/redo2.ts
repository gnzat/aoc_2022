import * as fs from "fs";

type Coordinate = [number, number];
type Record = {
  head: Coordinate;
  knots: Coordinate[];
  tailMoves: Coordinate[];
};

// need to apply instructions - one at a time
// apply to head only
function oneInstruction(direction: string, data: Record): Coordinate {
  switch (direction) {
    case "U": {
      data.head = [data.head[0], data.head[1] + 1];
      break;
    }
    case "D": {
      data.head = [data.head[0], data.head[1] - 1];
      break;
    }
    case "L": {
      data.head = [data.head[0] - 1, data.head[1]];
      break;
    }
    case "R": {
      data.head = [data.head[0] + 1, data.head[1]];
      break;
    }
  }
  data.knots[0] = data.head;
  return data.head;
}

// check if its within the one step radius
function isWithin(tail: Coordinate, head: Coordinate): boolean {
  //create an array of whats within
  const within: Coordinate[] = [
    [head[0], head[1]],
    [head[0] + 1, head[1]],
    [head[0] - 1, head[1]],
    [head[0], head[1] + 1],
    [head[0], head[1] - 1],
    [head[0] + 1, head[1] + 1],
    [head[0] - 1, head[1] - 1],
    [head[0] + 1, head[1] - 1],
    [head[0] - 1, head[1] + 1],
  ];
  const newArr = within.map((coord) => coord.toString());
  const result = newArr.includes(tail.toString());
  return result;
}

const num = 10;
let arr: Coordinate[] = [];
for (let i = 0; i < num; i++) {
  arr.push([0, 0]);
}

const data: Record = {
  head: [0, 0],
  knots: arr,
  tailMoves: [[0, 0]], //refer to knot 9
};

//need to adjust remaining knots - return new knot value
function adjust(tail: Coordinate, head: Coordinate): Coordinate {
  //horizontal
  if (tail[0] === head[0]) {
    if (tail[1] - head[1] === 2) {
      tail = [tail[0], tail[1] - 1];
    } else if (head[1] - tail[1] === 2) {
      tail = [tail[0], tail[1] + 1];
    }
  } //vertical
  else if (tail[1] === head[1]) {
    if (tail[0] - head[0] === 2) {
      tail = [tail[0] - 1, tail[1]];
    } else if (head[0] - tail[0] === 2) {
      tail = [tail[0] + 1, tail[1]];
    }
  } //diagonal
  else if (tail[0] > head[0] && tail[1] > head[1]) {
    tail = [tail[0] - 1, tail[1] - 1];
  } else if (tail[0] > head[0] && tail[1] < head[1]) {
    tail = [tail[0] - 1, tail[1] + 1];
  } else if (tail[0] < head[0] && tail[1] > head[1]) {
    tail = [tail[0] + 1, tail[1] - 1];
  } else if (tail[0] < head[0] && tail[1] < head[1]) {
    tail = [tail[0] + 1, tail[1] + 1];
  }

  return tail;
}

//need to process amount in instructions
function process(
  head: Coordinate,
  knots: Coordinate[],
  instructions: string
): Record {
  const instruction = instructions.split(" ");
  const direction = instruction[0];
  const amount = Number(instruction[1]);
  const arr: string[] = [];
  for (let i = 0; i < amount; i++) {
    arr.push(direction);
  } //[R, R, R, R, R]

  const move = arr.map((direction) => {
    const newHead = oneInstruction(direction, data); //returns new head value & changes head value in data

    for (let i = 1; i < num; i++) {
      //move the rest of the knots
      const oldKnot = data.knots[i];
      const prevKnot = data.knots[i - 1];
      const outcome = isWithin(oldKnot, prevKnot);

      if (!outcome) {
        const newKnot = adjust(oldKnot, prevKnot); //for this adjust returns value but does not add into the actual data set itself
        data.knots[i] = newKnot;

        if (i === 9) {
          data.tailMoves.push(newKnot);
        }
      }
    }
  });

  return data;
}

const file = "input.txt";
const lines = fs.readFileSync(file, "utf8").split("\n");
for (const line of lines) {
  process(data.head, data.knots, line);
}

const uniqueTails = new Set(data.tailMoves.map((coord) => coord.toString())); //need toString() as set can add in same arrays
console.log(uniqueTails.size);
//2154
