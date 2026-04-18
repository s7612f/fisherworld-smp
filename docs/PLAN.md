# Fisherworld SMP — Master Plan

## Goal

Run a Minecraft server on `fisherserver` for Seb + friends + girlfriend that stays interesting past the honeymoon week. The hook: **a real economy**, not a token one. Scarcity, property, wages, markets, debt, and a web layer that converts real-world effort into in-game wealth.

Small player count (5–10) means we don't need enterprise infra. We do need the systems to feel *alive* — a stock ticker moves even when you're logged out, rent comes due on Sunday, the bounty board always has work.

---

## The Three Layers

### 1. Survival Layer (unchanged Minecraft)
Vanilla 1.21.x survival. Keep the block game sacred. No creative flight, no /fly, no teleports-to-anywhere. Death still hurts.

### 2. Economy Layer (in-game capitalism)
Built from off-the-shelf plugins glued together. See [ECONOMY.md](ECONOMY.md) for the detailed mechanics. Headlines:

- **Currency:** Fisher Pounds (£). Earned via Jobs Reborn, trading, wages.
- **Property:** Towny handles plot ownership, rent, and taxes. Non-payment = eviction.
- **Shops:** QuickShop-Hikari chest shops. Player-set prices. Market forces.
- **Stock market:** StockMarket plugin. Player-run shops can go public and issue shares.
- **Banks:** CMI's economy module handles interest-bearing accounts and loans.
- **Jobs:** Jobs Reborn pays for labour. Players can also post private contracts via bounty board.
- **Auction house:** Global market for rare items.
- **Taxation:** Towny nation taxes fund town upkeep. Optional sales tax on shops.

### 3. Web Layer (the novel bit)
A static site on GitHub Pages + a small bridge service on `fisherserver` behind Cloudflare Tunnel. See [OUT-OF-GAME.md](OUT-OF-GAME.md).

- Players link their Minecraft account to a web profile via a one-time code.
- Web actions (verified chores, daily check-ins, mini-games, coaching hours logged) call the bridge, which RCONs a `pay` command into the server.
- The Pages site also shows live state: current prices, stock ticker, leaderboard, town map.

---

## Why This Should Actually Work

**Inflation discipline.** Jobs Reborn + web earnings inject currency; Towny rent + bank fees + auction cuts drain it. Tune the taps so prices don't spiral.

**Asymmetric roles.** Miner, farmer, builder, shopkeeper, landlord, financier. Everyone ends up specialising because the market rewards it. This is the thing that keeps people logging in.

**Real stakes.** If you don't pay rent, you lose your house. That's the difference between a game and a diorama.

**Girlfriend-friendly on-ramp.** She doesn't have to grind for 40 hours to own a diamond pickaxe. She does the dishes, gets credit on the web, buys one. Social glue, not a chore.

---

## Build Order

Phased so nothing is wasted if we stop early.

### Phase 0 — Server up (day 1)
- Install Paper 1.21.x on `fisherserver`.
- Open port 25565 via Cloudflare Tunnel or direct NAT.
- LuckPerms + EssentialsX baseline.
- Playtest with 2 people for one evening. Prove it's fun before adding systems.

### Phase 1 — Economy baseline (week 1)
- Vault + CMI (economy).
- QuickShop-Hikari (shops).
- Jobs Reborn (wages).
- BlueMap (public web map).
- This is already a noticeably better SMP than most.

### Phase 2 — Property & governance (week 2)
- Towny (land, rent, taxes).
- Seed one town that everyone starts in. Let a second form organically.

### Phase 3 — Financial instruments (week 3)
- Auction house plugin.
- StockMarket plugin.
- CMI bank accounts with interest.
- Bounty board (either a plugin or a Discord bot).

### Phase 4 — Web layer (week 4)
- GitHub Pages site live with docs + BlueMap embed + live leaderboard.
- Bridge service on fisherserver (see [bridge/](../bridge/)).
- Discord bot for chore verification.
- Link-your-account flow.

### Phase 5 — Tuning (ongoing)
- Watch the money supply. Adjust Jobs Reborn rates weekly.
- Add cosmetic perks as money sinks.
- Run quarterly events: tax holidays, stock splits, land auctions.

---

## Success Criteria

- All 5–10 invited players log in at least weekly for a month.
- At least one player specialises into a non-combat role (shopkeeper / banker / farmer-for-hire).
- The stock market has at least one real listing with actual trade volume.
- Girlfriend uses the web-earning layer at least once without being prompted.

## Anti-goals

- No pay-to-win with real money. Web earnings must come from effort, not cash.
- No grind-for-grind's-sake. If a system isn't producing interesting player behaviour in 2 weeks, cut it.
- No crypto. No NFTs. No blockchain. Just spreadsheets dressed up as a village.
