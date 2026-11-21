// Week 1, Lesson 2b: what if the tiny AI looks back MORE than 1 word?
// Run it with:  npx tsx weeks/week-01/03-looking-back-further.ts
//
// In lesson 1, the model looked back only 1 word. After "at", it forgot the
// sentence was about maggi, so it wrote "i eat maggi at work" (never in the training text).
// Here, the number of words it looks back is a setting: `memory`.

const sentences = [
  "i drink chai in the morning",
  "i drink chai at night",
  "i drink coffee at work",
  "i eat maggi when it rains",
  "i eat maggi at night",
  "i eat poha in the morning",
];

// Get the `memory` words that come just before position `end`, joined with spaces.
// Example: words = [".", "i", "eat", "maggi", "at"], end = 5, memory = 2  ->  "maggi at"
// Example: same words, end = 5, memory = 1                                  ->  "at"
function getContext(words: string[], end: number, memory: number): string {
  return words.slice(end - memory, end).join(" ");
}

// Train: for every position, count which word came after the context before it.
// Each sentence starts with `memory` "." markers, so the model knows how sentences begin.
function train(memory: number): Map<string, Map<string, number>> {
  const tokens: string[] = [];
  for (const s of sentences) tokens.push(...Array(memory).fill("."), ...s.split(" "));
  tokens.push(".");

  const counts = new Map<string, Map<string, number>>();
  for (let i = memory; i < tokens.length; i++) {
    const context = getContext(tokens, i, memory);
    const next = tokens[i];
    if (!counts.has(context)) counts.set(context, new Map());
    const nextCounts = counts.get(context)!;
    nextCounts.set(next, (nextCounts.get(next) ?? 0) + 1);
  }
  return counts;
}

// Your weighted picker from lesson 1 (temperature 1).
function pickWeightedWord(options: Map<string, number>): string {
  let total = 0;
  for (const count of options.values()) total += count;
  let spot = Math.random() * total;
  for (const [word, count] of options) {
    spot -= count;
    if (spot < 0) return word;
  }
  return [...options.keys()][0];
}

function generate(counts: Map<string, Map<string, number>>, memory: number): string {
  const output: string[] = Array(memory).fill("."); // start of a sentence
  while (output.length < 20) {
    const options = counts.get(getContext(output, output.length, memory));
    if (!options) break;
    const next = pickWeightedWord(options);
    if (next === ".") break; // end of sentence
    output.push(next);
  }
  return output.slice(memory).join(" ");
}

// Experiment: write 200 sentences with each memory size. How many are NEW (never in the training text)?
const known = new Set(sentences);
for (const memory of [1, 2]) {
  const counts = train(memory);
  const newOnes = new Set<string>();
  let newCount = 0;
  for (let n = 0; n < 200; n++) {
    const s = generate(counts, memory);
    if (!known.has(s)) {
      newCount++;
      newOnes.add(s);
    }
  }
  console.log(`\nMemory = ${memory} word(s): ${newCount} out of 200 sentences were NEW`);
  for (const s of [...newOnes].slice(0, 4)) console.log("   e.g.", s);
}
