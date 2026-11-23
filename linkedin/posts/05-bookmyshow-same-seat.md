# Post 05: How BookMyShow stops two people booking the same seat

**Status:** draft (for 2026-11-23) · **Topic:** apps & daily life · **Image:** `images/05-bookmyshow-same-seat.png`

---

Everyday Engineering #5

Friday night. A big release.
You and a stranger in another city both tap seat F7 at the same second.

Only one of you gets it.
How does the app decide?

The simple way to build it would be:
1. Check if F7 is free.
2. If yes, book it.

Sounds fine. It isn't.

You both check at the same moment.
The app tells both of you "F7 is free".
You both pay.
Now two people own one seat, and one of them finds out at the cinema.

Engineers call this a race condition.
The gap between "check" and "book" is tiny, but with lakhs of people booking, it gets hit all the time.

So apps don't check and then book.
They do both in one step that can't be split:

"Give F7 to me, but only if nobody has it."

The database runs these one at a time.
Whoever reaches it first gets the seat.
The second request finds F7 already taken and gets "seat not available".
No tie is possible.

But there's a catch.
You haven't paid yet.

So the seat isn't sold to you. It's held for you.
That's the countdown timer you see on the payment screen.

If you pay in time, the hold becomes a booking.
If you close the app, the timer runs out and F7 goes back to everyone else.

This is why a full show sometimes has seats "come back" a few minutes later.
Someone held them and never paid.

Choosing the timer length is a real trade-off.
Too long, and seats sit locked by people who've left.
Too short, and someone loses their seat while waiting for an OTP.

And the hardest part is payment that fails halfway.
Money leaves your account, but the bank's confirmation reaches the app after your hold has expired.
Now the seat might belong to someone else.

That's why you sometimes see "booking failed, refund in 5-7 days".
The app chose to refund you rather than sell one seat twice.

I work on payments in a mobile app, and this is the part I find most interesting.
"Payment done" and "booking done" are two separate events.
A lot of careful engineering lives in the gap between them.

Has a booking ever failed on you after the money was gone?

#EverydayEngineering #SystemDesign #MobileDevelopment #LearningInPublic

---

## Behind the post (for you, not for posting)
- **Honesty check:** BookMyShow hasn't published exactly how its seat locking works. The post describes the standard pattern (an atomic "claim if free" plus a hold with an expiry) without claiming it's their exact code. The 5–7 day refund message and the reappearing seats are things users really see.
- **What "one step that can't be split" means technically:** an atomic operation. In SQL it's a conditional update like `UPDATE seats SET held_by = 'me', held_until = now() + 8 min WHERE id = 'F7' AND (held_by IS NULL OR held_until < now())`. If it changes 0 rows, someone else got there first. In Redis it's `SET seat:F7 me NX EX 480`, which sets the key only if it doesn't exist, with an expiry.
- **If someone asks "why not just lock the seat when the page loads?":** that's pessimistic locking. Everyone browsing would lock seats they never buy, and a full hall would look sold out while it's mostly empty.
- **If someone asks about the late payment confirmation:** it's usually handled with a webhook from the payment gateway plus a reconciliation job. If the hold is still yours, confirm the booking; if not, refund automatically. Idempotency keys stop a retried webhook from booking twice. That's very close to your Habuild payments work, so it's a good thing to talk about in the comments.
- **Timer length:** the exact duration varies by app and changes over time, so the post doesn't give a number.
