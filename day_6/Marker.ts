import * as fs from "fs";

// const file = "input_test.txt";
const file = "input.txt";
const content = fs.readFileSync(file, "utf8");

for (let start = 0; start < content.length - 13; start++) {
  const letters = new Set;

  for (let i = 0; i < 14; i++) {
    letters.add(content[start + i]);
    // console.log(content[start + i]);
    // console.log(letters);
  }

  if (letters.size !== 14) {
    continue;
  }
  else if (letters.size === 14) {
    console.log(start + 14);
    break;
  }
}

//1566
//2265