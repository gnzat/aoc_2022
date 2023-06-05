import * as fs from "fs";

function readFile(filename: string) {
  const data = fs.readFileSync(filename, "utf8");
  const content = data.split("\n");
  return content;
}

function getPriority(rucksack: string): number {
  const len: number = rucksack.length;
  const first: string = rucksack.slice(0, len / 2);
  const last: string = rucksack.slice(len / 2);
  const str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let i = 0; i < first.length; i++) {
    for (let x = 0; x < first.length; x++) {
      if (first[i] === last[x]) {
        let index = str.indexOf(first[i]);
        return index + 1;
      }
    }
  }
  return 0;
}

const arr = readFile("./input.txt");
let total: number = 0;

for (let i = 0; i < arr.length; i++) {
  const result: number = getPriority(arr[i]);
  total += result;
}

console.log(total);
// 8176
