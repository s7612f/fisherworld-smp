# fisherserver Setup

Assumes the existing `fisherserver` box (Ubuntu, Docker, Cloudflare Tunnel already in place — see memory notes).

## 1. Server Process

Run Paper as a Docker container using [itzg/minecraft-server](https://github.com/itzg/docker-minecraft-server) — it handles version pinning, plugin downloads, and restart-on-crash.

```yaml
# ~/docker/minecraft/docker-compose.yml
services:
  mc:
    image: itzg/minecraft-server:latest
    container_name: fisherworld
    ports:
      - "25565:25565"
      - "25575:25575"   # RCON, bind to loopback in prod
    environment:
      EULA: "TRUE"
      TYPE: PAPER
      VERSION: "1.21.4"
      MEMORY: "6G"
      DIFFICULTY: normal
      MODE: survival
      MOTD: "Fisherworld — capitalism with blocks"
      ENABLE_RCON: "true"
      RCON_PASSWORD: "CHANGE_ME"
      OPS: "Sebastian"
      SPIGET_RESOURCES: "34315,100115,4199"  # LuckPerms, QuickShop-Hikari, Jobs Reborn — IDs TBC
    volumes:
      - ./data:/data
    restart: unless-stopped
```

Bind RCON to loopback (`127.0.0.1:25575:25575`) so only the bridge (on the same host) can reach it.

## 2. Plugins

`SPIGET_RESOURCES` auto-downloads from Spigot by resource ID. For everything else, drop jars into `./data/plugins/`.

Minimum Phase 1 set:
- LuckPerms
- EssentialsX + EssentialsXChat
- Vault
- CMI-Lite (or CMI)
- QuickShop-Hikari
- Jobs Reborn
- BlueMap

Restart the container after dropping jars.

## 3. Cloudflare Tunnel

Existing tunnel on fisherserver. Add two ingress rules:

```yaml
- hostname: map.sebastian-fisher.com
  service: http://localhost:8100   # BlueMap default
- hostname: mc-bridge.sebastian-fisher.com
  service: http://localhost:3000   # bridge service
```

Minecraft traffic itself (TCP 25565) doesn't go through the tunnel — point a DNS A record at the public IP, or use a TCP tunnel if IP exposure is a concern.

## 4. Bridge Service

See [../bridge/README.md](../bridge/README.md). Node.js, tiny. Runs as another Docker service, talks to RCON on the docker network.

## 5. BlueMap

Plugin generates tiles + serves its own webserver on `:8100`. The Pages site embeds this via iframe.

## 6. Backups

Daily cron on fisherserver tars `./data/world*` to `/mnt/backup/`. Hard to overstate how useful this is the first time someone griefs.

## 7. Discord

Create a Discord server, add a bot with message + reactions scopes. DiscordSRV config links channels to in-game chat. The same bot handles chore-verification reactions.
