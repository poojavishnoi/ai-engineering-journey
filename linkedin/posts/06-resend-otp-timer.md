# Post 06: Why "Resend OTP" makes you wait 30 seconds

**Status:** draft (for 2026-11-25) · **Topic:** apps & daily life · **Image:** `images/06-resend-otp-timer.png`

---

Everyday Engineering #6

You enter your number.
The OTP doesn't come.

You go to tap "Resend OTP".
It's grey.
"Resend in 0:29"

So you wait. Every app does this.
But why can't they just let you tap it again?

I assumed it was to stop people spamming the button.
That's part of it. It's not the main reason.

Reason 1: SMS is slow, not lost.
Most of the time, the first OTP is on its way.
It's stuck somewhere between the app's SMS provider and your phone's network.

If you could resend right away, you'd often get two OTPs a few seconds apart.
Now which one do you type?
If the app only accepts the latest one, the first one fails, and you think the app is broken.

The 30 seconds gives the first message time to arrive.

Reason 2: every SMS costs money.
The app pays for every OTP it sends.
A few paise each doesn't sound like much.
Across millions of logins a day, it adds up fast.

Reason 3: some people press it on purpose.
There's a scam called SMS pumping.
Bots enter phone numbers in bulk and keep pressing "send OTP".
The scammers have a deal with a phone network that pays them a cut for every SMS delivered.
The app pays the bill.

In 2023 Elon Musk said this was costing Twitter around $60 million a year.
They responded by moving SMS two-factor login to paid users only.

So the timer is a speed limit.
A real person barely notices 30 seconds.
A bot trying to send thousands of messages gets slowed right down.

You've probably noticed it get longer too.
30 seconds, then 60, then more.
Or after a few tries, the app offers "Get OTP on call" instead.

Each step makes abuse more expensive, while a real user still gets in.

I work on a mobile app, and this is a good example of something I keep seeing.
A tiny grey button with a countdown is really solving three problems at once: slow networks, cost and fraud.

How long have you waited for an OTP that came 2 minutes later?

#EverydayEngineering #SystemDesign #MobileDevelopment #LearningInPublic

---

## Behind the post (for you, not for posting)
- **Honesty check:** the exact timer, how much it grows and the SMS price differ by app and provider, so the post gives no exact cost. "A few paise each" is the right order of magnitude for Indian transactional SMS. The $60M Twitter figure is from Elon Musk's public tweets in Feb 2023, when Twitter limited SMS two-factor login to Twitter Blue subscribers. It's his claim, so the post says "said".
- **SMS pumping is also called "SMS toll fraud" or "artificially inflated traffic" (AIT).** It's worst for international numbers with high delivery fees. That's why many apps block or limit OTPs to certain countries.
- **The two-OTPs problem:** apps handle it differently. Some send the same OTP again on resend (so either message works). Others make a new one and invalidate the old one. Either way, the timer cuts down on confusion.
- **The timer alone isn't the real protection.** The client-side countdown is a UX hint. The real limit has to be on the server (rate limit per phone number, per IP and per device), because a bot can call the API directly and skip the button. Good point to bring up in the comments if engineers reply.
- **Related:** Android's SMS Retriever API, the auto-fill that reads the OTP for you, is a good follow-up post.
