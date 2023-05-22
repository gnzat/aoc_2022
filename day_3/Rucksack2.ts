import * as fs from "fs";

function readFile(filename: string) {
  const data = fs.readFileSync(filename, "utf8");
  const content = data.split("\n");
  return content;
}

function getPriority2(group: string[]): number {
  const set1 = new Set(group[0]);
  const set2 = new Set(group[1]);
  const set3 = new Set(group[2]);
  const str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const intersection = Array.from(set1).filter(
    (char) => set2.has(char) && set3.has(char)
  );

  //   console.log(intersection);
  const index = str.indexOf(intersection[0]);
  return index + 1;
}

const arr = readFile("./input.txt");
let total: number = 0;

let i = 0;
while (i < arr.length - 2) {
  const group = [arr[i], arr[i + 1], arr[i + 2]];
  console.log(group);
  const result: number = getPriority2(group);
  total += result;
  i += 3;
}

console.log(total);
// 2689