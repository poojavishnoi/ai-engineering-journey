// Week 1, Lesson 2: build a tokenizer from scratch (BPE: Byte Pair Encoding).
// Run it with:  npx tsx weeks/week-01/02-tokenizer.ts
//
// The problem: a model can't read text directly. It needs the text cut into pieces (tokens).
// Letters are too small (too many pieces). Whole words are too big (can't handle new words).
// So we LEARN chunks from text:
//   1. Start with every word split into single letters.
//   2. Find the pair of neighbouring pieces that appears most often.
//   3. Join that pair into one new piece, everywhere.
//   4. Repeat.

const NUM_MERGES = 32; // how many times to repeat steps 2-3. Try changing this later!

// 1. Training text.
const trainingText = `
the strawberry is red . the blueberry is blue . i like strawberry milk .
a raspberry and a strawberry and a blueberry . berry season is here .
she drank the straw berry shake with a straw . the berries are fresh .
i like blueberry jam and raspberry jam . the berry farm is near the river .
strawberry fields and blueberry fields . drink with a straw .
`;

// Each different word, split into pieces, plus how many times it appears in the text.
// Example: { pieces: ["b", "e", "r", "r", "y"], count: 2 }
type Word = { pieces: string[]; count: number };

function splitIntoWords(text: string): Word[] {
  const wordCounts = new Map<string, number>();
  for (const word of text.trim().split(/\s+/)) {
    if (word === ".") continue;
    wordCounts.set(word, (wordCounts.get(word) ?? 0) + 1);
  }
  // [..."berry"] splits a string into letters: ["b", "e", "r", "r", "y"]
  return Array.from(wordCounts, ([word, count]) => ({ pieces: [...word], count }));
}

// 2. Count every pair of neighbouring pieces, across all words.
//    Returns a Map like: { "e r" => 16, "r y" => 13, "s t" => 7, ... }
//    The key is the two pieces joined with a space, e.g. "e r" means "e" followed by "r".
function countPairs(words: Word[]): Map<string, number> {
  const pairCounts = new Map<string, number>();

  for (const word of words) {
    for (let i = 0; i < word.pieces.length - 1; i++) {
      const pair = word.pieces[i] + " " + word.pieces[i + 1];
      pairCounts.set(pair, (pairCounts.get(pair) ?? 0) + word.count);
    }
  }
  
  return pairCounts;
}

// 3. Join every "a" followed by "b" into one piece "ab", in every word.
//    ["b", "e", "r", "r", "y"] with a="e", b="r"  ->  ["b", "er", "r", "y"]
function mergePair(words: Word[], a: string, b: string): void {
  for (const word of words) {
    const merged: string[] = [];
    let i = 0;
    while (i < word.pieces.length) {
      if (word.pieces[i] === a && word.pieces[i + 1] === b) {
        merged.push(a + b);
        i += 2; // skip both pieces, they are now one
      } else {
        merged.push(word.pieces[i]);
        i += 1;
      }
    }
    word.pieces = merged;
  }
}

// 4. Training: repeat "find the most common pair, join it" NUM_MERGES times.
//    We remember every join, in order. That list IS the tokenizer.
const words = splitIntoWords(trainingText);
const learnedMerges: [string, string][] = [];

console.log("Learning chunks:");
for (let step = 1; step <= NUM_MERGES; step++) {
  const pairCounts = countPairs(words);

  // Find the most common pair (same idea as your pickTopWord from lesson 1).
  let bestPair = "";
  let bestCount = 0;
  for (const [pair, count] of pairCounts) {
    if (count > bestCount) {
      bestPair = pair;
      bestCount = count;
    }
  }
  if (bestPair === "") break; // nothing left to join

  const [a, b] = bestPair.split(" ");
  mergePair(words, a, b);
  learnedMerges.push([a, b]);
  console.log(`  ${String(step).padStart(2)}. '${a}' + '${b}'  ->  '${a + b}'   (seen ${bestCount} times)`);
}

// 5. Tokenize a new word: split into letters, then replay every learned join, in order.
function tokenize(word: string): string[] {
  const temp: Word[] = [{ pieces: [...word], count: 1 }];
  for (const [a, b] of learnedMerges) mergePair(temp, a, b);
  return temp[0].pieces;
}

console.log("\nTokenizing words:");
for (const word of ["strawberry", "blueberry", "raspberry", "strawbery", "habuild"]) {
  const tokens = tokenize(word);
  console.log(`  ${word.padEnd(11)} ->  ${tokens.join(" | ")}   (${tokens.length} tokens)`);
}
