# What is an LLM? (next-word prediction, temperature, hallucination)

**Week:** 1  ·  **Date:** 2026-11-20  ·  **Code:** [`weeks/week-01/01-tiny-llm.ts`](../weeks/week-01/01-tiny-llm.ts)

## 🤔 What problem does this solve?
We want a program that can write text that sounds like a human wrote it: answers, code, messages.
Nobody can write rules for all of language by hand. So instead, the program learns from lots of text what usually comes next.

## 💡 How it works, in my own words
An LLM (Large Language Model) looks at the text so far and predicts what comes next. It adds that piece and repeats.
That's the whole loop. It's why answers in ChatGPT and Claude appear word by word as they stream in.

There are two separate parts:
1. **What it learned:** how likely each next piece is after some text. In my tiny model, that's a counting table (`counts`): after "drink", "chai" came 2 times and "coffee" 1 time. A real LLM stores this as billions of learned numbers instead of a table.
2. **How it chooses:** given those likelihoods, which word to actually pick. This is controlled by **temperature**:
   - **Temperature 0:** always pick the most likely word. I built this as `pickTopWord`. It gives the same output every time.
   - **Temperature 1:** pick randomly, using the real odds (chai 2 out of 3 times, coffee 1 out of 3). I built this as `pickWeightedWord` with the "raffle tickets on a ruler" idea: pick a random spot from 0 to the total, then subtract counts until it goes below 0.
   - **High temperature:** the odds get flattened, so rare words get picked more. More creative, but can become nonsense.

## 🔗 What it's like in things I already know
- **Phone keyboard suggestions:** you type "I'm on my" and it suggests "way". An LLM is that, at a much bigger scale.
- **Payment failure messages:** use low temperature, because you want the same clear message every time.
  But low temperature makes the model *consistent*, not *correct*. The real failure reason must come from my system (for example, Razorpay's error code). The model should only turn it into friendly words. Giving the model the real facts is called **grounding**.

## 🧪 What I predicted vs. what happened
- **Strawberry guess:** I guessed models miscount the r's because "strawbery" and "strawberry" sound the same. Partly right: the model doesn't see spelling the way I do. But the reason isn't sound. It sees text cut into chunks (tokens). Next lesson.
- **Temperature 0:** all 5 sentences were exactly the same ("i drink chai in the morning ."). Changing `>` to `>=` in the tie between "drink" (3) and "eat" (3) changed every sentence to start with "eat". A one-character change in how the model chooses changed everything it said.
- **Temperature 1:** sentences were different every run. The model also wrote **"i eat maggi at work ."**, which was never in the training text. It joined "eat maggi" from one sentence with "at work" from another, because each step looked likely.

## ⚠️ Where it breaks
- **Hallucination:** the model picks likely words, not true ones. "I eat maggi at work" sounds fine, but nobody said it.
- **It sounds confident when it's wrong** because confident phrasing is itself the likely kind of text. There's no separate "how sure am I" check that controls its tone.
- My tiny model looks back only 1 word, so after "at" it forgets the sentence was about Maggi. Real LLMs look back thousands of tokens and stay on topic, but the "likely, not true" problem remains.

## ❓ Still confused about
- What exactly is a token, and why does "strawberry" get split into chunks? (Next lesson.)
- How does a real LLM learn its numbers instead of just counting?
