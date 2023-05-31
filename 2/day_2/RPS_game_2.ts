import * as fs from "fs";

function readFile(filename: string) {
  const data = fs.readFileSync(filename, "utf8");
  const content = data.split("\n");
  //   console.log(data);
  return content;
}

const arr: string[] = readFile("./input.txt");

function getScore(round: string): number {
  const opp_ch: string = round[0];
  const outcome: string = round[2];
  let result: number = 0;
  
  if (outcome === "Y") {
    result += 3
    if (opp_ch === "A") {
        result += 1;
    }
    else if (opp_ch === "B") {
        result += 2;
    }
    else if (opp_ch === "C") {
        result += 3;
    }
  }

  if (outcome === "X") {
    if (opp_ch === "A") {
        result += 3;
    }
    else if (opp_ch === "B") {
        result += 1;
    }
    else if (opp_ch === "C") {
        result += 2;
    }
  }

  if (outcome === "Z") {
    result+=6
    if (opp_ch === "A") {
        result += 2
    }
    else if (opp_ch === "B") {
        result += 3
    }
    else if (opp_ch === "C") {
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