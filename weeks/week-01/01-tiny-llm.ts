// Week 1, Lesson 1: build the world's smallest "language model".
// Run it with:  npx tsx weeks/week-01/01-tiny-llm.ts
//
// The whole idea of an LLM: look at the text so far, predict what comes next, repeat.
// Real LLMs look at thousands of previous tokens using a neural network.
// Ours looks at only ONE previous word, using a simple counting table.

// 1. Training data. Real LLMs read trillions of words. We use a few sentences.
const trainingText = `
i drink chai in the morning .
i drink chai at night .
i drink coffee at work .
i eat maggi when it rains .
i eat maggi at night .
i eat poha in the morning .
`;

// 2. Tokenize: split text into pieces the model works with.
//    Here, one token = one word. Real LLMs use smaller chunks (like "straw" + "berry").
const tokens = trainingText.trim().split(/\s+/);

// 3. Train: count which word comes after which.
//    counts.get("drink") -> Map { "chai" => 2, "coffee" => 1 }
const counts = new Map<string, Map<string, number>>();
for (let i = 0; i < tokens.length - 1; i++) {
  const current = tokens[i];
  const next = tokens[i + 1];
  if (!counts.has(current)) counts.set(current, new Map());
  const nextCounts = counts.get(current)!;
  nextCounts.set(next, (nextCounts.get(next) ?? 0) + 1);
}

// 4. Choose the next word, given how often each option followed the current word.
//    options example: Map { "chai" => 2, "coffee" => 1 }

// 4a. Temperature 0 ("greedy"): always take the most common word. (Written by you.)
function pickTopWord(options: Map<string, number>): string {
  let bestWord = ""
  let bestCount = 0
  for (const [word, count] of options) {
    if (count > bestCount) {
      bestCount = count
      bestWord = word
    }
  }
  return bestWord
}

// 4b. Temperature 1: pick randomly, using the real odds.
//     For { "chai" => 2, "coffee" => 1 }: chai about 2 out of 3 times, coffee about 1 out of 3.
function pickWeightedWord(options: Map<string, number>): string {
  let total = 0;
  for (const count of options.values()) {
    total += count;
  }
  let random = Math.random() * total;
  for (const [word, count] of options) {
    random -= count;
    if (random <= 0) {
      return word;
    }
  }
  // Only reached if `options` is empty, which generate() never passes in.
  throw new Error("pickWeightedWord got no options");
}

type Picker = (options: Map<string, number>) => string;

// 5. Generate: predict, append, repeat. This loop is what every LLM does when it writes.
function generate(startWord: string, pickNextWord: Picker, maxWords = 12): string {
  const output = [startWord];


  while (output.length < maxWords) {
    const last = output[output.length - 1];
    const options = counts.get(last);

    if (!options) break; // never saw anything after this word
    const next = pickNextWord(options);
    output.push(next);
    if (next === ".") break; // end of sentence
  }
  return output.join(" ");
}

// What did the model learn?
console.log("After 'drink':", counts.get("drink"));
console.log("After 'eat':  ", counts.get("eat"));
console.log("After 'at':   ", counts.get("at"));
console.log();

// Let it write 5 sentences with each picker, all starting with "i".
console.log("Temperature 0 (always the top word):");
for (let n = 1; n <= 5; n++) {
  console.log(`  ${n}.`, generate("i", pickTopWord));
}

console.log("\nTemperature 1 (random, using the real odds):");
for (let n = 1; n <= 5; n++) {
  console.log(`  ${n}.`, generate("i", pickWeightedWord));
}
