import * as fs from "fs";

function getValue(lines: string[], cycle: number): number {
  let i = 1;
  let j = 0;
  let x = 1;

  while (i <= cycle) {
    const line = lines[j]; //"noop"
    const action = line.slice(0, 4);

    if (action === "noop") {
      i++;
    } else if (action === "addx") {
      const value = Number(line.split(" ")[1]); // 3

      for (let round = 1; round <= 2; round++) {
        if (i === cycle + 1) {
          break;
        }

        if (round === 2) {
          x += value;
        }
        i++;
      }
    }
    j++;
  }
  return x;
}

// const file = "input_test.txt"; //13360
const file = "input.txt";
const data = fs.readFileSync(file, "utf8");
const lines = data.split("\n");
const cycleArray = [20, 60, 100, 140, 180, 220];
const total = cycleArray
  .map((cycle) => getValue(lines, cycle) * cycle)
  .reduce((total, num) => (total += num), 0);

console.log(total);
// 17940
