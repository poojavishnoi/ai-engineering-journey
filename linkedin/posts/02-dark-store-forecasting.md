# Post 02: How a dark store knows what to stock

**Status:** draft · **Topic:** AI in everyday apps · **Counts as an AI post** · **Image:** `images/02-dark-store-forecasting.png`

---

Everyday Engineering #2

It starts raining in the evening.
Within an hour, half the city orders Maggi.

And somehow, the Blinkit store near you has enough of it.

That's not luck.

These apps deliver from small warehouses near you, called dark stores.
A supermarket might carry 30,000 products.
A dark store has room for only a few thousand.

So every shelf has to earn its place.
Stock too little, and you show "out of stock" and lose the order.
Stock too much, and milk and bread expire on the shelf.

So someone has to guess, for every product, in every store, how much will sell.
Not for the whole city. For your neighbourhood. Tomorrow.

That's where AI comes in.

The model looks at the past:
what sold, in which store, on which day, at what time.

Then it adds the things that change what people buy:
rain, temperature, weekends, festivals, salary day, a big cricket match.

From that, it learns patterns like:
rain in this area means more Maggi, chai and pakora mix.
A hot day means more ice cream and cold drinks.
An India match means more chips, all at once, just before the toss.

Here's the part I found most interesting.

The model learns from sales.
But sales are not the same as demand.

Say Maggi sold out at 7 pm.
From 7 pm to midnight, sales show zero.

Did nobody want Maggi after 7?
No. People wanted it. There was just nothing left to sell.

If the model believes that zero, it learns:
"Not much Maggi sells in the evening."
So it orders less next time.
So it sells out even earlier.
And the problem gets worse, not better.

A good system has to know the difference between
"nobody wanted it" and "we didn't have it".

One way to fix this is to also look at signals beyond sales,
like how many people searched for Maggi or saw that it was out of stock.

And not every mistake costs the same.

If you over-stock Maggi, it sits there for months. Not a big loss.
If you over-stock milk, you throw it away in two days.
So the system can afford to be generous with Maggi and careful with milk.

When we say "AI", we usually think of ChatGPT.
But some of the most useful AI is quietly deciding
how many packets of Maggi should sit 2 km from your house tonight.

And it taught me something I'll remember while learning AI:
a model only learns from the data you record.
If your data is missing something, your model will be too.

What do you order more of when it rains?

#EverydayEngineering #AIEngineering #MachineLearning #LearningInPublic #QuickCommerce

---

## Behind the post (for you, not for posting)
- **Honesty check:** quick-commerce companies have said publicly that they use ML for demand forecasting. Their exact models, inputs and numbers aren't public. The post describes how this kind of forecasting generally works and doesn't claim Blinkit's internals.
- **"30,000 vs a few thousand":** these are rough ranges. A large supermarket carries tens of thousands of products. Dark stores are usually described as carrying a few thousand to around 10,000. If someone pushes on exact numbers, say it varies by store.
- **The interesting idea has a name: censored demand.** When an item is out of stock, you see sales, not true demand. If you train on raw sales, the forecast keeps shrinking, which is a feedback loop. Common fixes: mark the stockout hours and fill them in from similar hours, and use search or "notify me" clicks as demand signals.
- **"Not every mistake costs the same":** in forecasting this is called asymmetric loss. You plan above the average forecast for items that last long and run out often, and stay close to it for perishables.
- **Link to your work:** it's the same trap as analytics events. If you only track events from users who reached a screen, you can't see the users who never got there.
- **AI roadmap link:** "a model only learns from the data you record" comes back in Phase 2 when we do evals, and in thinking about what an LLM was trained on.
