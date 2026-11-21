# Post 03: Why the bike on the map drives through buildings

**Status:** published 2026-11-21 · **Topic:** apps & daily life · **Image:** `images/03-map-bike-buildings.png`

---

Everyday Engineering #3

Ever watched your Rapido bike on the map
and seen it ride straight through a building?

The rider didn't. The app did.

Here's what's happening.

The rider's phone sends its location to the server every few seconds.
Not continuously. Every few seconds.

So your app doesn't get a smooth path.
It gets dots.
A dot here. A few seconds later, a dot there.

If the app just jumped the bike from dot to dot, it would look broken.
So it fills the gap with an animation.
It slides the bike from the old dot to the new one.

In a straight line.

Now picture the road turning a corner around a building.
One dot before the corner. The next dot after it.
The straight line between them goes right through the building.

That's the bike you saw.

GPS makes it worse.
In a city, the signal bounces off tall buildings,
so a dot can land a few metres off the road,
sometimes inside a building, or on the wrong side of the street.

So how do good apps fix it?

They don't trust the dots blindly.
They match each dot to the nearest road the bike could actually be on.
This is called snapping to the road.

Then, instead of a straight line, they move the bike along the road between the two dots, around the corner.

Many apps also ignore dots that jump too far to be real.
A bike can't move 300 metres in 2 seconds.

One more thing I found interesting.

To animate from one dot to the next, the app needs both dots.
So the bike you see is often a few seconds behind where the rider really is.

You're always watching the recent past.

As a mobile engineer, this is my favourite kind of problem.
The data coming in is rough.
The screen still has to feel smooth and believable.

Next time the bike cuts through a building, you'll know.
It's not the rider. It's the straight line between two dots.

Have you noticed this? Which app was it?

#EverydayEngineering #MobileDevelopment #ReactNative #SystemDesign #LearningInPublic

---

## Behind the post (for you, not for posting)
- **Honesty check:** Rapido, Uber and Swiggy haven't published exactly how their maps work. Location updates every few seconds, animating between points, map matching and filtering out impossible jumps are standard techniques. That's why the post says "many apps" and "often".
- **How often is "every few seconds"?** It varies by app and is often slower when the phone's battery is low or the app is in the background. Sending location constantly drains the rider's battery and uses data. That's the trade-off.
- **"Snapping to the road" has a proper name: map matching.** It can run on the server (before sending the location to you) or on the device. It's harder than "nearest road", because at a junction the nearest road might be the wrong one. Good matchers use the previous few dots and the direction of travel.
- **GPS in cities:** the problem of signals bouncing off tall buildings is called the urban canyon effect, or multipath. Accuracy can drop from a few metres to tens of metres.
- **Your React Native angle (if someone asks in comments):** in `react-native-maps`, you animate a marker to a new coordinate over a duration (for example, `animateMarkerToCoordinate` on Android, or `AnimatedRegion`). A good duration is close to the update interval, so the bike finishes moving just as the next dot arrives. You also rotate the marker to the direction of travel.
- **Why "a few seconds behind":** you can only animate toward a dot you've already received. Some apps instead *predict* where the bike is now from its speed and direction. That's smoother but can overshoot when the bike stops.
