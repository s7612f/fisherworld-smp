# Fisherworld SMP - Master Plan

## What This Is

A proper long-term SMP on `fisherserver` for Seb, friends, and girlfriend. Built around a real in-game economy: scarcity, property, wages, markets, and debt. The hook is that the economy actually has stakes - miss rent and you lose your house, run a profitable shop and other players buy shares in it.

Target player count: 5-15. Small enough that everyone knows each other, large enough for the economy to mean something.

---

## The Three Layers

### 1. World Layer

Custom terrain via **Terra**. Seed hand-picked for:
- Large ocean near spawn (island towns are possible)
- Savanna plateau nearby (natural defensive city site)
- Deep cave systems within 500 blocks (early mining rewarding)
- Mesa/badlands within 1000 blocks (gold rush events)

World border starts at 3,000 blocks. Expands quarterly as a server event. Nether and End never reset - they are canon.

Spawn is a small pre-built village with a notice board, bank branch, market stalls, public mine, and a tavern.

### 2. Survival Layer

Vanilla 1.21.x. No creative, no /fly outside admin. Death hurts (Graves plugin recovers items, XP is gone). PvP is off in towns, on in wilderness and arenas.

Quarterly events keep things interesting:
- **Dragon Reset** - End wiped and regenerated, server-wide race to the Dragon, prize for killing party
- **Nether Incursion** - Wither spawned in a designated arena, £1000 prize pool split by damage dealt
- **World Border Expansion** - new biomes unlocked, land rush, founding grant for first new town
- **Seasonal Jobs multiplier** - one job category gets 3x pay for a week, rotates each season

### 3. Economy Layer

See [ECONOMY.md](ECONOMY.md) for full mechanics.

- **Currency:** Fisher Pounds (£). Earned by playing. Spent on land, goods, and services.
- **Jobs:** Jobs Reborn pays per action. Pick two jobs. Switching costs £10.
- **Shops:** QuickShop-Hikari chest shops. Players set prices. Supply and demand moves prices.
- **Property:** Towny manages plots, rent, and taxes. Miss rent three days in a row and your plot is repossessed and auctioned.
- **Auction house:** Global market for rare and bulk items.
- **Stock market:** Player-run shops can go public and issue shares. Dividends paid weekly from shop revenue.
- **Banks:** CMI handles interest-bearing deposits (0.5%/week) and player loans (2%/week). Miss repayments and your balance is frozen.
- **Skills:** mcMMO adds a parallel progression layer. The more you mine, fight, or fish, the better you get at it.

---

## Build Order

### Phase 0 - Server up (day 1)
- Paper 1.21.x on fisherserver (Docker Compose, see [SETUP.md](SETUP.md))
- LuckPerms + EssentialsX
- GrimAC anti-cheat
- CoreProtect logging
- Test with two players for an evening

### Phase 1 - Economy baseline (week 1)
- Vault + CMI-Lite
- QuickShop-Hikari
- Jobs Reborn
- BlueMap
- Graves
- DiscordSRV
- Pre-build spawn village before first invite

### Phase 2 - Land and governance (week 2)
- Towny Advanced + TownyChat
- Seed Saffron (starter town) with pre-built market district

### Phase 3 - Financial instruments (week 3)
- AuctionHouse
- StockMarket plugin
- CMI bank accounts with interest
- Bounty board (Discord bot)

### Phase 4 - Skills and content (week 4)
- mcMMO
- Terra (do before players settle - requires fresh world gen)
- Cosmetic item shops at spawn (money sinks)

### Phase 5 - Ongoing
- Watch /baltop weekly, adjust Jobs Reborn rates
- Add cosmetic perks as money sinks
- Run quarterly events (Dragon Reset, Wither Hunt, Border Expansion, Jobs multiplier week)

---

## Success Criteria

- All invited players log in at least weekly for 6 weeks
- At least one player specialises as shopkeeper, banker, or farmer-for-hire
- The stock market has at least one real listing with actual trade volume
- The server survives a 2-week quiet period and comes back for an event

## Anti-Goals

- No pay-to-win with real money. Donations are cosmetics only.
- No systems that produce no interesting behaviour after 2 weeks. Cut them.
- No crypto, NFTs, or blockchain.
- Never wipe the economy without 2 weeks notice and a server vote.
