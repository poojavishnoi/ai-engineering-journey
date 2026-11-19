# Post 01: The Rapido OTP

**Status:** draft · **Topic:** apps & daily life
**Before posting:** rewrite it in your own voice, and change at least a few lines.

---

Your Rapido OTP is just 4 digits. 🛵

That's only 10,000 possible codes.
Bangalore has lakhs of rides a day.

So here's what I wondered: what if two people standing at the same metro gate have the same OTP?

It's more likely than you'd think.
With just 120 active rides in an area, there's a ~50% chance that two of them share an OTP.
(It's the birthday paradox: 23 people in a room give you a 50% chance that two share a birthday.)

So how does the right rider still get the right ride?

👉 The OTP is never checked against everyone.
It's checked against one booking.

When the captain types your OTP, the app isn't asking
"does this code exist anywhere?"
It's asking
"does this code match the ride assigned to me?"

That changes everything:
→ The OTP doesn't need to be unique. It only needs to match one booking.
→ If someone else nearby has 4821 too, it doesn't matter, because their code is checked against a different ride.
→ A wrong guess only works if you're already the assigned captain, and you'd still have to guess it.

So why 4 digits and not 6?
Because it's built for a person on a bike in traffic, not for a bank.
The OTP isn't strong security. It's a handshake that confirms "you're my rider, I'm your captain."
4 digits is short enough to say out loud and type in 2 seconds.

This is what good engineering looks like:
it doesn't make the system stronger than it needs to be. It makes the code exactly as strong as the job needs.

Next time an app feels "too simple", ask what it's actually protecting.

What's something you use every day and never thought to ask how it works? 👇

#SystemDesign #SoftwareEngineering #EverydayEngineering #ProductThinking

---

## Behind the post (for you, not for posting)
- **The birthday-paradox math:** P(at least one match) ≈ 1 − e^(−n²/2N). With N = 10,000 codes and n = 120 rides: 1 − e^(−0.72) ≈ 51%.
- **Honesty check:** I don't know Rapido's exact internal design. The post describes how OTP checks for a booking generally work. If someone in the comments knows more, that's a good conversation to have, not a problem.
- **What to say if asked "isn't 4 digits insecure?":** you'd have to be the assigned captain, at the pickup point, with a limited number of tries. The cost of guessing is high and the payoff is low.
