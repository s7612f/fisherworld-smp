# Out-of-Game Earning Layer

The novel part. Real-world effort → in-game currency. This is what makes the server feel like it exists when you're at work, and what gives non-gamer partners a low-friction way in.

## Why

A Minecraft economy is a closed system. Everyone mines, everyone trades, eventually balances equalise. Injecting currency from outside the game adds a second axis — real life — and dramatically widens who can participate.

Your girlfriend doesn't want to spend 3 hours mining cobble. She *does* want to buy a cat with pink particles. If doing the washing up earns her £5 Fisher Pounds, both of you win.

## Architecture

```
[ GitHub Pages site ]  <-- static HTML/CSS/JS, hosts docs, market, leaderboard, mini-games
         |
         | fetch() / POST with player JWT
         v
[ Bridge service ]     <-- small Node app on fisherserver, behind Cloudflare Tunnel
         |
         | RCON
         v
[ Minecraft server ]
```

**Bridge service** lives on fisherserver, listens on a tunnel hostname (e.g. `mc-bridge.sebastian-fisher.com`). Verifies JWTs, rate-limits, and issues RCON `eco give <player> <amount>` commands.

See [bridge/](../bridge/) for a working sketch.

## Account Linking

1. Player types `/weblink` in-game. Server returns a 6-digit code.
2. Player visits the Pages site, enters code + Minecraft username.
3. Bridge verifies the code matches (stored in SQLite for 10 minutes), issues a JWT, and stores the web↔MC link.
4. JWT stored in localStorage. Now all web actions are attributable.

## Earning Mechanisms

### 1. Daily Check-in
- One free £3 per day for opening the site and clicking the button.
- Streak bonus: 7-day streak = +£10, 30-day = +£75.
- Prevents grinding. Rewards habit.

### 2. Real-World Chore Verification
- Discord bot posts "did you actually do the dishes?" prompts.
- Partner confirms with a reaction. Bot fires bridge webhook. Coins credited.
- Works for household chores, gym sessions, study hours, anything the group agrees on.
- Rates set per-category in config. Dishes = £5. Gym session = £12. Two hours of coaching prep = £20.

### 3. Mini-Games (on the Pages site)
Four small browser games, each capped at £10/day per player to prevent botting:
- **Block Breaker** — quick reaction clicker, pays per block broken
- **Ore Sorter** — memory/matching, pays per round completed
- **Price Guesser** — guess the current in-game market price of an item, pays per correct guess (also surfaces real market data to players)
- **Trivia** — Minecraft + UK general knowledge, daily question

### 4. Coaching / Cambly Hours Logged
- Seb's coaching and Cambly hours can be self-reported on the site (honour system among friends).
- Converts at £1 Fisher per £1 real. Thematic, not balance-breaking — caps at £40/day.
- Also just a nice way to motivate grinding real work by gamifying it.

### 5. Bug Bounty
- Anyone who reports a server exploit or docs typo and gets it merged: £50–£500 depending on severity.

## Anti-Abuse

- JWTs expire weekly. Forces re-link.
- Bridge rate-limits per-account (max 20 payouts/hour).
- All payouts logged to a public ledger page on the Pages site. If someone's farming, everyone sees it and we laugh at them.
- Chore verification requires a *second* player to confirm, not the earner.
- Minigame scores server-validated via a secret seed, not client-trusted.

## Live Data Going the Other Way

The web layer isn't just input. The site also shows:
- **Leaderboard** — richest players, biggest landowners, most valuable shops
- **Market ticker** — live prices of top 10 traded items
- **Stock ticker** — current share prices and 24h change
- **Town map** — BlueMap iframe
- **Bounty board** — current open contracts, claim via the site

This stuff pulls from the bridge's read endpoints, which in turn query the server via RCON + a couple of plugin REST APIs (QuickShop has one; BlueMap ships with one).
