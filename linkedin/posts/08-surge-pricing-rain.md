# Post 08: Why the cab price almost doubles when it rains

**Status:** draft (for 2026-11-27) · **Topic:** apps & daily life · **Image:** `images/08-surge-pricing-rain.png`

---

Everyday Engineering #8

6 pm. Same ride I take every day.
Yesterday it was ₹180.
Today it's raining, and the app says ₹320.

My first thought: they're cashing in on the rain.
So I looked into how that price is actually decided.
It's not a person, and it's not one number for the city.

First, the city is cut into small hexagons.
A few blocks each.
Every hexagon gets its own price.

That's why moving 500 metres down the road can make the price drop.
You've walked into a different hexagon.

Then, every minute or so, each hexagon asks two questions:
How many people are opening the app here right now?
How many free drivers are nearby?

10 people and 10 drivers: normal price.
30 people and 6 drivers: the price goes up.

Rain breaks both numbers at the same time.

More people want a cab.
Nobody wants to walk to the metro or ride a scooter in the rain.

And fewer drivers are free.
Many bike riders log off.
Traffic slows down, so each driver finishes fewer rides per hour.

So why raise the price, instead of just making people wait?
Because the higher price does two jobs.

It makes some people wait 20 minutes, or take an auto.
And it pulls drivers in.
A driver two hexagons away sees your area light up on their map and heads over.

Without it, the app wouldn't show ₹180.
It would show "No cabs available".
Cheap, but no ride.

Some apps now go one step further.
They don't wait for people to start booking.
They read the weather forecast and predict the rush, so drivers are nudged towards the busy areas before the rain starts.

The trade-off is real.
Raise the price too fast and people feel cheated in the worst moment of their day.
Too slowly and everyone gets stuck.
That's partly why India's rules now cap how high it can go.

The ₹320 isn't really a price for you.
It's a message to the drivers: we need you here.

Do you pay the surge, or wait it out?

#EverydayEngineering #SystemDesign #ProductEngineering #LearningInPublic

---

## Behind the post (for you, not for posting)
- **Honesty check:** Uber has publicly explained surge pricing and its hexagon grid (it open-sourced H3, its hexagon system). Ola and Rapido haven't published how theirs works. The post describes the general pattern, not any one company's exact code. ₹180 and ₹320 are illustrative numbers.
- **Why hexagons and not squares:** every neighbour of a hexagon is the same distance from its centre. A square has 4 close neighbours and 4 diagonal ones that are further away, which makes "nearby demand" uneven. Hexagons also tile the map without gaps.
- **"Every minute or so":** Uber has said surge prices update every few minutes. The exact interval isn't public and varies, so the post keeps it vague.
- **The cap:** India's Motor Vehicle Aggregator Guidelines (2020) capped surge at 1.5x the base fare. Updated guidelines in 2025 allowed up to 2x. States implement these on their own, so it isn't the same everywhere. That's why the post just says "cap how high it can go." If someone asks for the number, say "2x the base fare under the 2025 central guidelines, depending on the state."
- **If someone brings up "they charge more when your battery is low":** an Uber economist once said people with low battery are more likely to accept a surge price. Uber has said it does not use battery level to set prices. Good to acknowledge, without claiming either way about other apps.
- **Upfront pricing:** most apps now show a fixed price before you book, so the surge is already included in it. Earlier, Uber showed "1.8x" explicitly. Hiding the multiplier is a product choice, because people react worse to "2x" than to a plain number.
- **The forecasting part (the AI angle):** demand forecasting models use time, day, events, weather and past rides to predict demand for each area in the coming minutes. Drivers then see "busy area" heatmaps. This is the light AI touch in a mostly non-AI post.
- **Driver incentives:** besides surge, apps also run "complete 5 rides in the next 2 hours, get ₹X" offers during rain. These pull in drivers without raising the rider's price.
