# Web Layer

The website runs alongside the server — it's not an earning mechanism, it's a window into the economy. Everything that actually earns you money happens in Minecraft.

## What the site shows

- **Market ticker** — live prices of top traded items, pulled via bridge from QuickShop
- **Stock exchange** — current share prices, 24h change, player IPO listings
- **Leaderboard** — richest players, biggest landowners, most valuable shops
- **Town map** — BlueMap iframe
- **Bounty board** — current open contracts, post or claim via Discord then see them here
- **Public ledger** — every payout, every transaction, all visible

## The one web-only perk: daily check-in

Visiting the site and clicking once per day drops a small bonus (£3) into your in-game balance next login. Streak bonuses top out at £75 on day 30.

This is a reward for caring enough to check the site — not a meaningful income source. A few minutes of Jobs Reborn pays more.

## Mini-games (web)

Four small browser games capped at £10/day total to prevent abuse:

- **Block Breaker** — reaction clicker
- **Ore Sorter** — memory/matching
- **Price Guesser** — guess the current market price of an item (also teaches market awareness)
- **Trivia** — Minecraft + general knowledge, daily question

Again: these are pocket change. Real money is made in-game.

## Architecture

```
[ GitHub Pages site ]  <-- static HTML/CSS/JS
         |
         | fetch() with player JWT
         v
[ Bridge service ]     <-- Node app on fisherserver, behind Cloudflare Tunnel
         |
         | RCON
         v
[ Minecraft server ]
```

## Account linking

1. Player types `/weblink` in-game → server returns a 6-digit code
2. Player enters code on the site → bridge verifies, issues JWT, stores web↔MC link
3. JWT in localStorage → all web check-ins attributable to a player

## Anti-abuse

- Rate-limited to 20 bridge payouts/hour per account
- All payouts on the public ledger
- Minigame scores seed-validated server-side, not client-trusted
- JWTs expire weekly
