# Post 02: WhatsApp ticks

**Status:** draft · **Topic:** apps & daily life · **Image:** `images/02-whatsapp-ticks.png`

---

Everyday Engineering #2

You send a message on WhatsApp.
One grey tick. Then two. Then they turn blue.

We see this hundreds of times a day.
But what is actually happening behind those ticks?

One grey tick means your message reached WhatsApp's server.
Not your friend's phone. Just the server.

Two grey ticks means your friend's phone received it.
Their phone sends a small message back: "I got it."

Blue ticks means your friend opened the chat.
Their phone sends one more small message: "They read it."

So your phone never decides the ticks on its own.
Every tick is a reply from somewhere else.

That explains a few things you've probably noticed.

If your friend's phone is switched off, you stay on one tick.
The server is holding your message until their phone comes back online.

If someone has turned off read receipts, the ticks never turn blue.
Their phone simply doesn't send the "read" reply.
And it's a fair trade: they can't see your blue ticks either.

In a group, two ticks appear only when every member's phone has received it.
Blue appears only when everyone has read it.

The engineering idea behind this is called an acknowledgement.
A system can't know something was received unless the other side says so.
So instead of guessing, it waits to be told.

I see the same idea at work every day in payments.
When you pay in an app, it shows "pending" until the bank confirms.
The app doesn't assume your payment worked. It waits for the reply.

Next time your message is stuck on one tick, you'll know exactly where it is.

What everyday app have you always been curious about?

#EverydayEngineering #SystemDesign #LearningInPublic #AIEngineering

---

## Behind the post (for you, not for posting)
- **Accuracy:** single tick = sent to the server; double grey = delivered to the recipient's device; blue = read. For groups, the double tick shows once all participants have received the message, and blue once all have read it. These are from WhatsApp's own help pages.
- **If someone asks "is it end-to-end encrypted, so how does the server know?":** the server doesn't need to read the message. It only needs to know a message (an encrypted blob) was handed over and a receipt came back.
- **Good follow-up topic for comments:** why the "online" and "typing..." indicators sometimes lag. Same idea: the app only knows what the other phone reports.
