# Bridge Service

A small Node.js app that sits between the GitHub Pages site and the Minecraft server. Handles auth, rate-limiting, and converts web events into RCON commands.

## Endpoints

- `POST /link` — exchange 6-digit code + MC username for a JWT
- `POST /claim/daily` — daily check-in (authed)
- `POST /claim/chore` — chore verification webhook (signed by Discord bot, not player)
- `POST /claim/minigame` — submit minigame score (server-validated)
- `GET /leaderboard` — public, cached 60s
- `GET /market` — top traded items, cached 60s
- `GET /stocks` — current stock prices, cached 60s
- `GET /ledger` — public payout log

## Stack

- Node 20+
- Express
- `rcon-client` for RCON
- `better-sqlite3` for the link table + rate limits + ledger
- `jsonwebtoken` for JWTs

## Secrets

Via env vars:
- `RCON_HOST`, `RCON_PORT`, `RCON_PASSWORD`
- `JWT_SECRET`
- `DISCORD_WEBHOOK_SECRET` — HMAC secret shared with the Discord bot

## Skeleton

See [index.js](index.js) — not runnable yet, just the shape.

## Deploy

Run as another service in the same docker-compose as the MC server, on the same docker network so RCON stays internal.

```yaml
bridge:
  build: ./bridge
  environment:
    RCON_HOST: mc
    RCON_PORT: 25575
    RCON_PASSWORD: ${RCON_PASSWORD}
    JWT_SECRET: ${JWT_SECRET}
  ports:
    - "127.0.0.1:3000:3000"
  depends_on: [mc]
  restart: unless-stopped
```

Cloudflare Tunnel exposes `mc-bridge.sebastian-fisher.com` → `localhost:3000`.
