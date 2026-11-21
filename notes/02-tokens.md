# Tokens (and why more memory alone doesn't fix a model)

**Week:** 1  ·  **Date:** 2026-11-21 (Saturday, building day)  ·  **Code:** [`02-tokenizer.ts`](../weeks/week-01/02-tokenizer.ts), [`03-looking-back-further.ts`](../weeks/week-01/03-looking-back-further.ts)

## 🤔 What problem does this solve?
A model can't read text. It needs the text cut into pieces, and each piece gets a number.
- **Letters** are too small: too many pieces, which is slow and expensive.
- **Whole words** are too big: you'd need millions of them, and new words ("habuild", "zepto") or typos break it.
- **Chunks** (tokens) are the middle ground. Common words are 1–2 pieces, and any new word can still fall back to smaller pieces or letters.

## 💡 How it works, in my own words
**BPE (Byte Pair Encoding)** learns the chunks from text, and nobody writes them by hand:
1. Split every word into letters.
2. Count every pair of neighbouring pieces (I wrote `countPairs`, the same counting pattern as my tiny AI).
3. Join the most common pair into one piece, everywhere.
4. Repeat. The ordered list of joins *is* the tokenizer.

To tokenize a new word, split it into letters and replay the joins in the same order.
The number of joins decides the **vocabulary size**. Real tokenizers have about 100k–200k.

## 🔗 What it's like in things I already know
- Counting pairs = the bigram counting from lesson 1, but on letters inside a word instead of words in a sentence.
- Tokens are why AI APIs charge **per token**, and why the same message can cost more in Hindi than in English.

## 🧪 What I predicted vs. what happened
- **13 joins:** my tokenizer discovered `straw` and `berry` by itself → `strawberry = straw | berry`. `raspberry = ra | s | p | berry` (rare words cost more tokens). `habuild` stayed 7 single letters (never seen in training). The typo `strawbery = straw | ber | y` still mostly works.
- **32 joins:** I predicted strawberry → 1 token and habuild unchanged. **Both right.** More joins make common words single tokens, but they don't help words the tokenizer never saw.
- **Strawberry puzzle, solved:** the model sees chunks, not letters, so it has to *guess* the number of r's instead of counting them. (My first guess was "it sounds the same". That was close, but the real reason is that it can't see the spelling at all.)
- **Looking back further:** with 1-word memory, 40 of 200 sentences were new (including "i eat maggi at work"). With 2-word memory: **0 of 200**. The hallucination disappeared, but the model became a copy machine. It even lost good new sentences like "i drink coffee at night".

## ⚠️ Where it breaks
- Spelling, counting letters and reversing words are hard for LLMs, because the letters are hidden inside tokens.
- Counting exact word combinations hits a wall: more memory → exact matches get rarer → more copying, less generalising. The model doesn't know `chai` and `coffee` are similar. To it, they're unrelated keys.

## ❓ Still confused about
- How do embeddings make "similar words get similar numbers"? (Next: Sunday.)
- How does attention let the model focus on "maggi" from far back? (Next.)
- How does a real LLM learn its numbers instead of counting?
