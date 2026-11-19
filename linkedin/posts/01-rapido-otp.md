# Post 01: The Rapido OTP (series launch)

**Status:** draft v4 (no dividers, no icons) · **Topic:** apps & daily life · **This post also launches the series**

---

I'm a mobile engineer, and I've started learning AI engineering.

While learning, I realised something:
we use so much technology every day, but we rarely stop to ask how it actually works.

So I'm starting a series: Everyday Engineering.
Every 2 days, one simple question about the things around us.

Here's the first one.

Your Rapido OTP is just 4 digits.

That's only 10,000 possible codes.
Bangalore alone has lakhs of rides a day.

So I wondered:
what if two people at the same metro gate get the same OTP?

It's more likely than you'd think.

With just 120 active rides in an area, there's a ~50% chance two of them share an OTP.
(It's the birthday paradox: in a room of 23 people, there's a 50% chance two share a birthday.)

So how does the right rider still get the right ride?

The OTP is never checked against everyone.
It's checked against one booking.

When the captain types your OTP, the app isn't asking:
"Does this code exist anywhere?"

It's asking:
"Does this code match the ride assigned to me?"

That changes everything.
The OTP doesn't need to be unique. It just needs to match one booking.
If someone nearby also has 4821, it doesn't matter. Their code belongs to a different ride.
And a wrong guess only works if you're already the assigned captain.

So why 4 digits and not 6?

Because it's built for a person on a bike in traffic, not for a bank.

The OTP isn't strong security.
It's a handshake: "You're my rider, I'm your captain."

4 digits are easy to say out loud and quick to type.

That's good engineering:
not making things stronger than they need to be,
but making them exactly as strong as the job needs.

Next time an app feels "too simple", ask what it's actually protecting.

What's something you use every day but never thought to ask how it works?
Drop it in the comments. It might be the next post.

#EverydayEngineering #SystemDesign #LearningInPublic #AIEngineering

---

## Behind the post (for you, not for posting)
- **The math:** P(at least one match) ≈ 1 − e^(−n²/2N). With N = 10,000 and n = 120: 1 − e^(−0.72) ≈ 51%.
- **Honesty check:** this explains how OTPs tied to a booking generally work. Rapido hasn't published its exact internal design.
- **If someone asks "isn't 4 digits insecure?":** you'd have to be the assigned captain, at the pickup point, with a limited number of tries. The cost of guessing is high and the payoff is low.
