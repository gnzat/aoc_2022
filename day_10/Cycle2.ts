import * as fs from "fs";

// const file = "input_test.txt";
const file = "input.txt";
const lines = fs.readFileSync(file, "utf8").split("\n");
let cycle = 0;
let row = "";
let x = 1;

for (const line of lines) {
  let loops = 0;
  if (line.slice(0, 4) === "noop") {
    loops = 1;
  } else {
    loops = 2;
  }

  for (let i = 0; i < loops; i++) {
    const column = cycle % 40; //rows of 40
    // check if x in within sprite (3 pixels)
    if (x - 1 <= column && column <= x + 1) {
      row += "#";
    } else {
      row += ".";
    }

    if (column === 39) {
      console.log(row);
      row = ""; //reset row
    }

    cycle++;

    // only add value to x on the 2nd loop
    if (i === 1) {
      x += Number(line.split(" ")[1]);
    }
  }
}
//ZCBAJFJZ
