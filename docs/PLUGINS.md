# Plugin Manifest

Paper 1.21.x. All plugins are free unless noted.

## Core

| Plugin | Purpose | Source |
|---|---|---|
| **PaperMC** | Server jar | papermc.io |
| **LuckPerms** | Permissions | luckperms.net |
| **EssentialsX** | Commands, homes, warps | essentialsx.net |
| **Vault** | Economy API shim | spigotmc.org/resources/vault |

## Economy

| Plugin | Purpose |
|---|---|
| **CMI** (or CMI-Lite) | Economy, banks with interest, portals, extras. CMI is paid (~£17); CMI-Lite is free and sufficient. |
| **QuickShop-Hikari** | Chest shops |
| **Jobs Reborn** | Wages for labour |
| **AuctionHouse** (NotTheEconomist or similar) | Global auction |
| **StockMarket** | Player + index stocks |

## World & Governance

| Plugin | Purpose |
|---|---|
| **Towny Advanced** | Towns, plots, rent, taxes |
| **TownyChat** | Per-town chat channels |
| **BlueMap** | Live web map |
| **CoreProtect** | Rollback griefing |

## Social / Bridge

| Plugin | Purpose |
|---|---|
| **DiscordSRV** | Chat bridge + bot hooks for chore verification |
| **PlaceholderAPI** | Used by web bridge to read player stats |

## Optional / Later

- **mcMMO** — skill trees. Adds grind, might be too much on top of Jobs Reborn. Defer.
- **Slimefun** — tech mod in plugin form. Huge content dump. Consider after Phase 5 if players want more depth.
- **dynmap** — alternative to BlueMap. Only if BlueMap has issues.

## RCON

Enable `enable-rcon=true` in `server.properties` with a strong password. The bridge needs it.

## Version Pinning

Pin every plugin version in `docs/versions.lock` once Phase 1 is up and running. Don't auto-update. Minecraft plugins break in exciting ways between versions.
