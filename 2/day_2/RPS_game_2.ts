import * as fs from "fs";

function readFile(filename: string) {
  const data = fs.readFileSync(filename, "utf8");
  const content = data.split("\n");
  //   console.log(data);
  return content;
}

function getScore(round: string): number {
  const oppCh: string = round[0];
  const outcome: string = round[2];
  let result: number = 0;

  if (outcome === "Y") {
    result += 3;
    if (oppCh === "A") {
      result += 1;
    } else if (oppCh === "B") {
      result += 2;
    } else if (oppCh === "C") {
      result += 3;
    }
  }

  if (outcome === "X") {
    if (oppCh === "A") {
      result += 3;
    } else if (oppCh === "B") {
      result += 1;
    } else if (oppCh === "C") {
      result += 2;
    }
  }

  if (outcome === "Z") {
    result += 6;
    if (oppCh === "A") {
      result += 2;
    } else if (oppCh === "B") {
      result += 3;
    } else if (oppCh === "C") {
      result += 1;
    }
  }

  return result;
}

const file: string[] = readFile("./input.txt");
let total2: number = 0;

for (let i = 0; i < file.length; i++) {
  const result: number = getScore(file[i]);
  total2 += result;
}

// console.log(file);
console.log(total2);
// 11373
