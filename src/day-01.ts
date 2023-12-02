const lookup = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

function getLookaheads(obj: { [key: string]: number }) {
  return Object.keys(lookup)
    .map((s) => s.length)
    .filter(
      (item: number, i: number, ar: Array<number>) => ar.indexOf(item) === i
    );
}

const lookAheads = getLookaheads(lookup);

function leftToRight(input: any) {
  for (let i = 0; i < input.length; i++) {
    if (!isNaN(input[i])) return input[i];
    for (const lookAhead of lookAheads) {
      const slice = input.slice(i, i + lookAhead);
      if (slice in lookup) return lookup[slice as keyof typeof lookup];
    }
  }
  return;
}

function rightToLeft(input: any) {
  for (let i = input.length - 1; i > -1; i--) {
    if (!isNaN(input[i])) return input[i];
    for (const lookAhead of lookAheads) {
      const slice = input.slice(i - lookAhead + 1, i + 1);
      if (slice in lookup) return lookup[slice as keyof typeof lookup];
    }
  }
}

const file = Bun.file("./src/input.txt");
const text = await file.text();
const lines = text.split("\n");
lines.pop();

const calibrations = [];

for (const line of lines) {
  const first = leftToRight(line);
  const last = rightToLeft(line);
  calibrations.push(parseInt(`${first}${last}`));
}

let sum = 0;

for (const calibration of calibrations) {
  sum += calibration;
}

console.log(sum);
