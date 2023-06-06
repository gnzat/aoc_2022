import * as fs from "fs";

type Monkey = {
  items: string[];
  first: string;
  symbol: string;
  second: string;
  divisible: number;
  isTrue: number;
  isFalse: number;
  count: number;
};

// const file = "input_test.txt";
const file = "input.txt";
const lines = fs.readFileSync(file, "utf8").trim().split("\n\n");
const monkeyArr: Monkey[] = lines.map((monkey: string): Monkey => {
  const line = monkey.split("\n");
  const items = line[1].split(": ")[1].split(", ");
  const [first, symbol, second] = line[2].split("= ")[1].split(" ");
  const divisible = parseInt(line[3].split("by ")[1]);
  const isTrue = parseInt(line[4].split("monkey ")[1]);
  const isFalse = parseInt(line[5].split("monkey ")[1]);

  return {
    items: items,
    first: first,
    symbol: symbol,
    second: second,
    divisible: divisible,
    isTrue: isTrue,
    isFalse: isFalse,
    count: 0,
  };
});
// WHY?
const divisor: number = monkeyArr.reduce((acc, monkey) => {
  return acc * monkey.divisible;
}, 1);

for (let round = 0; round < 10000; round++) {
  for (const monkey of monkeyArr) {
    while (monkey.items.length > 0) {
      //for each item
      const before = parseInt(monkey.first.replace("old", monkey.items[0]));
      const after = parseInt(monkey.second.replace("old", monkey.items[0]));
      const worry = monkey.symbol === "*" ? before * after : before + after;
      const finalWorry = worry % divisor;
      const toMonkey =
        worry % monkey.divisible === 0 ? monkey.isTrue : monkey.isFalse;

      // count number of items inspected in Monkey
      monkey.count++;

      // remove item from monkey and push it to new monkey
      monkey.items.shift();
      monkeyArr[toMonkey].items.push(String(finalWorry));
    }
  }
}

//get highest count in monkeyArr
const countArr: number[] = [];
for (const monkey of monkeyArr) {
  countArr.push(monkey.count);
}
countArr.sort((a, b) => a - b); //ascending order

const max = countArr[countArr.length - 1];
const secondMax = countArr[countArr.length - 2];
console.log(max * secondMax);
//39109444654
