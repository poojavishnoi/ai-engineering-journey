# Post 04: I built a tiny AI and it made something up

**Status:** published 2026-11-22 · **Topic:** AI · **Counts as an AI post** · **Image:** `images/04-tiny-ai-made-things-up.png`
**Based on:** Week 1, Lesson 1 (`weeks/week-01/01-tiny-llm.ts`, `notes/01-what-is-an-llm.md`)

---

Everyday Engineering #4

Yesterday I built a tiny AI.
About 40 lines of code. No AI libraries.

And it made something up.

Here's what I did.

I gave it 6 sentences to learn from:

i drink chai in the morning
i drink chai at night
i drink coffee at work
i eat maggi when it rains
i eat maggi at night
i eat poha in the morning

It counted which word comes after which.
After "drink": chai 2 times, coffee 1 time.
After "eat": maggi 2 times, poha 1 time.

Then I asked it to write sentences.
Its only job: look at the last word, pick a likely next word, repeat.

That's the basic idea behind ChatGPT too.
Predict the next piece of text. Add it. Repeat.

First, I made it always pick the most likely word.
It wrote the same sentence 5 times in a row.
Safe, but boring.

(AI tools have a setting for this called temperature. At 0, it always picks the top word.)

Then I let it pick randomly, based on the counts.
And it wrote:

"i eat maggi at work"

I never taught it that.
"eat maggi" came from one sentence. "at work" came from another.
Each step looked likely, so it joined them.

The sentence sounds fine.
But nobody ever said it.

That's when it clicked for me.

The model never asks "is this true?"
It only asks "what word is likely to come next?"

ChatGPT works at a much bigger scale.
It looks back over thousands of words, not just one.
But the core question is the same.

So when it confidently tells you something wrong, it isn't lying.
It's continuing with words that are likely.
And confident-sounding text is likely, because most text online sounds confident.

This is called hallucination.

What I'm taking from this:
don't judge an AI answer by how sure it sounds.
If the facts matter, give it the facts, and check what it says.

I'm learning AI engineering from the basics and sharing as I go.
This is week 1, so I've kept it simple on purpose.
How real models understand meaning, how they focus on the right words, and how they actually learn are all coming up next.

So if you're thinking "but that's not the full picture", you're right. I'll get there, one post at a time.

#EverydayEngineering #AIEngineering #LearningInPublic #GenerativeAI

---

## Behind the post (for you, not for posting)
- **Links:** LinkedIn tends to show posts with links to fewer people. If you want to share the code, put the GitHub link in the first comment, not in the post: `github.com/poojavishnoi/ai-engineering-journey` (file: `weeks/week-01/01-tiny-llm.ts`).
- **Honesty check:** a real LLM isn't a counting table. It learns billions of numbers with a neural network, and it predicts tokens (chunks of words), not whole words. The post says "the basic idea", which is accurate. If someone says "that's not how ChatGPT works", the answer is: the generation loop and the sampling step are the same, but the model that gives the likelihoods is far bigger.
- **What our model is called:** a bigram model, because it looks at pairs of words. It's one of the oldest language models.
- **"Temperature 1 = use the real odds":** that's correct for our counts. Technically, temperature reshapes the probabilities before picking: below 1 sharpens them toward the top word, and above 1 flattens them.
- **If someone asks "so how do you stop hallucination?":** you can't fully stop it. You reduce it by giving the model the real facts in the prompt (grounding, also called RAG) and by checking its answers (evals). That's Phase 2 of your roadmap.
