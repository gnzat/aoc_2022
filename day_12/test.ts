//error
import * as fs from "fs";

type Coordinate = [number, number];

const file = "input_test.txt";
const lines = fs.readFileSync(file, "utf8").split("\n");
const letters = "abcdefhijklmnopqrstuvwxyz";
const record: Coordinate[] = [];
let endPos: Coordinate;
let startPos: Coordinate;

// Get start and end coordinates:
for (let line = 0; line < lines.length; line++) {
  for (let ch = 0; ch < lines[line].length; ch++) {
    if (lines[line][ch] === "E") {
      endPos = [ch, line];
    }
    if (lines[line][ch] === "S") {
      startPos = [ch, line];
    }
  }
}
// console.log(startPos!, endPos!);

//function to get surrounding values:
function getValuesAround(currentPos: Coordinate): String[] {
  const [x, y] = [currentPos[0], currentPos[1]];
  const compass: string[] = [];

  //right, left, top, bottom
  const right = lines[y][x + 1];
  const left = lines[y][x - 1];
  const top = lines[y - 1][x];
  const bottom = lines[y + 1][x];
  
  //filter out undefined
  // compass.push(right, left, top, bottom);
  // compass.filter((d) => {
  //   if (d !== undefined) {
  //     return d;
  //   }
  // })
  return compass;
}
console.log(getValuesAround(startPos!));

// function to move one step at a time - return new coordinate
function movePos(currentPos: Coordinate): Coordinate {
  const [xValue, yValue] = [currentPos[0], currentPos[1]];
  const character = lines[yValue][xValue];
  const index = letters.indexOf(character);
  const compass = getValuesAround(currentPos);

  // const valuesAround = Object.values(getValues(currentPos)).filter((ch) => {
  //     if (letters.indexOf(ch) - 1 === index) {
  //         return ch;
  //     } //for one letter after current
  // });
  let direction: string;
  let newPos: Coordinate;
  for (const key of Object.keys(compass)) {
    const i = letters.indexOf(compass[key]);
    if (i === index + 1) {
      direction = key; //find first one, but how to make it sarch through all in the case of multiplt same letters?
    }
  }
  if (direction! != undefined) {
    if (direction === "up") {
      newPos = [xValue, yValue + 1];
    } else if (direction === "down") {
      newPos = [xValue, yValue - 1];
    } else if (direction === "left") {
      newPos = [xValue - 1, yValue];
    } else {
      newPos = [xValue + 1, yValue];
    }
  }
  return newPos!;
}
// console.log(movePos(startPos!));

function getSteps(
  record: Coordinate[],
  startPos: Coordinate,
  endPos: Coordinate
): Coordinate[] {

  record.push(startPos);
  let newPos: Coordinate;

  if (startPos[0] === 0 && startPos[1] === 0) {
    const [xValue, yValue] = [startPos[0], startPos[1]];
    const compass = getValuesAround(startPos);
    let direction: string;
    for (const key of Object.keys(compass)) {
      if (compass[key] === "a") {
        direction = key;
      }
      if (direction! != undefined) {
        if (direction === "up") {
          newPos = [xValue, yValue + 1];
        } else if (direction === "down") {
          newPos = [xValue, yValue - 1];
        } else if (direction === "left") {
          newPos = [xValue - 1, yValue];
        } else {
          newPos = [xValue + 1, yValue];
        }
      }
    }
  }

  while (newPos! !== endPos) {
    const pos = movePos(newPos!);
    record.push(pos);
  }

  return record;
}

// console.log(getSteps(record, startPos!, endPos!));
