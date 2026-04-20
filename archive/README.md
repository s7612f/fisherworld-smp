# Archive

Stuff that was designed, documented, and partially built but is not part of the current server. Kept here so it is not lost if we want to revisit it.

## What is archived and why

### Real-world earning layer (`docs/OUT-OF-GAME.md`, `bridge/`)

The original plan included a web bridge that let players earn in-game currency from real-world actions: chore verification via Discord bot, logging coaching/Cambly hours, a daily check-in with streak bonuses, and browser mini-games.

It was removed because:
- The complexity (JWT auth, RCON bridge, Discord bot, SQLite) is not worth it for a small friend group
- "Earn money by doing dishes" turned out to be more gimmick than fun
- The economy is more interesting when earning comes from playing the game

If the server grows and we want to bring back an out-of-game layer, the design and partial implementation is here.

### Files

| File | What it is |
|---|---|
| `archive/docs/OUT-OF-GAME.md` | Full design doc for the web earning layer |
| `archive/bridge/index.js` | Node.js bridge service (RCON + JWT + SQLite) |
| `archive/bridge/README.md` | Bridge setup and deployment notes |
