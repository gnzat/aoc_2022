import * as fs from "fs";

function readFile(filename: string) {
  const data = fs.readFileSync(filename, "utf8");
  const content = data.split("\n");
  //   console.log(data);
  return content;
}

const arr: string[] = readFile("./input.txt");

function getRound(round: string): number {
  const opp_ch: string = round[0];
  const my_ch: string = round[2];
  let opp_val: string = "";
  let my_val: string = "";
  let result: number = 0;
  let put: number = 0;

  // console.log(opp_ch);
  // console.log(my_ch);

  if (my_ch === "X") {
    put += 1;
  } else if (my_ch === "Y") {
    put += 2;
  } else if (my_ch === "Z") {
    put += 3;
  }

  if (my_ch === "X" && opp_ch === "C") {
    result += 6;
  } else if (my_ch === "Y" && opp_ch === "A") {
    result += 6;
  } else if (my_ch === "Z" && opp_ch === "B") {
    result += 6;
  } else if (my_ch === "Y" && opp_ch === "B") {
    result += 3;
  } else if (my_ch === "Z" && opp_ch === "C") {
    result += 3;
  } else if (my_ch === "X" && opp_ch === "A") {
    result += 3;
  }

  return put + result;
}

let total: number = 0;

for (let i = 0; i < arr.length; i++) {
  const result: number = getRound(arr[i]);
  total += result;
}

console.log(total);
// 13005