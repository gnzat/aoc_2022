import * as fs from "fs";

// put them all as constants first and then bring them together
// focus on one step at a time

// need to get record of previous head, tail movements
type Coordinate = [number, number];
type Record = {
  head: Coordinate;
  prevHead: Coordinate;
  tail: Coordinate;
  tailMoves: Coordinate[];
};

// need to apply instructions - one at a time
function oneInstruction(direction: string, data: Record): Coordinate {
  switch (direction) {
    case "U": {
      data.prevHead = data.head;
      data.head = [data.head[0], data.head[1] + 1];
      break;
    }
    case "D": {
      data.prevHead = data.head;
      data.head = [data.head[0], data.head[1] - 1];
      break;
    }
    case "L": {
      data.prevHead = data.head;
      data.head = [data.head[0] - 1, data.head[1]];
      break;
    }
    case "R": {
      data.prevHead = data.head;
      data.head = [data.head[0] + 1, data.head[1]];
      break;
    }
  }

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

const data: Record = {
  head: [0, 0],
  prevHead: [0, 0],
  tail: [0, 0],
  tailMoves: [[0, 0]],
};

//need to adjust tail and update tail movements
function adjust(data: Record): Coordinate {
  const head = data.head;
  const tail = data.tail;
  //horizontal
  if (tail[0] === head[0]) {
    if (tail[1] - head[1] === 2) {
      data.tail = [tail[0], tail[1] - 1];
    } else if (head[1] - tail[1] === 2) {
      data.tail = [tail[0], tail[1] + 1];
    }
  } //vertical
  else if (tail[1] === head[1]) {
    if (tail[0] - head[0] === 2) {
      data.tail = [tail[0] - 1, tail[1]];
    } else if (head[0] - tail[0] === 2) {
      data.tail = [tail[0] + 1, tail[1]];
    }
  } //diagonal
  else {
    data.tail = data.prevHead;
  }

  return data.tail;
}

//need to process amount in instructions
function process(data: Record, instructions: string): Record {
  const instruction = instructions.split(" ");
  const direction = instruction[0];
  const amount = Number(instruction[1]);
  const arr: string[] = [];

  for (let i = 0; i < amount; i++) {
    arr.push(direction);
  } //[R, R, R, R]

  const move = arr.map((direction) => {
    const newHead = oneInstruction(direction, data);
    const oldTail = data.tail;
    const outcome = isWithin(oldTail, newHead);

    if (!outcome) {
      const newTail = adjust(data);
      data.tailMoves.push(newTail);
    }
  });

  return data;
}

const file = "input.txt";
const lines = fs.readFileSync(file, "utf8").split("\n");
for (const line of lines) {
  process(data, line);
}

const uniqueTails = new Set(data.tailMoves.map((coord) => coord.toString())); //need toString() as set can add in same arrays
console.log(uniqueTails.size);
//6057
