# Post 06: How shopping apps understand "kurthi", "kurtee" and "कुर्ती"

**Status:** draft (for 2026-11-25) · **Topic:** everyday AI · **Image:** `images/06-kurti-search.png`

---

Everyday Engineering #6

Five people open a shopping app and search for the same thing.

One types "kurti".
One types "kurthi".
One types "kurtee".
One types "कुर्ती".
And one types "ethnic top for office".

They all want the same thing.
A simple search would find it for only one of them.

Because a simple search matches letters.
"kurthi" and "kurti" are different words to a computer.
So four out of five people see "No results found" and close the app.

In India this isn't an edge case. It's normal.
Hindi words written in English letters have no fixed spelling.
Everyone writes them the way they say them, and types them in a hurry.

So how do apps fix it?
In layers.

Layer 1: allow small spelling mistakes.
"kurthi" is just one letter away from "kurti".
Search can treat words that are 1 or 2 letters apart as the same.

Layer 2: match by sound.
"kurtee" and "kurti" sound exactly the same when you say them.
So search can turn words into a rough "sound code" and match those.

Layer 3: convert scripts.
"कुर्ती" gets converted into English letters, then searched like the rest.

But none of these can solve the last one.
"ethnic top for office" isn't a spelling of "kurti" at all.

Layer 4: match by meaning.
This is where AI comes in.

Every search and every product gets turned into a list of numbers that captures its meaning.
These lists are called embeddings.
Things with similar meanings get similar numbers.

So "ethnic top for office" lands close to "kurti", "kurta set" and "salwar suit".
Not because the letters match, but because the meaning does.

Search stops asking "do these letters match?"
and starts asking "are these two things close in meaning?"

There's one more trick, and it's my favourite.
Apps learn from what you click.

If thousands of people search "kurthi" and then click on kurtis, the app learns that "kurthi" means kurti.
No one has to write that rule.
The users teach it.

I'm learning about embeddings right now, and this is the first time it's clicked for me.
Same meaning, close numbers. That's the whole idea.

What's the weirdest spelling you've typed into a shopping app that still worked?

#EverydayEngineering #AIEngineering #LearningInPublic #Ecommerce

---

## Behind the post (for you, not for posting)
- **Honesty check:** the post describes how search is *typically* built in layers. It doesn't claim any company's exact system. Flipkart, Meesho and others have talked publicly about vernacular and Hinglish search, but not every layer in detail.
- **Technical names, in case engineers comment:**
  - Layer 1 is **fuzzy matching** using **edit distance** (Levenshtein): how many single-letter changes turn one word into another. kurthi → kurti = 1 deletion.
  - Layer 2 is **phonetic matching**, e.g. Soundex or Metaphone (both made for English names; Indian apps use tuned versions for Indic sounds).
  - Layer 3 is **transliteration**: Devanagari ↔ Latin script.
  - Layer 4 is **semantic search** with embeddings and vector search. This is Week 5 of your roadmap.
  - The click trick is **query rewriting from behaviour logs** (search → click data). It's also what powers "Did you mean...".
- **Why not just use embeddings for everything?** They're slower and more expensive, and sometimes too loose. A search for "red kurti" might show a red kurta set, which is close in meaning but not what you wanted. Real systems combine exact or keyword search with semantic search (hybrid search) and then rerank. That's Week 6 of your roadmap, so it would make a good follow-up post.
- **Link to your lesson:** this is exactly the `similarity()` function you're about to write in `04-embeddings.ts`. Cosine similarity is how "close in meaning" gets measured.
