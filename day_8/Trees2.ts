import * as fs from "fs";

// const file = "input_test.txt";
const file = "input.txt";
const data = fs.readFileSync(file, "utf8");
const lines = data.split("\n");
const scores = new Set<number>();

for (let row = 0; row < lines.length; row++) {
  if (row === 0 || row === lines.length - 1) {
    continue;
  } else {
    //tackle horizontal of target:
    for (let col = 1; col < lines.length - 1; col++) {
      let target = Number(lines[row][col]);

      //settle left side:
      let max_left = 0;
      for (let i = col - 1; i >= 0; i--) {
        const tree = Number(lines[row][i]);

        if (tree < target) {
          max_left++;
        } else {
          max_left += 1;
          break;
        }
      }

      //settle right side:
      let max_right = 0;
      for (let i = col + 1; i < lines[row].length; i++) {
        const tree = Number(lines[row][i]);

        if (tree < target) {
          max_right++;
        } else {
          max_right += 1;
          break;
        }
      }

      // settle vertical of target:

      //settle top:
      let max_top = 0;
      for (let i = row - 1; i >= 0; i--) {
        const tree = Number(lines[i][col]);

        if (tree < target) {
          max_top++;
        } else {
          max_top += 1;
          break;
        }
      }

      //settle bottom:
      let max_bottom = 0;
      for (let i = row + 1; i < lines.length; i++) {
        const tree = Number(lines[i][col]);

        if (tree < target) {
          max_bottom++;
        } else {
          max_bottom += 1;
          break;
        }
      }

      //   console.log(target ,": ", max_left);
      let total = max_bottom * max_top * max_right * max_left;
      scores.add(total);
      total = 0;
    }
  }
}

let max = 0;
scores.forEach(function (value) {
  if (max < value) {
    max = value;
  }
});
console.log(max);
// 313200
