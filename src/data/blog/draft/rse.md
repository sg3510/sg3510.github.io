While I've built more serious, revenue generating, software - building a game as a side project is a  great way to test agents to their limits. I always want to be thoughtful when implementing features and really guide the architecture

Fun background: people have been testing models to see how good they are at playing pokemon by building custom harnesses and before models like gemini 2.5 could barely get past the first few badges. I had already gone down the rabbit hole of rendering pokemon red maps in the browser but that was gameboy code. I figured I could try something else - now that GPT can play pokemon, can it write a pokemon game!? I figured that fully from scratch would be hard so decided to give it something a bit more complex than just gameboy c code - the pokemon emerald gba c code.

- first tested to see how far giving claude code the gba pokemone emerald c with a simple prompt like port this to typescript - i knew it would fail i just wanted to see how it would fail: insight it basically tried to render maps
- i was familiar with the gameboy pokered codebase so I spent some time  learning about the pokeemerald codebase
- models don't necessarily think in scalable ways. eg when implementing the battle system it would import some of the values needed for pokemon despite there being a single file with all their stats - 
- somteimes the tests it writes are... just bad https://gist.github.com/bretonium/291f4388e2de89a43b25c135b44e41f0
- write your own harness. I initially set one up with mgba scripting to play the game in browser and in real emulation same time to test the diff and detect bugs
- models are still bad at visual understand for more intricate bugs eg layering


tldr: even though a lot fo the manual coding work is auaomtated the engineer brain is criitical to actually build good software.

I swtich a lot betweeen codex/gpt5.4 and claude code/opus4.6 . Nothing too surpirsing if you;ve read other reviews but claude code usually feels a bit faster at getting things done and notably a small step ahead for frontend/UI hwoever it would stuggle with porting low level code like coding a reflection shader. Codex even failed but once I pointed it to the exact C code with the correct transform matrix it was able to implemented sprite reflection (I also tried that with claude but it still failed). I think any good dev right now is switching between both because you get a good sense of what each model is better at.