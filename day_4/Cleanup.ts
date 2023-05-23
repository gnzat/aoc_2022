import * as fs from "fs";

function readFile(file: string) {
  const data = fs.readFileSync(file, "utf8");
  const content = data.split("\n");
  return content;
}

function isWithin(line: string): boolean {
  const index = line.indexOf(",");
  const first = line.slice(0, index);
  const second = line.slice(index + 1);
  //   console.log(first, second);

  const arr1 = first.split("-");
  const arr2 = second.split("-");
  //   console.log(arr1, arr2);

  const a1 = Number(arr1[0]);
  const b1 = Number(arr1[1]);
  const a2 = Number(arr2[0]);
  const b2 = Number(arr2[1]);

  if (a1 >= a2 && b1 <= b2 && a1 <= b2 && b1 >= a2) {
    return true;
  } else if (a2 >= a1 && b2 <= b1 && a2 <= b1 && b2 >= a1) {
    return true;
  }
  return false;
}

// const arr = readFile("input_test.txt");
const arr = readFile("input.txt");
// console.log(arr);
let total = 0;

for (let i = 0; i < arr.length; i++) {
  if (isWithin(arr[i])) {
    total += 1;
  }
}

console.log(total);
// 448