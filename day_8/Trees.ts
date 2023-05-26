import * as fs from "fs";

// const file = "input_test.txt";
const file = "input.txt";
const data = fs.readFileSync(file, "utf8");
const lines = data.split("\n");
let edge: number = 0; //perimeter of trees
const inner = new Set(); //to avoid double counting, record all the positions of the visible trees

for (let row = 0; row < lines.length; row++) {
  if (row === 0 || row === lines.length - 1) {
    edge += lines[row].length;
  } else {
    edge += 2;

    //tackle horizontal of target:
    for (let col = 1; col < lines[row].length - 1; col++) {
      const x = col;
      const y = row;
      const target = Number(lines[row][col]);
      const position = String(x) + "," + String(y);

      //settle left side:
      let max_left = 0;
      for (let i = 0; i < col; i++) {
        if (Number(lines[row][i]) > max_left) {
          max_left = Number(lines[row][i]);
        }
      }
      if (max_left < target) {
        inner.add(position);
      }

      //settle right side:
      let max_right = 0;
      for (let i = col + 1; i < lines[row].length; i++) {
        if (Number(lines[row][i]) > max_right) {
          max_right = Number(lines[row][i]);
        }
      }
      if (max_right < target) {
        inner.add(position);
      }
    }

    // settle vertical of target:
    // row n col switched
    for (let col = 1; col < lines.length - 1; col++) {
      const x = col;
      const y = row;
      const target = Number(lines[col][row]);
      const position = String(y) + "," + String(x);

      //settle top:
      let max_top = 0;
      for (let i = 0; i < col; i++) {
        if (Number(lines[i][row]) > max_top) {
          max_top = Number(lines[i][row]);
        }
      }
      if (max_top < target) {
        inner.add(position);
      }

      //settle bottom:
      let max_bottom = 0;
      for (let i = col + 1; i < lines.length; i++) {
        if (Number(lines[i][row]) > max_bottom) {
          max_bottom = Number(lines[i][row]);
        }
      }
      if (max_bottom < target) {
        inner.add(position);
      }
    }
  }
}

const middle = inner.size;
const total = middle + edge;
console.group(edge, middle, total);
// 1676
