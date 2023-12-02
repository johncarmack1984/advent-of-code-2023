// const file = Bun.file("./src/02/input.txt");
// const text = await file.text();
// const lines = text.split("\n");
// lines.pop();

// console.log(lines);

const lines = [
  "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
  "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
  "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
  "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
  "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
];

const bag = {
  red: 12,
  green: 13,
  blue: 14,
};

const possibleGamesIds = [];
let sum = 0;

const gameWasPossible = (thisBag: typeof bag) => {
  return !Object.values(thisBag).filter((v) => v < 0).length;
};

let prevGame = 0;

for (const line of lines) {
  const thisBag: typeof bag = { ...bag };
  const [game, subsets] = line.split(":");

  let gameId = parseInt(game.split(" ")[1]);

  if (prevGame + 1 !== gameId) {
    console.log("Missing game", prevGame);
    break;
  }

  for (const subset of subsets.split(";")) {
    for (const cubes of subset.trim().split(",")) {
      const [count, color]: string[] = cubes.trim().split(" ");
      thisBag[color as keyof typeof bag] =
        thisBag[color as keyof typeof bag] - parseInt(count);
    }
  }
  console.log(gameWasPossible(thisBag), thisBag, "\n\n");
  if (gameWasPossible(thisBag)) {
    possibleGamesIds.push(gameId);
    sum += gameId;
  }
  prevGame = gameId;
}

console.log(possibleGamesIds);
console.log(sum);
