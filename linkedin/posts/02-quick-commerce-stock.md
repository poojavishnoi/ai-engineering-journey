# Post 02: "Only 2 left" on Blinkit / Zepto

**Status:** published 2026-11-20 · **Topic:** apps & daily life · **Replaces the WhatsApp ticks draft as #2**

---

Everyday Engineering #2

I opened Blinkit and saw "Only 2 left" on an item.
I ordered one.
A few minutes later, it said "Only 1 left".

My first thought:
the delivery partner picked it from the shelf, so how did the server find out?

Turns out I had it backwards.

The count dropped when I placed the order, not when someone picked it.

When you tap "Place order", the app doesn't just save your order.
It sets that item aside for you.

Think of the store's stock as two numbers:
items on the shelf, and items already promised to someone.

What the app shows you is the difference:
on the shelf minus already promised.

So the moment I ordered, the shelf still had 2.
But 1 was now promised to me.
Available: 1.

Nobody had touched the shelf yet.

Why do it this way?

Imagine two people order the last packet of Maggi at the same second.
If the app waited for someone to pick it from the shelf, both orders would go through.
Then one person gets a call: "Sorry, item not available."

So the store has to set the item aside the moment you order.
And when two orders hit at the same instant, the system checks and reduces the count in one step, so only one of them wins.

It's the same problem as booking the last seat on a flight.

And if your payment fails, or you cancel?
The item is released and the count goes back up.

So where does the shelf come in?

These apps run out of small warehouses near you, often called dark stores.
Usually it isn't the delivery partner who picks your items. Store staff, called pickers, do that.

The picker's app shows your list, and they scan each item's barcode as they pick it.
That scan confirms: "This exact item is packed for this order."

If the shelf turns out to be empty (it got damaged, or the count was wrong),
the picker marks it missing, and you get a refund or a replacement.
That's the moment the server learns its count was wrong, and fixes it.

The count gets corrected in other ways too:
items are scanned in when new stock arrives,
and staff recount the shelves regularly.

So the number you see is not someone watching the shelf live.
It's what the store expects to have, kept accurate with scans at every step.

Now, the delivery partner.

When your order comes in, it goes to the dark store closest to you.
Riders are usually waiting near that store.
While your items are being packed, the system picks a rider,
based on who is free, how close they are, and sometimes whether another order is heading the same way.

By the time your bag is packed, the rider is usually already there.
That's a big part of how 10 minutes is possible.

The lesson I took from this:
the app doesn't show what is physically on the shelf.
It shows what it has already promised away.

Have you ever gotten that "item not available" call after ordering?
Now you know where in the chain things broke.

#EverydayEngineering #SystemDesign #LearningInPublic #QuickCommerce

---

## Behind the post (for you, not for posting)
- **Honesty check:** Blinkit and Zepto haven't published their exact internal design. This is how inventory reservation and dark-store picking generally work in quick commerce. That's why the post says "usually" and "often".
- **The core idea is a reservation:** available = on hand − reserved. This is the same idea as an authorization hold on a card payment. The money is held, not yet captured. If the order fails, the hold is released.
- **"Checks and reduces in one step":** this is an atomic update, for example `UPDATE stock SET reserved = reserved + 1 WHERE item_id = ? AND on_hand - reserved >= 1`. If two requests race, only one of them updates a row.
- **"Only 2 left" may not be the exact count.** Many apps show a low-stock badge only below some threshold, or cap what they display.
- **If someone asks "what if I never pay?":** the reservation usually has a timeout, so unpaid holds are released automatically.
