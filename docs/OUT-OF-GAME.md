# Out-of-Game Earning Layer

Real-world effort → in-game currency. This is the thing that keeps the server alive when nobody's actually playing, and gives non-gamer partners a low-friction way in.

## Why It Exists

A Minecraft economy is a closed loop. Everyone mines, everyone trades, eventually balances equalise. Injecting currency from outside the game adds a second axis — real life — and dramatically widens who can participate.

Your girlfriend doesn't want to spend 3 hours mining cobble. She *does* want to own a house with pink banners and a cat. If doing the washing up earns her £5 Fisher Pounds, both of you win. If she goes to the gym and you're both richer for it, the server becomes genuinely motivating.

## Architecture

```
[ GitHub Pages site ]  <-- static HTML/CSS/JS
         |
         | fetch() with player JWT
         v
[ Bridge service ]     <-- Node app on fisherserver, Cloudflare Tunnel
         |
         | RCON
         v
[ Minecraft server ]
```

Bridge lives at `mc-bridge.sebastian-fisher.com` (Cloudflare Tunnel). Verifies JWTs, rate-limits, issues `eco give <player> <amount>` via RCON, logs every payout to SQLite (and to the public ledger page).

## Account Linking

1. Player types `/weblink` in-game → server returns a 6-digit one-time code
2. Player goes to the site, enters username + code → bridge verifies + issues JWT
3. JWT stored in localStorage → all future web actions are attributable to that player
4. Re-link required weekly (JWT expiry)

---

## Earning Mechanisms

### 1. Daily Check-in
- Click the button on the site once per day: **+£3**
- 7-day streak: **+£10** bonus
- 30-day streak: **+£75** bonus
- Rewards habit, not grinding. A busy day of Jobs Reborn pays 10× more.

### 2. Real-World Chore Verification
**The main feature.** Works via Discord:

1. Post `!chore <category>` in `#fisherworld`
2. Another linked player (not you) reacts ✅ within 30 minutes
3. DiscordSRV bot fires the bridge webhook → coins land next login

**Rates:**
| Chore | Pay |
|---|---|
| Washed up / loaded dishwasher | £5 |
| Cooked dinner for the house | £8 |
| Walked the dog | £3 |
| Gym session (≥30 min) | £12 |
| 2h study / coaching prep logged | £20 |
| Cleaned the bathroom | £10 |
| Food shop done | £6 |

Rates are per-server config. Admin can add/remove categories. The self-reporter can never be the verifier — needs another player to confirm.

### 3. Coaching / Work Hours
Self-report Cambly or coaching sessions on the Earn page.
- Converts at **£1 Fisher per £1 real earned** (i.e. if you did a £15 Cambly session, you get £15 Fisher)
- Capped at **£40/day** so it's meaningful but not dominant
- Honour system among friends — all entries go to the public ledger, everyone can see if someone's taking the piss
- This gamifies real-world work in the most direct way: doing your job makes you richer in the game too

### 4. Browser Mini-Games
Four small games on the site. Each capped at **£10/day total** to prevent botting:

| Game | Mechanic |
|---|---|
| **Block Breaker** | Reaction clicker — tap green blocks as they appear, 20 seconds |
| **Ore Sorter** | Memory/matching — sort ore types before the timer |
| **Price Guesser** | Guess the current in-game market price of an item (also teaches economy) |
| **Trivia** | One Minecraft + UK general knowledge question per day |

These are pocket change. Real income is from chores, jobs, and trading.

### 5. Bug / Exploit Bounty
- Report a server exploit, plugin bug, or docs error and get it merged
- **£50–£500** depending on severity
- Keeps the server honest and rewards people paying attention

---

## Anti-Abuse

- JWTs expire weekly → periodic re-link required
- Bridge rate-limits: max 20 payouts per account per hour
- Chore verification: second player must confirm, not the earner
- Coaching self-reports: public ledger, social pressure is the primary check
- Minigame scores: seed-validated server-side, not client-trusted
- All payouts visible on the public ledger page — if someone is farming, everyone sees it

---

## Live Data the Other Way

The web layer isn't just input. The site shows:
- **Market ticker** — live prices of top 10 traded items (from QuickShop REST API via bridge)
- **Stock ticker** — current share prices + 24h change
- **Leaderboard** — richest players, biggest landowners, most active shops
- **Town map** — BlueMap iframe embedded on the home page
- **Bounty board** — current open contracts, claim or post via Discord commands, visible here
- **Public ledger** — every payout, chore verified, check-in claimed — completely open

The bridge exposes read endpoints for all of the above. The Pages site polls them every 60 seconds.
