---
title: "Learnings from Amino"
date: 2026-03-16
description: "What I learned building Amino, an LLM-powered food logging app"
tags: ["llm", "startups", "app"]
---

Like a lot of startups, we ended up pivoting. Some describe it as another attempt to roll the dice, but I think it's important to say that there's actually a lot of thought that goes into pivoting. Usually, you've learnt lessons from what you were doing before, and you're highly motivated to make sure that whatever you choose next has a real chance of succeeding.

When we decided to pivot, I set these principles to help select what we would work on next[^1]:
- _the team must be interested in the area_: startups are hard, so making it fun will help with success
- _the idea can be validated fast_: time is scarce in startup land
- _the product is 10x better than the products you're up against_: you need to give users a reason to try it
- _there is good potential for growth_: your goal is to be successful

Food logging and coaching seemed like a promising candidate. We had all previously tried MyFitnessPal and understood the pain of logging a full meal, and we saw the opportunity that LLMs offered to drastically speed up the food logging flow and give people relevant advice on their eating habits. We also knew that if you make a product easier to use, your potential TAM grows a lot.

That's how we came to build [Amino](https://amino.fit). The goal was to build one of the easiest, yet most accurate, food logging apps out there. We built a whole pipeline that ensured each food result was grounded in an external database, rather than blindly handing everything to an LLM and risking hallucinations[^2].

<img src="/blog/images/early_amino_mock.png" alt="Early Amino mock" width="300" />

<small>Early Amino mock that incorporated some of our learnings, like the edit feature</small>

Here are some of the lessons I learnt along the way:

### Help users prompt effectively

We found that giving users an open-ended text field instead of a traditional UI flow meant they often didn't know how much detail was needed to get accurate output. Many would enter something like "chicken broccoli with rice", which made it really hard to estimate calories accurately[^3]. We solved this in two ways:
- _Educate users on how to log accurately_: both when they first opened the app and during the food logging flow, we included text reminding them to add details like estimated weight
- _Detect low-detail entries_: This was extremely high-impact. We simply ran each entry through an LLM prompt to detect whether it was detailed enough to return high-quality information. If it wasn't, we encouraged the user via the UI to edit the message to improve food-matching accuracy.

> For quality output you need quality input. The best AI products know this and help their users make quality inputs.

### Discovery is critical in AI apps

We noticed that a fair number of users would log some of their meals much later in the day — for example, they'd log their breakfast around noon, then edit the entry time to around 8am. Some even had entries like "for breakfast i had 3oz dry oats with a cup of skim milk and 50g strawberries". The fix was obvious: add a parallel step in our pipeline to detect time[^4].

However, after fixing this, the biggest issue was discoverability — users still just saw an open-ended text box. We could try to educate them in the UI, just like we did above, but there was a high risk of education fatigue. While we still highlighted this feature during onboarding, we also did targeted education:
- for users who had previously tried to log food with time information ('for dinner', 'yesterday', etc.), we identified them at scale and let them know the feature was live the next time they opened the app
- after users edited the time of an entry, we let them know they could simply specify the time in the food log itself

LLM interfaces tend to make products look simpler — think of ChatGPT — but, as a result, they can hide many great features. ChatGPT is a great example, since many people I talk to don't realise it can make graphs from data you give it.

### Find smart ways to get feedback fast

Features are being built faster than ever — the ways you get feedback should be just as fast.

Getting users to give quality feedback is actually pretty hard, especially at startup scale. However, feedback is critical as you grow and try to understand where your product is failing. Metrics like churn are pretty much lagging indicators, so you need to focus on leading indicators.

For us, we had a natural feedback loop that helped us understand how much users were enjoying our app: food delete rate and edit rate. These were great indicators of whether users didn't trust our output or felt they needed a more detailed prompt. These proved invaluable in improving our matching pipeline accuracy.

> If you're building a product, think about what metrics you can use as leading quality indicators. Thumbs up/down is the default one for LLM interfaces, but it's even better if you can find some imlicit metric that gives more coverage (e.g. for Instagram, dwell time is a good metric for understanding the success of its recommendation algorithm).

### Focus on real growth: charge your users

Our initial product was free and had great retention, but we, like many other startups, were too scared to charge — what if it drove all our users away? But as a startup, your goal is to build something valuable, and charging early is a great way to understand whether your product is actually useful.

For us, starting to charge was a great way to understand what features to prioritise. We set up a paywall with [RevenueCat](https://www.revenuecat.com/) and gave users a free trial to see what they would say when we tried to charge. If they declined, we would ask for feedback. This was tremendously useful, since a fair number of users who declined to pay said that the lack of Apple Health support was a major factor. This was one of the many features in our backlog, and it gave us a strong signal to prioritise it.

> You probably shouldn't try to charge straight away, but once you have signals that you have some PMF, like good retention or engagement, it's worth stepping back and considering charging users[^5].

### Users do like AI!

When we were figuring out how to grow, one of the things we tried was running ads on Google and Meta. I tested multiple versions of the ad copy: some said "the easiest/simplest/fastest food logging app", while another set just said "AI food logging app". I expected the former to perform better, since we were being upfront about the value provided, but to my surprise the ads that said "AI food logging app" actually had a much higher click-through rate. I expected consumers to be tired of ads that say "AI" everywhere, but that doesn't seem to be the case — we're still early.

_____________

LLMs are moving so fast that you could call Amino a v1 LLM-era app[^6] — we used vector search and chained prompting for deterministic LLM workflows. Models have finally gotten so good at tool calling that the "agentic" buzzword from about a year ago finally makes sense. I'm excited to build things in this new era. My cofounder and I have already played around with some of these ideas at [EA Team](https://ea.team) — an executive email assistant!

[^1]: There's plenty of good pivot advice — I suggest starting with Lenny's newsletter, [The art of the pivot - Lenny's Newsletter](https://www.lennysnewsletter.com/p/the-art-of-the-pivot-part-2-how-why).
[^2]: We doubled down on accuracy because we were targeting a fitness- and health-conscious audience that cared not just about calories, but also about macros. That mattered especially for our use case, even though the food-logging market itself is diverse, with distinct niches spanning weight loss, blood sugar/diabetes management, and fitness.
[^3]: In this case, our system was still as smart as it could be — for "chicken broccoli and rice", we would assume what was most likely, such as one chicken breast, a cup of *cooked* rice (1 cup of dry rice has vastly more calories!), and a cup of broccoli, which meant we handled most low-detail entries reasonably well.
[^4]: When I started building the time-extraction feature, I expected it to be really easy. But because we were using faster models like the mini or flash series, they would often fail to correctly extract the intended time. It took some creative tool-use engineering (by using `date-fns`) to get the accuracy on our test set to nearly perfect.
[^5]: Charging users doesn't necessarily mean doing it upfront — we experimented with both freemium and free trials. You should choose what's best for you. Also, if your product plans to monetise in other ways (like ads), or your company is competing with other companies flush with cash, then charging may not be the right move.
[^6]: Our initial attempt at a food-detection pipeline involved a more open-ended system that could decide where and how to retrieve info (e.g. split the food into sub-components, pull previous food logs, and search the database), but, like others at the time, we realised that tool-calling capabilities just weren't that good.