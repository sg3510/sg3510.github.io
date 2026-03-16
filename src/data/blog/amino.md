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

### Help users prompt better & treat everything like a draft

By making a previous, structured flow, into a single open ended text entry we ended up finding that many users would also simplify what they would log  things like "a burger and a soda" which was too low information. The gold standard would be "3oz bun with 6oz patty, 30 gram amercain cheese and 12fl oz can" but requiring that for all entries from users was hard - so instead we spent some time education users in the input flow to be as descriptive as possible to nudge them to do so and improve the output. We also were able to detect clearly low quality entries with a simple LLM prompt and would sometimes suggest that the users improve the prompt and expain what's missing - that's how the edit message feature came to life. Once we implemented the feature that help users learn their entry wasn't detailed enough we saw the amount of these too simlistic food entries go down!

Once image models got better we added image support and same problem - users would sometimes upload pictures of say a salad and it was really hard to tell if there's something like oil in there that heavily impacted calories. We spent a while detecting through another piepleine which images are 'low info' or not to nudge users to enter text alongside the image.

Teaching users to prompt well will be even more importantly as we see the next wave of 'agentic' llm apps where users are influencing a whole workflow.

### Discovery is critical AI 

When you have a single text entry box, users can often get stuck and not know what to enter. For example we added a feature that allowed users to say "i had oats for bfast this morning" and have food logged at breakfast but the text box entry made it hidden so we added examples in the full screen food logging entry.


### Old habits never die
Once image models got better we added image upload support and something interesting haoppened - people started uploading pics of barcodes that completely broke our system! They had been tuahgt by previous apps to upload barcodes. It was luckily an easy fix but proof again that even users willing to try new products keep their old habits!

### RAG is not dead
I see everyone declare that RAG is dead but for us being able to ground results in a database and ensure users had accruate calorie & macro data couldn't have been done with RAG and it would be hard to ensure that current models have all the possilbe food database info in their training set (including new SKUs). RAG may however be changing - I've no

### Focus on real growth: charge your users
Our initial product was free and had great retention but we, like many other startups, were too scared to charge - what if it drives all our users away?

 started getting even more valuable feedback when we tried to start charging - that's actually how we added Apple Healthkit syncing support because when people declined to pay we asked for feedback and healthkit syncing was a decision factor. Amny startups pursue growth without trying to see if their users are willing to pay and once they try they have burnt a lot of cash to find out something they could have done earlier.



### Find smart ways to get feedback fast

Since the space is moving so fast it was crucial that we could quickly get user feedback, either implicitly or explicity. For us we would pay close attention to the rates of food prompts that were edited or deleted as it was a good signal that we hadn't succesffully identified the correct foods the first time


- *Consumer is really fun* if you're making something your users enjoy - people would reach out and be genuinely 
- The bar for MVP in consumer is getting even higher: we initially built a demo in react but that was clearly not going to work. But we had the backend working so we didn't even attempt to launch and instead focused on making
- many startups choose to launch multiple times (eg airbnb) and we did that too. We launched the web app just to see what people thought and it got us some initial feedback. for startups everyone is scared of launching a bad product and hurting their reputation but actually it gets you that feedback faster and the users you've disappointed may not come back stragith away but new users will always come and once you get your product right they will evangelise it. This was the case for me with Bard - I tested it and it was pretty bad. But once Gemini 2.5 came out I was like wow Google got their game back. Same happened to Anthropic when they didnt have the best models but then found their biggest growth with Claude Code.

- for consumer apps that compete with an non-AI equivalent speed is everything whcih is why we hyper-optimised the time to clicking submit for food to display in the app.
- Quality vs Ease of use: often a compromise startups need to choose where to draw the line - for use we had competiotrs that did no grounding and focused ruthelssly on growth (eg CalAI sold to MFP but didn't have any grounding - likely why it is being kept as a separate app because there is a market for easy logging but only directional value)
- Growth cannot be taught: we tried multiple routes but the one that really worked was partnering with small influencers. Ads worked well and i understood why evryone puts AI in their ads - 'fastest' food logger performed worse than AI food logger
- context is everything & rag is not dead its just changed: eg when logging food - coding agents actually do rag a ton they just mostly use grep or abstract syntax tree traversal
- chain prompting was great to make a less determinitics workflow more deterministic
- a lot of pressure for startups to be profitable and we tested paywall to understand
- pay some attention to competitors but not too much - for startups you will rarely be cometing with the same user and your job is to build a product that solves a user problem successfully (pmf)
- conusmer is harder than ever but success is very much there


What I would change if I rebuilt today
### Deliver even better UX

We offered single click logging but matching would still take a few seconds. Being able to

- we now have the inference speed - cerebras at similar cost and so I would use that to differentiate. Cerebras really is magic
- if we had more runway I would have tried to push out paywall out - thoguh it did teach me a lot on how to setup a paywall strategy
- make a more agentic flow - while a trendy word this actually makes sense: now that we have fast inference AND models that are finally good a correct tool use making the pipeline be able to choose what tool to call if needed eg "i had 2 eggs" or understand if its a barcode and call those tools - back then the llm thought it could read barcodes but clearly couldnt and would hallucinate them (they do to this day) 

The success story here is CalAI that focused just on growth and exited to MFP - thouhg unsure about sustainability if they dont fix logging quality.

Draft:
We tried a few things, including a code-documentation agent, [Otterdoc](https://codescribe.co) which seemed promising since devs do hate writing documentation but the models at the time were only so good (and quickly blew past able to write code!)

[^1]: There's plenty of good pivot advice - I suggest starting with Lenny's newsletter [The art of the pivot - Lenny's Newsletter](https://www.lennysnewsletter.com/p/the-art-of-the-pivot-part-2-how-why).
[^2]: The reason we doubled down on accuracy was because we wanted to target a fitness & health conscious crowd that cared not only about the calories but also the macros that may not be relevant for other use cases. The food logging industry has a surprisingly diversity of apps and there's multiple niches from focusing on weight loss to blood sugar to fitness.