import * as fs from "fs";

// const text = "input_test.txt";
const text = "input.txt";
const data = fs.readFileSync(text, "utf8");
const [stacks_data, instructions_data] = data.split("\n\n");

const stacks = stacks_data
  .split("\n")
  .filter(Boolean)
  .map((line) =>
    line.includes("[")
      ? Array.from(line.matchAll(/([A-Z]+|\s{4})/g)).map((m) => m[1])
      : Array.from(line.matchAll(/(\d+)/g)).map((m) => m[1])
  );
// console.log(stacks);

// sort into individual crates
const out: string[][] = [];
for (let i = stacks.length - 2; i >= 0; i--) {
  for (let x = 0; x < stacks[i].length; x++) {
    if (i === stacks.length - 2) {
      const first_arr: string[] = [];
      first_arr.push(stacks[i][x]);
      out.push(first_arr);
    } else if (stacks[i][x].trim() === "") {
      continue;
    } else {
      out[x].push(stacks[i][x]);
    }
  }
}
// console.log(out);
// [ [ 'Z', 'N' ], [ 'M', 'C', 'D' ], [ 'P' ] ]

// handling instructions part
const instructions = instructions_data.split("\n").map((line) => {
  const [move, from, to] = Array.from(line.matchAll(/(\d+)/g))
    .map((m) => m[1])
    .map(Number);
  return { move, from: from - 1, to: to - 1 };
});
// console.log(instructions);

// sorting crates
for (let i = 0; i < instructions.length; i++) {
  const number = instructions[i].move;
  const from = instructions[i].from;
  const to = instructions[i].to;

  //part 1:
  //   for (let count = 1; count <= number; count++) {
  //     out[to].push(String(out[from].pop()));
  //   }

  //part 2:
  //start from index of element we want from crate and sort to to_crate
  for (let n = out[from].length - number; n < out[from].length; n++) {
    out[to].push(String(out[from][n]));
    // console.log(out[from][n]);
  }

  // remove elements from from_crate
  out[from].splice(-number, number);
}

console.log(out);

let result: string[] = [];
for (let x = 0; x < out.length; x++) {
  result.push(out[x][out[x].length - 1]);
}

console.log(result.join(""));
//GFTNRBZPF
//VRQWPDSGP
