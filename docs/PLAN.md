# Fisherworld SMP — Master Plan

## What This Is

A proper long-term SMP on `fisherserver` — not a test world that dies after a month. Built around a real economy (scarcity, property, wages, markets, debt), a full survival experience with custom terrain and events, and a web layer that lets real-world effort convert to in-game wealth.

Target player count: 5–15. Small enough that everyone knows each other, large enough for the economy to be interesting.

---

## The Four Layers

### 1. World Layer — it has to be beautiful and dangerous

Custom terrain gen via **Terra** (better than vanilla, no performance cost). The seed is hand-picked for:
- A large ocean biome near spawn → island towns are possible
- A nearby savanna plateau → natural defensive city site
- Deep cave systems within 500 blocks → early mining is rewarding
- A mesa/badlands within 1000 blocks → natural gold rush event

World border starts at 3,000 blocks radius. Expands quarterly as a server event. Nether and End never reset — they're canon.

Starter spawn is a small village (pre-built by admin before opening day) with:
- A notice board with current laws and bounties
- A bank branch (NPC, Vault-backed)
- A small market stall district
- A public mine entrance (depletes — people actually need to go further out)
- A tavern (cosmetic, but has a jukebox and a board for player messages)

### 2. Survival Layer — keep the block game sacred

Vanilla 1.21.x survival rules. No creative, no /fly outside of admin. Death hurts (graves plugin to recover items, but XP is gone). PvP is region-flagged: safe in towns, enabled in the wilderness and in dedicated arenas.

**Custom events run quarterly:**
- **Dragon Reset** — End is reset, a server-wide expedition organised, prizes for the kill group
- **Nether Incursion** — Wither spawned in the Nether, bounty posted on Discord, first group to kill it claims a chest of rare loot
- **World Border Expansion** — new biomes unlocked, admin-run land rush where unclaimed plots go to first settlers
- **Seasonal market events** — double Jobs Reborn pay in one category for a week, rotates each quarter

### 3. Economy Layer — real capitalism, small scale

See [ECONOMY.md](ECONOMY.md) for full mechanics. Summary:

- **Currency:** Fisher Pounds (£). Earned in-game via Jobs, shops, contracts. Earned out-of-game via web layer.
- **Property:** Towny — plots, rent, nation taxes, town upkeep. Miss rent → eviction → auction.
- **Shops:** QuickShop-Hikari chest shops. Player-set prices. Supply and demand actually moves.
- **Stock market:** Player-run shops can IPO and issue shares. Dividends paid weekly from shop revenue.
- **Banks:** CMI economy — interest-bearing deposits, player-to-player loans, withdrawal fees as a money sink.
- **Jobs:** Jobs Reborn pays for labour. Seven jobs, pick two. Private contracts via bounty board.
- **Auction house:** Global market for rare and bulk items.
- **Taxation:** Towny nation taxes fund town upkeep. Optional sales tax per town.
- **Skills:** mcMMO adds a parallel progression layer — the more you mine/fight/fish, the better you get at it. Creates meaningful specialisation even without economy.

### 4. Web Layer — the novel part

Real-world effort → in-game currency. See [OUT-OF-GAME.md](OUT-OF-GAME.md).

A static site on GitHub Pages + bridge service on `fisherserver` behind Cloudflare Tunnel. Players link their Minecraft account once, then:
- Daily check-ins drop small bonuses
- Verified real-world tasks (chores, gym, study) pay meaningful amounts
- Browser mini-games pay pocket change
- Work hours (coaching, Cambly) pay at parity with real earnings

The site also shows live state: market prices, stock ticker, leaderboard, BlueMap, bounty board.

---

## Why It Should Stay Alive Past Month One

**Asymmetric roles.** Miner, farmer, builder, shopkeeper, landlord, banker, mercenary. The economy rewards specialisation. Once someone has a profitable shop, they're invested. Once someone has a loan out to another player, they care about that player logging in.

**Real stakes.** Miss rent → lose your house. Take out a loan you can't repay → frozen balance. This is the difference between a game and a diorama.

**External earning.** The web layer means the server has a presence when you're not playing. Girlfriend doing the dishes earns while you're mining. The economy ticks even offline.

**Events calendar.** A server with nothing scheduled dies. A server with a Dragon Reset coming up on the 15th has people planning expeditions.

**mcMMO progression.** Long-term skill grind gives veterans something to show for their time beyond wealth. Skill leaderboard is a second status axis.

---

## Build Order

### Phase 0 — Server up (day 1)
- Paper 1.21.x on `fisherserver` (Docker Compose, see [SETUP.md](SETUP.md))
- LuckPerms + EssentialsX + EssentialsX-Spawn
- GrimAC anti-cheat
- CoreProtect logging
- Test: two players, one evening. Is it fun? Fix whatever isn't before continuing.

### Phase 1 — Economy baseline (week 1)
- Vault + CMI-Lite (economy)
- QuickShop-Hikari (shops)
- Jobs Reborn (wages)
- BlueMap (web map)
- Graves (item recovery on death)
- DiscordSRV (chat ↔ Discord)
- Pre-build spawn village before inviting anyone

### Phase 2 — Land & governance (week 2)
- Towny Advanced + TownyChat
- Seed the first town (Saffron) with pre-built market district
- Set town plot prices and daily rent

### Phase 3 — Financial instruments (week 3)
- AuctionHouse
- StockMarket plugin
- CMI bank accounts with interest
- Bounty board (Discord bot or plugin)

### Phase 4 — Skills & content (week 4)
- mcMMO (skill trees — mining, combat, fishing, etc.)
- Terra (custom terrain gen — requires new world or reset; do this before players settle)
- Custom item shops in spawn (lore books, cosmetics as money sinks)

### Phase 5 — Web layer (month 2)
- GitHub Pages site live (already done)
- Bridge service on fisherserver
- Discord bot for chore verification
- Account link flow (/weblink)
- Live leaderboard + market ticker pulling from bridge

### Phase 6 — Events & polish (ongoing)
- First Dragon Reset event
- First World Border Expansion
- Seasonal Jobs Reborn multiplier weeks
- Track /balancetop weekly, adjust rates

---

## Success Criteria

- All invited players log in at least weekly for 6 weeks
- At least one player specialises as shopkeeper / banker / farmer-for-hire
- The stock market has at least one real listing with actual trade volume
- Girlfriend uses the web layer at least once without prompting
- The server survives a 2-week "quiet period" and comes back for an event

## Hard Anti-Goals

- No pay-to-win with real money. Donations = cosmetics only.
- No grind-for-grind's-sake. If a system produces no interesting behaviour in 2 weeks, remove it.
- No crypto, NFTs, or blockchain. Just spreadsheets dressed as a village.
- Never wipe the economy without 2 weeks' notice and a server vote.
