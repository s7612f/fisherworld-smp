# Fisherworld SMP

A Minecraft survival server with a **functioning capitalist economy** — player shops, stock markets, property taxes, wage labour, loans, and a web layer that lets you earn in-game coins by doing real things outside the game.

Hosted on `fisherserver`. Live site: **[sebfisher.github.io/fisherworld-smp](https://sebfisher.github.io/fisherworld-smp/)** (replace with actual pages URL once published).

## The Pitch

Vanilla SMPs run on gift economies and shared chests. Fun for a weekend. Dead by week three.

This server treats the world like a tiny economy:

- **Land has a price.** Towns own plots. Plots have rent. Fall behind and you get evicted.
- **Labour has a price.** Jobs Reborn pays you for mining, farming, building. But nobody's stopping another player from paying you more to do it for them.
- **Capital compounds.** Banks pay interest. Loans accrue debt. A stock market lets you own pieces of shops without running them.
- **The web is part of the game.** A companion site credits your account for real-world stuff — chores verified over Discord, daily check-ins, mini-games, coaching-hours-tracked-and-logged. Your girlfriend doing the laundry becomes diamonds.

## Repo Layout

```
docs/      — the plan, plugin manifest, setup instructions
site/      — static GitHub Pages site (landing, market, stock ticker, mini-games)
bridge/    — sketch of the RCON bridge that lets the web talk to the server
```

## Where to Start Reading

1. [docs/PLAN.md](docs/PLAN.md) — the whole thing, top to bottom
2. [docs/ECONOMY.md](docs/ECONOMY.md) — how the capitalism actually works in-game
3. [docs/OUT-OF-GAME.md](docs/OUT-OF-GAME.md) — the web-earns-coins layer
4. [docs/PLUGINS.md](docs/PLUGINS.md) — exact plugin list and versions
5. [docs/SETUP.md](docs/SETUP.md) — fisherserver install steps
