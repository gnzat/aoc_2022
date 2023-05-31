import { log } from "console";
import * as fs from "fs";

// const file = "input_test2.txt";
const file = "test2.txt";
// const file = "input.txt";
const data = fs.readFileSync(file, "utf8");
const lines = data.split("\n");
const record = {
  "0,0": 1,
};
let before: number[][] = []; 
const history = {
  "1": "0,0"
}

let temp: number[][] = [];

for (let i = 0; i < 10; i++) {
  temp.push([0, 0]);
}

for (const line of lines) {
  const [direction, amount] = line.split(" ");

  // head:
  for (let i = 1; i <= Number(amount); i++) {
    const head = temp[0];

    if (direction === "R") {
      head[0] += 1;
    } else if (direction === "L") {
      head[0] -= 1;
    } else if (direction === "U") {
      head[1] += 1;
    } else if (direction === "D") {
      head[1] -= 1;
    }

    // console.log(temp[0]);
    // console.log(temp);

    // remaining numbers:
    for (let j = 1; j < 10; j++) {
      // figure out how to get previous value
      let first = temp[j-1];
      let second = temp[j];

      if (!isOne(second, first)) {
        // if one step away horizontally
        if (
          first[0] - second[0] === 2 &&
          first[1] === second[1]
        ) {
          second[0] += 1;
        } else if (
          second[0] - first[0] === 2 &&
          first[1] === second[1]
        ) {
          second[0] -= 1;
        }
        // if one step away vertically
        else if (
          first[1] - second[1] === 2 &&
          first[0] === second[0]
        ) {
          second[1] += 1;
        } else if (
          second[1] - first[1] === 2 &&
          first[0] === second[0]
        ) {
          second[1] -= 1;
        }
        // if away diagonally (can be in any direction)
        else {
          // second = 
          console.log("need previous value");
          continue;
        }
        console.log(temp);
      }

      if (j === 9) {
        const moves = second.join(",");
        // console.log(moves);
        if (!(moves in record)) {
          record[moves] = 1;
        } else if (moves in record) {
          record[moves] += 1;
        }
      }

    }
  }
}


//function to check if tail is one step away - returns T/F
function isOne(tail: number[], head: number[]): Boolean {
  const tail_x = tail[0];
  const tail_y = tail[1];
  const head_x = head[0];
  const head_y = head[1];

  if (head_y === tail_y && head_x === tail_x) {
    return true;
  }
  // check up/down (y-axis):
  else if (
    (Math.abs(head_y - tail_y) === 1 && head_x === tail_x) ||
    (Math.abs(head_y - tail_y) === 0 && head_x === tail_x)
  ) {
    return true;
  }
  // check right/left (x-axis):
  else if (
    (Math.abs(head_x - tail_x) === 1 && head_y === tail_y) ||
    (Math.abs(head_x - tail_x) === 0 && head_y === tail_y)
  ) {
    return true;
  }
  // check diagonal:
  else if (Math.abs(head_x - tail_x) === 1 && Math.abs(head_y - tail_y) === 1) {
    return true;
  }

  return false;
}

//get number of moves:
const number = Object.keys(record).length;
console.log(number);
console.log(record);

//2514
