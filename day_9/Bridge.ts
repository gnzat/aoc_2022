import * as fs from "fs";

// const file = "input_test.txt";
const file = "input.txt";
const data = fs.readFileSync(file, "utf8");
const lines = data.split("\n");
const record = {
  "0,0": 1,
};
let head = [0, 0]; //(x, y)
let tail = [0, 0];
let headArr: number[][] = [[0, 0]];

for (const line of lines) {
  const arr = line.split(" ");
  const direction = arr[0];
  const amount = Number(arr[1]);

  // head:
  for (let i = 1; i <= amount; i++) {
    if (direction === "R") {
      head[0] += 1;
    } else if (direction === "L") {
      head[0] -= 1;
    } else if (direction === "U") {
      head[1] += 1;
    } else if (direction === "D") {
      head[1] -= 1;
    }

    const temp = [head[0], head[1]];
    headArr.push(temp); //to record head movements to get previous head input

    // tail - check if its one step apart & continue with the necessary steps:
    if (isOne(tail, head)) {
      continue;
    } else if (!isOne(tail, head)) {
      // if one step away horizontally
      if (head[0] - tail[0] === 2 && head[1] === tail[1]) {
        tail[0] += 1;
      } else if (tail[0] - head[0] === 2 && head[1] === tail[1]) {
        tail[0] -= 1;
      }
      // if one step away vertically
      else if (head[1] - tail[1] === 2 && head[0] === tail[0]) {
        tail[1] += 1;
      } else if (tail[1] - head[1] === 2 && head[0] === tail[0]) {
        tail[1] -= 1;
      }
      // if away diagonally (can be in any direction)
      else {
        tail = headArr[headArr.length - 2];
      }

      // record tail movements:
      const moves = tail.join(",");
      if (!(moves in record)) {
        record[moves] = 1;
      } else if (moves in record) {
        record[moves] += 1;
      }
    }
  }
}

//function to check if tail is one step away - returns T/F
function isOne(tail: number[], head: number[]): Boolean {
  const tailX = tail[0];
  const tailY = tail[1];
  const headX = head[0];
  const headY = head[1];

  if (headY === tailY && headX === tailX) {
    return true;
  }
  // check up/down (y-axis):
  else if (Math.abs(headY - tailY) === 1 && headX === tailX) {
    return true;
  }
  // check right/left (x-axis):
  else if (Math.abs(headX - tailX) === 1 && headY === tailY) {
    return true;
  }
  // check diagonal:
  else if (Math.abs(headX - tailX) === 1 && Math.abs(headY - tailY) === 1) {
    return true;
  }

  return false;
}

//get number of moves:
const number = Object.keys(record).length;
console.log(number);
//6057
