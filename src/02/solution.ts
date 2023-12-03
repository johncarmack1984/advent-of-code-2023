const file = Bun.file("./src/02/input.txt");
const text = await file.text();
const lines = text.split("\n");
lines.pop();

// const lines = [
//   "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
//   "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
//   "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
//   "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
//   "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
// ];

type Bag = {
  red: number;
  green: number;
  blue: number;
};
const bag: Bag = {
  red: 12,
  green: 13,
  blue: 14,
};

let sum = 0;

const gameWasPossible = (thisBag: Bag) => {
  return !Object.values(thisBag).filter((v) => v < 0).length;
};

const cubeSetPower = (thisBag: Bag) => {
  return Object.values(thisBag)
    .filter((v) => v > 0)
    .reduce((a, b) => a * b, 1);
};

for (const line of lines) {
  const [, subsets] = line.split(":");

  const thisBag: Bag = { red: 0, green: 0, blue: 0 };

  for (const subset of subsets.split(";")) {
    for (const cubes of subset.trim().split(",")) {
      const [count, color]: string[] = cubes.trim().split(" ");

      thisBag[color as keyof Bag] = Math.max(
        thisBag[color as keyof Bag],
        parseInt(count)
      );
    }
  }

  sum += cubeSetPower(thisBag);
}

console.log(sum);
