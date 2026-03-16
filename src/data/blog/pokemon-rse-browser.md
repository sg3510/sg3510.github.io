---
title: "Porting Pokemon GBA C code to Typescript"
date: 2026-02-22
description: "Testing the limits of coding agents by porting GBA Pokemon C code to TypeScript"
tags: ["ai", "coding-agents", "gamedev"]
---

A year ago I tried to use LLMs to render the [pokemon yellow overworld](https://sebgrubb.com/pokemon-tileset) but they struggled with the way the assembly had *very* efficiently packaged the tileset - Pokemon Yellow had a ROM size of 1 megabyte (MB)! Peter Hajas has a great
 [blogpost](https://peterhajas.com/#Parsing%20Pok%C3%A9mon%20Red%20and%20Blue%20Maps) about how this works. So the pokemon yellow overworld was very much a manual attempt.

Fast forward one year, I've been able to port, from [GBA c code](https://github.com/pret/pokeemerald), to typescript a large chunk of Pokemon Emerald. I'm not building an emulator but a fully native version of the game. This means you can do things like render the gameplay in a much larger viewport than GBA ever allowed. It's runnning with WebGL support to should be very smooth.

<div style="display: grid; grid-template-columns: 1fr 2fr; gap: 1rem; margin: 2rem 0; align-items: end;">
  <figure style="margin: 0; text-align: center;">
    <img src="/blog/images/pokeemerald-gba.png" alt="Pokemon Emerald on GBA" style="width: 100%; border-radius: 6px;" />
    <figcaption style="margin-top: 0.5rem; font-size: 0.85rem; color: var(--text-secondary);">Original GBA version</figcaption>
  </figure>
  <figure style="margin: 0; text-align: center;">
    <video src="/blog/images/pokeemerald-browser-gameplay.mp4" autoplay loop muted playsinline style="width: 100%; border-radius: 6px;"></video>
    <figcaption style="margin-top: 0.5rem; font-size: 0.85rem; color: var(--text-secondary);">Ported to TypeScript in the browser with a huge viewport</figcaption>
  </figure>
</div>

Building a game is also a great way to test coding CLIs to their limits - it's very visual and since it's for personal use you get to see how much of the porting can be one-shotted. They do pretty well when the task is defined but Codex still struggled when trying to implement the water reflection - i had to dig up the specific gba c code file to have it perfectly reproduce it.

[LLMs playing Pokemon](https://x.com/sundarpichai/status/1918455766542930004) have long been a fun benchmark but now we've beaten that our next benchmark will be to see if they can fully port old pokemon code!

Have a go below:
<div style="display: flex; gap: 1.5rem; margin-top: 1.5rem;">
  <a href="https://github.com/sg3510/pkmn-rse-browser" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.4rem; text-decoration: none; color: var(--text-primary);">
    <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
    Source code
  </a>
  <a href="https://sebgrubb.com/pkmn-rse-browser/" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.4rem; text-decoration: none; color: var(--text-primary);">
    <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
    Play it
  </a>
</div>