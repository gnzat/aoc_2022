import * as fs from "fs";
// import { arrayBuffer } from "stream/consumers";

function readFile(filename: string) {
  const data = fs.readFileSync(filename, "utf8"); 
  const content = data.split("\n");
  console.log(content);
    return content;
  }


const arr = readFile("./day_1/input.txt");
// const test = readFile("./day_1/test_input.txt");
// console.log(test.length);

function getTotals(arr: string[]): number[] {
  let group: number[] = [];
  let i = 0;
  let total = 0;
  while (i < arr.length) {
    if (arr[i] === "") {
      group.push(total);
      // console.log(total);
      total = 0;
    }
    if (arr[i] !== "") {
      const num = Number(arr[i]);
      // console.log(num);
      total += num;

      if (i === arr.length - 1){
        group.push(total);
      }
    }
    i++;

  }
  return group;
}

const out: number[] = getTotals(arr);
// console.log(out);

//to get Max value:
console.log(Math.max(...out));
//67027


// get sum of top 3 elfs:
let total2: number = 0;
function getTopThree(arr: number[]): number {
  let i = 0;
  while (i < 3) {
    total2 += Math.max(...arr);
    const index: number = arr.indexOf(Math.max(...arr));
    arr.splice(index, 1);
    i++;
  }

  return total2;
} 

console.log(getTopThree(out));
// 197291





