# Post 07: You talked about it, and now you see ads for it. Is your phone listening?

**Status:** draft (for 2026-11-26) · **Topic:** everyday AI + system design · **Image:** `images/07-is-my-phone-listening.png`

---

Everyday Engineering #7

My phone isn't listening to me.
What it's actually doing is more impressive, and a little scarier.

Last week a friend and I were talking about air purifiers.
I never searched for one.
The next morning, Instagram showed me an air purifier ad.

I was sure my phone had heard us.
So I dug into how an ad actually gets picked.
It happens in 5 steps.

1. Collect
Most of the data doesn't come from Instagram.
It comes from other websites and apps.
My friend had looked at purifiers on a shopping site.
Hidden on that page is a tiny piece of code from Meta and Google.
It reports: "this device looked at an air purifier."

2. Connect
The ad system builds a giant map of who is who, and who is near whom.
Same login on phone and laptop? Same person.
Same Wi-Fi every night? Probably one household.
Two phones in the same place all evening? These people spend time together.
Our phones were both. So my friend's interest spilled over to me.

3. Understand
Every person gets turned into a list of numbers.
People with similar habits get similar numbers.
Ads get numbers too.
Then it adds context: it's November in Delhi, and lakhs of people are searching for purifiers this week.

4. Auction
I open Instagram. There's an empty ad slot.
In about 100 milliseconds, faster than a blink:
Millions of ads are cut down to a few thousand whose numbers are closest to mine.
A model guesses how likely I am to click each one.
Each advertiser's bid is multiplied by that guess.
The highest score wins.

The air purifier ad won.
I saw it and thought, "it was listening."

5. Learn
I paused on the ad for 2 seconds. That's a signal.
If I'd clicked, a stronger one.
If I'd bought, the shopping app would tell the ad platform "purchase done."
Every action updates my numbers.
That's why one purifier ad turns into ten.

No microphone needed.
Just a friend's search, a shared Wi-Fi, a shared location and the season.

And the listening theory has been tested.
A 2018 study checked over 17,000 Android apps.
None were found secretly sending audio to advertisers.

The part that hit me:
turning people into numbers and finding the closest match is called embeddings.
I'm learning it right now for AI search.
The same idea decides the ads we see.

Your phone doesn't need to hear you.
It can predict you.
And a good enough prediction feels exactly like listening.

What did you see an ad for, right after talking about it?

#EverydayEngineering #AIEngineering #SystemDesign #LearningInPublic

---

## Behind the post (for you, not for posting)
- **Honesty check:** the post doesn't claim it's *impossible* for an app to listen. It says the big platforms deny it and a large study found no evidence. That's the accurate position.
- **The study:** Elleen Pan, Jingjing Ren, David Choffnes and others at Northeastern University, 2018, "Panoptispy". They tested over 17,000 popular Android apps. No unexpected audio recording sent to third parties, but some apps sent screenshots or screen recordings to third parties.
- **If someone brings up "Active Listening":** in 2024, 404 Media reported on a pitch deck from Cox Media Group, a marketing company that claimed it could target ads using voice data from devices. Google removed CMG from its Partners programme, and Meta said it was reviewing the matter. It was never shown to work at scale, and the big platforms said they weren't involved. Good to acknowledge if it comes up: "a marketing firm claimed it, the platforms distanced themselves, no evidence it worked."
- **The Wi-Fi link:** devices behind the same home router usually share one public IP address. Ad networks use the IP, along with logins, contact syncing and location, to group devices into households. That's why one person's search can show up as another person's ad.
- **"Here's what most likely happened" is doing honest work.** You don't know for sure your friend searched. The post frames it as the likely path, not a confirmed one. Keep that phrase if you edit.
- **Length:** about 2,500 characters, under LinkedIn's 3,000 limit. Check the count again if you add anything.
- **Step 5 "purchase done":** this is the conversion event (Meta Pixel / Conversions API, Google Ads conversion tracking). It's phrased generically, without saying which apps do it.
- **The 100 ms auction:** retrieval (vector search narrows millions to thousands), ranking (an ML model predicts click and purchase chances), then auction (bid × predicted chance + quality). Real-time bidding on websites works similarly, across ad exchanges.
- **Frequency illusion** is also called the Baader-Meinhof phenomenon.
- **AI angle:** this is a recommendation and prediction system: lookalike audiences ("people like you bought this") plus contextual signals. It links to the embeddings lesson: users and products can be turned into vectors, and "people like you" means vectors close to yours.
