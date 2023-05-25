
// import { readFile } from 'node:fs/promises';
import * as fs from "fs";

const input: string = fs.readFileSync('input.txt', 'utf-8');

const [starting, operations] = input.split('\n\n');

const stacks = starting
  .split('\n')
  .map((line) =>
    line.includes('[')
      ? Array.from(line.matchAll(/([A-Z]+|\s{3})/g)).map((m) => m[1])
      : Array.from(line.matchAll(/(\d+)/g)).map((m) => m[1])
  );

const startingStacks = stacks.slice(0, -1).reduce(
  (acc, curr) => (
    curr.forEach((box, i) => {
      /\S/.test(box) && acc[i].unshift(box);
    }),
    acc
  ),
  stacks.slice(-1)[0].map((_) => [] as string[])
);

const instructions = operations
  .split('\n')
  .filter(Boolean)
  .map((operationString) => {
    const [toMove, from, to] = Array.from(operationString.matchAll(/(\d+)/g))
      .map((m) => m[1])
      .map(Number);
    return { toMove, from: from - 1, to: to - 1 };
  });

const part = (stacks: string[][], part: 1 | 2 = 1) => {
  const endStacks: string[][] = JSON.parse(JSON.stringify(stacks));
  instructions.forEach(({ toMove, from, to }) => {
    // console.log({ toMove, from, to });
    const boxes = endStacks[from].splice(-toMove);
    // console.log('moving', boxes, 'from', from + 1, 'to', to + 1);
    endStacks[to].push(...(part === 1 ? boxes.reverse() : boxes));
    // console.log(endStacks.map((stack) => stack.join('')));
  });
  // console.log(endStacks.map((stack) => stack.join('')));
  return endStacks.map((stack) => stack.slice(-1)[0]).join('');
};
console.log(part(startingStacks, 1));
console.log(part(startingStacks, 2));