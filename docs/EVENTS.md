# Events Calendar

All server events, recurring schedules, and upcoming one-offs.

---

## Recurring — Weekly

| Day | Event | Details |
|---|---|---|
| **Every Sunday midnight** | Rent due | Towny charges plot rent. 3 missed → eviction + auction. |
| **Every Monday 00:00** | Dividends paid | StockMarket pays weekly dividends from shop revenue to shareholders. |
| **Every Friday 7pm** | Flash auction | Admin lists 3–5 rare items at 50% market price in the auction house. First come, first served. Announced on Discord 1h before. |
| **Every Saturday** | Bounty refresh | Old unclaimed bounties expire. New ones posted on `#bounty-board`. |

## Recurring — Monthly

| Date | Event | Details |
|---|---|---|
| **1st** | Jobs Reborn rate review | Admin checks `/baltop` and adjusts Jobs pay rates up or down by up to 20% based on inflation data. Posted in `#announcements`. |
| **15th** | Stock dividend payout | Secondary dividend sweep — shops that missed Monday's auto-payout get manually settled. |
| **Last Sunday** | Tax holiday weekend | No Towny plot rent charged for 48h. Announced 3 days in advance. Good time to invite new players. |

---

## Quarterly Events

These are the big things. Each one requires planning and Discord coordination.

### Dragon Reset
- **Frequency:** Every ~3 months
- **What:** The End dimension is fully reset. All End cities, elytra, and shulker boxes are back. The Ender Dragon is alive again.
- **Format:** Admin announces the reset date 2 weeks in advance. Players form expedition parties. First party to kill the Dragon on the new End gets a prize chest of rare items + an in-game monument in spawn.
- **Why it matters:** Elytra are the most valuable non-craftable item in vanilla. Resetting the End gives everyone another shot, and creates a genuine race event.
- **Dates:** Jun 14 2026, Sep 20 2026, Dec 13 2026

### Nether Incursion (Wither Hunt)
- **Frequency:** Every ~3 months, offset from Dragon resets
- **What:** Admin spawns a Wither in a designated Nether arena. Open bounty of £500 posted for the killing blow. Anyone can participate. PvP enabled in the arena.
- **Format:** 1-hour window. Anyone who dealt damage gets a cut of a £1000 prize pool (proportional to damage dealt, tracked via CMI). Killing blow earns bonus £500.
- **Why it matters:** Forces cooperation and PvP in the same space. Good for player bonding and Discord drama.
- **Dates:** Aug 8 2026, Nov 7 2026

### World Border Expansion
- **Frequency:** Every quarter
- **What:** World border radius increases by 500 blocks. New biomes and unexplored land become accessible.
- **Format:** Admin posts a map of what's newly unlocked. First player to claim and name a new town in the expanded area gets a £200 founding grant. First to find a stronghold in new territory gets £300.
- **Why it matters:** Creates a land rush. Veterans have an advantage but new players can establish themselves in fresh territory.
- **Dates:** Jul 4 2026, Oct 3 2026, Jan 3 2027

### Seasonal Jobs Multiplier Week
- **Frequency:** Once per season
- **What:** One Jobs Reborn category gets 3× pay for a full week. Category rotates each season.
- **Schedule:** Spring = Farming, Summer = Mining, Autumn = Hunting, Winter = Woodcutting
- **Why it matters:** Floods a specific material into the market, drops prices, creates new trading opportunities. Miners stockpile for summer multiplier. Farmers dump wheat in spring. Healthy chaos.
- **Dates:** May 4 2026 (Farming), Aug 3 2026 (Mining), Nov 2 2026 (Hunting), Feb 1 2027 (Woodcutting)

---

## Server Milestones (One-Off)

| Date | Event |
|---|---|
| **20 Apr 2026** | 🚀 Server infrastructure live. Admin testing. |
| **25 Apr 2026** | 👥 Soft launch — friends + girlfriend invited. 4–6 players. |
| **4 May 2026** | 🏘️ Phase 2 — Towny goes live. Saffron founded. Plot sales open. |
| **18 May 2026** | 📈 Phase 3 — Auction house + StockMarket + bank loans. |
| **1 Jun 2026** | 🌐 Phase 4 — Web layer bridge live. Chore verification active. Account linking open. |
| **14 Jun 2026** | 🐉 First Dragon Reset |
| **4 Jul 2026** | 🗺️ First World Border Expansion (+500 blocks, new biomes unlocked) |
| **8 Aug 2026** | 💀 First Nether Incursion (Wither Hunt) |
| **1 Sep 2026** | ⚔️ mcMMO Season 1 officially begins — skills leaderboard resets |
| **20 Sep 2026** | 🐉 Second Dragon Reset |
| **3 Oct 2026** | 🗺️ Second World Border Expansion |
| **7 Nov 2026** | 💀 Second Nether Incursion |
| **13 Dec 2026** | 🐉 Third Dragon Reset |
| **25 Dec 2026** | 🎄 Christmas event — snow in spawn, double XP week, gift crates |

---

## Running an Event (Admin Checklist)

### Dragon Reset
- [ ] Announce in Discord 14 days before
- [ ] Post sign-up thread for expedition parties
- [ ] Back up End dimension folder
- [ ] Delete `world_the_end` folder at reset time
- [ ] Restart server — End regenerates fresh
- [ ] Post "The End is open" in announcements
- [ ] Track who gets the kill via CMI death log
- [ ] Award prize chest to killing party, place monument block in spawn

### Wither Hunt
- [ ] Announce 7 days before with arena coords
- [ ] Set WorldGuard flags: PvP on, mob-damage on, in arena region
- [ ] Pre-spawn Wither 5 mins before event time (it takes a moment to charge)
- [ ] Start CMI combat log tracking
- [ ] Post damage leaderboard in Discord during fight
- [ ] Pay out £1000 prize pool post-event
- [ ] Reset arena WorldGuard flags

### World Border Expansion
- [ ] Announce 7 days before with what biomes are opening (use BlueMap)
- [ ] Expand border via `worldborder set <new-size> <seconds>` (use 60-second gradual expand for drama)
- [ ] Post founding grant rules
- [ ] Track first new town claim via Towny
- [ ] Pay founding grant manually

---

## Economy Events (Admin-triggered)

These aren't scheduled — they're responses to market conditions.

| Trigger | Response |
|---|---|
| Diamond price > £250 | Admin sells 3 stacks from reserve to cool market |
| A player holds >30% of any stock | Antitrust warning in Discord, split shares if they don't sell |
| /baltop top-3 gap > 10× | Consider a wealth tax event (one-off 10% levy above £X, voted by players) |
| Server dead for >7 days | Emergency Tax Holiday + post in Discord + invite a new player |
