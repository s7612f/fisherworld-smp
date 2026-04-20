# Plugin Manifest

Paper 1.21.x. All plugins are free unless noted.

## Core

| Plugin | Purpose | Source |
|---|---|---|
| **PaperMC** | Server jar | papermc.io |
| **LuckPerms** | Permissions | luckperms.net |
| **EssentialsX** | Commands, homes, warps, kits | essentialsx.net |
| **EssentialsX-Spawn** | Spawn control | essentialsx.net |
| **Vault** | Economy API shim | spigotmc.org |
| **PlaceholderAPI** | Stat placeholders used by web bridge | placeholderapi.com |

## Anti-Cheat & Protection

| Plugin | Purpose |
|---|---|
| **GrimAC** | Anti-cheat (movement, combat). Free, Paper-native. |
| **CoreProtect** | Block logging + rollback for grief. Essential. |
| **WorldGuard** | Region flags — safe zones, PvP arenas, spawn protection |
| **WorldEdit** | Admin build tool |

## Economy

| Plugin | Purpose | Notes |
|---|---|---|
| **CMI** | Economy, banks, interest, portals, extras | Paid (~£17) — worth it for bank UI alone. CMI-Lite works too. |
| **QuickShop-Hikari** | Chest shops | Free |
| **Jobs Reborn** | Wages for labour | Free |
| **AuctionHouse** | Global auction for rare/bulk items | Free (NotTheEconomist fork) |
| **StockMarket** | Player + index stocks, IPOs, dividends | Free |

## World & Governance

| Plugin | Purpose | Notes |
|---|---|---|
| **Towny Advanced** | Towns, plots, rent, taxes, war | Free |
| **TownyChat** | Per-town and nation chat channels | Free |
| **BlueMap** | Live web map (served via HTTP, embed in Pages site) | Free |
| **Terra** | Custom terrain gen — much better looking than vanilla | Free, configure before first world gen |
| **Graves** | Drop a grave on death. Items recoverable, XP is not. | Free |

## Skills & Progression

| Plugin | Purpose | Notes |
|---|---|---|
| **mcMMO** | Skill trees: mining, combat, fishing, woodcutting, etc. Long-term progression layer. | Free |

## Social / Bridge

| Plugin | Purpose |
|---|---|
| **DiscordSRV** | Chat ↔ Discord bridge. Also used for chore verification webhooks. |
| **TAB** | Custom tab list showing player balance + job. Good for immersion. |

## Optional / Phase 5+

| Plugin | When | Why |
|---|---|---|
| **Slimefun** | Phase 6+ | Adds a full tech tree in plugin form — machines, custom items, industrial processes. Huge content drop but heavy. Only add if players want a reason to keep grinding. |
| **BentoBox** | If skyblock mode is wanted | Islands as a secondary world. Good for a "resource world" concept. |
| **HeadDatabase** | Anytime | Decorative player heads as shop items / cosmetics / money sinks. Cheap and visually good. |
| **CMI Portals** | Phase 2 | Fast travel between towns costs money (CMI charge-per-warp). |
| **ShopGUI+** | Phase 3 | Admin shop for starter items. Players can always sell/buy basics, which sets a price floor. |

## Required Config Flags

### server.properties
```
enable-rcon=true
rcon.password=<strong-random-password>
rcon.port=25575
online-mode=true
```

### bukkit.yml
```yaml
spawn-limits:
  monsters: 50   # reduce if performance suffers
  animals: 10
```

### WorldGuard — spawn region flags
```
/rg flag spawn pvp deny
/rg flag spawn mob-damage deny
/rg flag spawn chest-access allow
```

## Version Pinning

Once Phase 1 is live, record every plugin version in `docs/versions.lock`. **Never auto-update.** Minecraft plugins break in exciting and silent ways between versions. Update manually on a test world first.
