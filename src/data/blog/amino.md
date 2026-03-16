---
title: "Learnings from Amino"
date: 2026-03-16
description: "What I learned building Amino, an LLM-powered food logging app"
tags: ["llm", "startups", "app"]
---

Like a lot of startups, we ended up pivoting. Some say it is as another attempt to roll the dice but I think it's important to say that there's actually a lot of thought that goes into pivoting - usually you've learnt your lessons from what you were doing before and you are really motivated to ensure that what you choose next will be successful.

When we decided to pivot I set these principles to select what we would work on next[^1]:
- _the team must be interested in the area_: startups are hard, making it fun will help with success
- _the idea can be validated fast_: time scarce is scarce in startup land
- _the product is 10x better than the products you're up againts_: you need to give users a reason to try 
- _there is good potential for growth_: your goal is to be successful


Food logging and coaching was a promising candidate - we had all previously tried MyFitnessPal and understood the pain of logging a full meal and saw the opportunity that LLMs offered to drastically speed up and food logging flow and be able to give people relevant advice on their food eating habits. We also knew that if you make a product easier to use, your potential TAM grows a lot.

That's how we came to build [Amino](https://amino.fit) - the goal was to build one of the easiest yet most accurate food logging apps out there. We built a whole pipeline that ensure each food result was grounded in an external database rather than just blindly give it to an LLM at risk of hallucinating [^2].


<img src="/blog/images/early_amino_mock.png" alt="Early Amino mock" width="300" />

<small>Early Amino mock that incorporated some our learnings like the edit feature</small>

Here's some of the lessons I learnt along the way:

### Help users prompt

We found that giving users an open-ended text field instead of a traditional UI flow meant they didn't know what level of detail was required to get accurate output. Many would enter something like "chicken broccoli with rice" which would be really challenging to give them accurate calories[^3]. We solved this in two ways
- _Educated users how to accurate log_: both at first app open and during the food logging flow we had text reminding them to add info like estimate weight 
- _Detect low detail entries_: This was extremely high-impact - we would simply run each entry via a simple LLM prompt to detect if the food entry was detailed enough to return good quality info. If it wasn't we would encourage the user via the UI to edit the message to improve food matching accuracy.

The best AI products shouldn't require your users to be prompt engineers.

### Discovery is critical in AI apps

We noticed that a fair amount of users would log some of their meals a lot later in the day - i.e. they'd log their breakfast around noon then edit the entry time to be around 8am. Some even had entries like "for breakfast i had 3oz dry oats with a cup of skim milk and 50g strawberries". The fix was obvious - add a parallel step in our pipeline to detect time[^4].

However after fixing this the biggest issue was discoverability - users just saw an open ended text box. We could try to educate them in the UI just like we did above but there was a high risk of education fatigue. While we still highlighted this feature during onboarding we also did targeted education:
- for users who had previously tried to log food with time information ('for dinner', 'yesterday' etc) we identified them at scale and let them know on next app open it was now launched
- after users edited the time of an entry we let them know they could simply specify them time in the food logging phrase

LLM interfaces tend to make products look simpler, think of ChatGPT, but as a result hide many of great features. ChatGPT is a great example since many people I talk to don't realise it is able to make graphs of data you give it.

### Find smart ways to get feedback fast

Features are being built faster than ever - the ways you get feedback should be just as fast.

Getting users to give quality feedback is actually pretty hard, especially at a startup scale. However feedback is critical as you grow to understand where your product is failing - metrics like churn are pretty much a lagging indicator so you need to focus on leading indicators.

For us we had a natural feedback loop we used to understand how much users were enjoying our app - food delete rate and edit rate. These were great indicators of whether users didn't trust our output or thought they needed a more detailed prompt. These proved invaluable in improving our matching pipeline accuracy.

If you're building a product think about what metrics you can use as leading quality indicators - thumbs/up down is the default one for LLM interfaces but it's even better if you can find some metric with more coverage (eg for instagram dwell time is a good metric to understand the success of their recommendation algorithm).

### Focus on real growth: charge your users
Our initial product was free and had great retention but we, like many other startups, were too scared to charge - what if it drives all our users away? But as a startup, your goal is to build something valuable and charging early is a great way to understand if your product is useful.

For us, starting to charge was a great way to understand what features to prioritize. We setup a paywall with [RevenueCat](https://www.revenuecat.com/) and gave users a free trial and see what they would say when we tried to charge - if they declined we would ask for feedback. This was tremendously useful since a fair amount of users who declined to pay stated that lack of Apple Health support was a large factor. This was one of the many features in our backlog and gave us good signal to prioritize it.

You probably shouldn't try to charge straight away but once you have signals that you have some pmf like good retention or engagement it's worth stepping back and consider charging users[^5].

### Users do like AI!
When we were figuring out how to grow one of the things we tried were Google and Meta ads. I tried multiple ads copy, some whcih said "the easiest/simplest/fastest food logging app" and another set that just said "AI food logging app". I expected the former to be succesfful since we were upfront about the value provided but to my surprise the ads that said "AI food logging app" actually had a much higher click-through-rate! I expected consumers to be tired of ads that say AI everywhere but it seems that isn't the case - we're still early.

_____________
LLMs are moving so fast that you could call Amino a v1 LLM app[^6] - we used vector search and chained prompting for deterministic LLM workflows but now that models are not only a lot better at writing code but also at tool calling we're moving into a v2 era with all the buzzwords like agentic workflows. I'm 


[^1]: There's plenty of good pivot advice - I suggest starting with Lenny's newsletter [The art of the pivot - Lenny's Newsletter](https://www.lennysnewsletter.com/p/the-art-of-the-pivot-part-2-how-why).
[^2]: We doubled down on accuracy because we were targeting a fitness- and health-conscious audience that cared not just about calories, but also about macros. That mattered especially for our use case, even though the food-logging market itself is diverse, with distinct niches spanning weight loss, blood sugar/diabetes management, and fitness.
[^3]: In this case our system was still as smart as it could - for "chicken broccoli and rice" we would assume what was most likely such one chicken breast, a cup of *cooked* rice (1 cup of dry rice has vastly more calories!) and a cup of broccoli which meant we did fine with most low detail entries.
[^4]: When I started building the time extraction feature I expected it to be really easy but since, to be fast, we were using models like the mini or flash series they would often fail to correctly extract intended time. It took some creative tool-use engineering (by using `date-fns`) to finally get the accuracy from our test set nearly perfect.
[^5]: Charging users doesn't necessarily mean doing it upfront - we experimented with both freemium and free trials. You should choose what's best for you. Also if your product plans to monetize in other ways (like ads) or your company is competing with other companies flush with cash then charging may not be the right move.
[^6]: Our initial attempt for food detection pipeline involved a more open ended pipeline that could decide where and how to retrieve info (eg split the food up into sub-components, pull previous food logs and search the database) but, like others at the time, realised that tool calling capabilities just weren't that good.
