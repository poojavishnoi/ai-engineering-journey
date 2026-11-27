# Post 08: Why the cab price almost doubles when it rains

**Status:** draft (for 2026-11-27) · **Topic:** apps & daily life · **Image:** `images/08-surge-pricing-rain.png`

---

Copy from the box below (GitHub has a copy button at its top right). Line breaks stay exactly as they are.

```text
Everyday Engineering #8

Why does the cab price almost double when it rains?

Yesterday at 6 pm, my usual ride home cost ₹180. Today it was raining, and the same ride showed ₹320. My first thought was that the app was cashing in on the rain. So I looked into how that price is actually decided, and it turns out to be a neat piece of engineering.

Here's how it works, in 5 steps:

1. The city is split into zones
• The map is divided into small hexagons, each a few blocks wide.
• Every hexagon gets its own price.
• That's why walking 500 metres down the road can sometimes make the price drop.

2. Each zone compares demand and supply
• Every minute or so, the system checks how many people are opening the app in that zone.
• It also checks how many free drivers are nearby.
• 10 riders and 10 drivers means a normal price. 30 riders and 6 drivers means the price goes up.

3. Rain hits both sides at once
• More people want a cab, because nobody wants to walk to the metro or ride a scooter in the rain.
• Fewer drivers are free, because many bike riders log off.
• Traffic slows down, so each driver finishes fewer rides per hour.

4. The higher price does two jobs
• It makes some riders wait 20 minutes or take an auto instead.
• It pulls in drivers from nearby zones, who see your area light up on their map.
• Without it, you wouldn't see ₹180. You'd see "No cabs available".

5. Some apps predict the rush in advance
• They read the weather forecast and estimate demand before it starts raining.
• Drivers get nudged towards busy areas before people even start booking.

The trade-off is a real one. If the price rises too fast, people feel cheated at the worst moment of their day. If it rises too slowly, everyone gets stuck. That's partly why India's rules now put a cap on how high it can go.

So the ₹320 isn't really a price aimed at you. It's a message to the drivers saying "we need you here."

Do you pay the surge, or wait it out?

#EverydayEngineering #SystemDesign #ProductEngineering #LearningInPublic
```

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
