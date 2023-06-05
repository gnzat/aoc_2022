import * as fs from "fs";

// const file = "input_test.txt";
const file = "input.txt";
const content = fs.readFileSync(file, "utf8");

// part 1: replace "13" with "3"; "14" with "4"
for (let start = 0; start < content.length - 13; start++) {
  const letters = new Set();

  for (let i = 0; i < 14; i++) {
    letters.add(content[start + i]);
  }

  if (letters.size !== 14) {
    continue;
  } else if (letters.size === 14) {
    console.log(start + 14);
    break;
  }
}

//1566
//2265