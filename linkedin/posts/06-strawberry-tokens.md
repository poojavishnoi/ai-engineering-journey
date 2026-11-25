# Post 06: Why AI struggles to count the r's in "strawberry"

**Status:** draft (for 2026-11-25) · **Topic:** everyday AI · **Image:** `images/06-strawberry-tokens.png`

---

Everyday Engineering #6

Ask an AI chatbot: how many r's are in "strawberry"?

For a long time, many of them said 2.
The answer is 3.

These models can write code and pass exams.
So why would they trip on something a 7-year-old can do?

I thought it was a silly bug.
Then I built a tokenizer myself this week, and it finally made sense.

An AI model doesn't read letters.
Before your message reaches the model, it gets cut into chunks called tokens.
Each chunk becomes a number.

So you see:
s-t-r-a-w-b-e-r-r-y

The model sees something like:
[straw] [berry]

Two chunks. Two numbers.
The letters inside them are gone.

Asking it to count the r's is like asking you to count the letters in a word you've only ever heard, never seen written.
You'd have to guess from memory.
That's what the model does. It guesses.

So why chunks? Why not just give the model letters?

Letters are too small.
Every message becomes a very long list, and that's slow and costly.

Whole words are too big.
You'd need millions of them, and any new word or typo breaks everything.

Chunks sit in the middle.
Common words become one or two chunks.
Rare words get split into smaller pieces.

The chunks aren't written by hand.
The tokenizer learns them from text by finding letter pairs that keep showing up together, and joining them.
That's what I built.

Fed a few sentences, mine found "straw" and "berry" on its own.
"raspberry" came out as ra | s | p | berry, because it was rarer.
And "habuild", the app I work on, stayed as 7 separate letters. It had never seen that word.

This one idea explains a lot of AI's odd behaviour:

Spelling words backwards is hard.
Counting letters is hard.
AI APIs charge you per token, not per word.
And the same sentence can cost more in Hindi than in English, because it gets split into more chunks.

Newer models often get strawberry right now.
Many of them work through the word one letter at a time before they answer.
But underneath, they still see chunks.

What's a simple question you've seen an AI get wrong?

#EverydayEngineering #AIEngineering #LearningInPublic #LLM

---

## Behind the post (for you, not for posting)
- **Honesty check:** the exact split of "strawberry" differs between tokenizers (OpenAI, Anthropic, Google each use their own), and that's why the post says "something like". `[straw] [berry]` is what *your* tokenizer produced with 13 joins, so it's true for your code, not a claim about any one company's model.
- **"For a long time, many of them said 2":** this was a famous viral test in 2024. Saying "newer models often get it right" is fair. Don't claim a specific model still fails.
- **Why newer models do better:** they reason step by step before answering (spelling the word out turns each letter into its own token), and the question became so famous that it's in training data.
- **Hindi costs more:** tokenizers are mostly trained on English-heavy text, so Devanagari text is split into more, smaller chunks. Hindi got cheaper in newer tokenizers, but it's still usually more tokens than English for the same meaning.
- **If someone asks "so why not use letters anyway?":** a model can only look at a fixed number of tokens at once (the context window), and its cost grows with the number of tokens. Letters would make every message about 4x longer.
- **Code to link in the comments:** `weeks/week-01/02-tokenizer.ts` in your repo, if you want to show the build.
