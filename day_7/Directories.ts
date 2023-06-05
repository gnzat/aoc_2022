import * as fs from "fs";

// const file = "input_test.txt";
const file = "input.txt";
const data = fs.readFileSync(file, "utf8");
const lines: string[] = data.split("\n");

let cd = ["/"];
let sizes = { "/": 0 };
for (const line of lines) {
  const l = line.split(" "); //split line into array

  if (l[0] === "$") {
    //handle paths
    if (l[1] === "cd") {
      if (l[2] === "/") {
        cd = ["/"];
      } else if (l[2] === "..") {
        cd.pop();
      } else {
        cd.push(l[2]);
      }
    }

    //handle lists:
    if (l[1] === "ls") {
      continue;
    }
  } else if (l[0] === "dir") {
    const path: string = cd.join("") + l[1];
    sizes[path] = 0;
  }

  //if it is a number (file size)
  else if (!isNaN(Number(l[0]))) {
    const path: string = cd.join("");
    sizes[path] += Number(l[0]);

    //to add file sizes to all directories involved:
    for (let i = 1; i < cd.length; i++) {
      const newCd: string = cd.slice(0, -i).join("");
      sizes[newCd] += Number(l[0]);
    }
  }
}

// part 1:
// let total: number = 0;
// for (const key of Object.keys(sizes)) {
//     if (sizes[key] <= 100000) {
//         total += sizes[key];
//     }
// }
// console.log(total);
// //2031851

//part 2:
const unused: number = 70000000 - sizes["/"];
const need: number = 30000000 - unused;
let min: number = sizes["/"];

for (const key of Object.keys(sizes)) {
  if (sizes[key] >= need && sizes[key] < min) {
    min = sizes[key];
  }
}
console.log(min);
//2568781
