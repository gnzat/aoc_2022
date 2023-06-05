import * as fs from "fs";

function readFile(filename: string) {
  const data = fs.readFileSync(filename, "utf8");
  const content = data.split("\n");
  //   console.log(data);
  return content;
}

const arr: string[] = readFile("./input.txt");

function getRound(round: string): number {
  const oppCh: string = round[0];
  const myCh: string = round[2];
  let result: number = 0;
  let put: number = 0;

  // console.log(opp_ch);
  // console.log(my_ch);

  if (myCh === "X") {
    put += 1;
  } else if (myCh === "Y") {
    put += 2;
  } else if (myCh === "Z") {
    put += 3;
  }

  if (myCh === "X" && oppCh === "C") {
    result += 6;
  } else if (myCh === "Y" && oppCh === "A") {
    result += 6;
  } else if (myCh === "Z" && oppCh === "B") {
    result += 6;
  } else if (myCh === "Y" && oppCh === "B") {
    result += 3;
  } else if (myCh === "Z" && oppCh === "C") {
    result += 3;
  } else if (myCh === "X" && oppCh === "A") {
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
