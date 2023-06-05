import * as fs from "fs";

// const file = "input_test.txt";
const file = "input.txt";
const data = fs.readFileSync(file, "utf8");
const lines = data.split("\n");
const inner = new Set(); //to avoid double counting, record all the positions of the visible trees
let edge: number = 0; //perimeter of trees

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
      let maxLeft = 0;
      for (let i = 0; i < col; i++) {
        if (Number(lines[row][i]) > maxLeft) {
          maxLeft = Number(lines[row][i]);
        }
      }
      if (maxLeft < target) {
        inner.add(position);
      }

      //settle right side:
      let maxRight = 0;
      for (let i = col + 1; i < lines[row].length; i++) {
        if (Number(lines[row][i]) > maxRight) {
          maxRight = Number(lines[row][i]);
        }
      }
      if (maxRight < target) {
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
      let maxTop = 0;
      for (let i = 0; i < col; i++) {
        if (Number(lines[i][row]) > maxTop) {
          maxTop = Number(lines[i][row]);
        }
      }
      if (maxTop < target) {
        inner.add(position);
      }

      //settle bottom:
      let maxBottom = 0;
      for (let i = col + 1; i < lines.length; i++) {
        if (Number(lines[i][row]) > maxBottom) {
          maxBottom = Number(lines[i][row]);
        }
      }
      if (maxBottom < target) {
        inner.add(position);
      }
    }
  }
}

const middle = inner.size;
const total = middle + edge;
console.log(total);
// 1676
