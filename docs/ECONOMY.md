# In-Game Economy Design

The goal is a recognisable market economy at small scale. Five to ten players shouldn't need a central bank, but they should feel the difference between being cash-poor and land-rich.

## Currency

**Fisher Pound (£)** — handled by CMI's Vault-compatible economy module.

Starting grant: £100 per new player. Enough for a few days' food, not enough to buy a house.

## The Money Supply

| Inflow | Outflow |
|---|---|
| Jobs Reborn wages | Towny plot rent & nation taxes |
| Mob bounties | Auction house 5% cut |
| Web-layer earnings (see OUT-OF-GAME.md) | Bank withdrawal fees (0.5%) |
| Quest rewards | Stock market trading fees |
| Shop sales (player-to-player) | Cosmetic perks (pets, particle trails, custom hats) |

Rough target: net neutral at week scale once the server is seeded. Track via `/balance top` and adjust Jobs Reborn multipliers if prices climb.

## Labour: Jobs Reborn

Seven jobs. Pick two per player at a time. Switching costs £50 to stop farming the same job cheaply.

- **Miner** — paid per ore broken, scaling with rarity
- **Farmer** — paid per crop harvested
- **Woodcutter** — paid per log
- **Builder** — paid per block placed (diminishing returns to prevent farming)
- **Hunter** — paid per hostile mob killed
- **Fisherman** — paid per fish caught
- **Enchanter** — paid per item enchanted, scaled by level

Players can also post **private contracts** via the bounty board (Discord command or plugin): "£500 to anyone who brings me 4 stacks of iron by Sunday." This is the real labour market.

## Property: Towny

- World starts with one seeded town, **Saffron** (the author's town).
- Town mayor can set plot prices and daily rent.
- Defaulting on rent for 3 days → plot repossessed, listed for auction.
- Nation tax funds town upkeep (a fixed weekly drain on the treasury).
- Wars are disabled initially. Governance, not PvP.

## Shops: QuickShop-Hikari

- Any chest + a sign = a shop.
- Players set their own buy/sell prices.
- No admin shops for staples — if you want bread, you buy it from another player or bake your own. This forces a real food market.
- One exception: a tiny admin shop sells *starter tools* at fixed prices to prevent new-player lockouts.

## Auction House

- Global listings with a 5% house cut (money sink).
- 24-hour listings. Bidding, not buy-it-now, for rare items.

## Banks & Interest (CMI)

- Players can deposit £ into bank accounts at a fixed 0.5% weekly interest.
- Loans available up to 2× current balance at 2% weekly interest.
- Missed loan payments → frozen balance, can't withdraw until repaid.

## Stock Market

Using [StockMarket](https://www.spigotmc.org/resources/stockmarket.91577/) or similar.

Two flavours:

**Index stocks** — proxies for real-world materials (`IRON`, `GOLD`, `DIAMOND`), prices move on a slow random walk daily. Purely speculative.

**Player stocks** — any player-owned shop with £5000+ in weekly revenue can IPO. Issue up to 100 shares. Dividend pays out weekly from 10% of shop revenue. Share price floats based on trades on the exchange.

This is the thing most SMPs don't have, and it's what turns the economy from "shops" into "capitalism."

## Taxation

Two layers:
1. **Nation tax** — flat weekly fee per citizen. Funds town upkeep.
2. **Sales tax (optional)** — Towny supports a % cut on shop sales within town limits. Disabled at launch, can be enabled per town.

Progressive income tax is too complex for the player count — skip it.

## Money Sinks (important)

Without drains, everyone ends up rich and nothing matters. The drains:

- **Rent** — the big one, steady daily bleed
- **Auction cut** — 5% of big-ticket trades
- **Cosmetics** — pets, particle trails, custom chat colours, custom death messages. Pure vanity, nothing gameplay-altering. £500–£5000 each.
- **Fast travel** — warps cost £10–£50 depending on distance. Free for the first 30 days per player.
- **Revive insurance** — optional £20/week subscription that keeps your XP on death.

## The Role of the Author

Seb plays a dual role: regular player **and** the central bank / regulator. Controls:
- Jobs Reborn pay rates
- Bank interest rates
- Starter town rent
- Ability to mint or burn currency in emergencies (with public announcement so nobody cries foul)

This is fine for a friends-only server. On a public server it would be rigged. Here it's just the person who hosts the thing keeping the lights on.
