# Launch & Growth Plan

From "server exists on fisherserver" to "people are logging in weekly and the economy is actually running."

---

## Part 1 — Getting the Server Live

### Week 0 — Infrastructure

**Day 1**
- [ ] Deploy Paper 1.21.x on fisherserver via `docker-compose up` (see [SETUP.md](SETUP.md))
- [ ] RCON enabled, bound to loopback
- [ ] LuckPerms + EssentialsX installed and configured
- [ ] Test connection from your own client. Fix anything broken before inviting anyone.

**Day 2–3**
- [ ] Install Phase 1 plugins: CMI-Lite, Vault, QuickShop-Hikari, Jobs Reborn, BlueMap
- [ ] Set up the starting town **Saffron** (you are mayor)
- [ ] Set reasonable Jobs Reborn pay rates (see below)
- [ ] Configure BlueMap, confirm it renders at `map.sebastian-fisher.com`
- [ ] Spend an evening playing solo. Is it fun? Is it stable?

**Day 4–5**
- [ ] Invite one other person (girlfriend or closest mate) to test
- [ ] Watch what they do. Do they get confused? Do they get bored?
- [ ] Fix the two most obvious friction points before the wider invite

**Day 6–7**
- [ ] Install Towny, CoreProtect, DiscordSRV
- [ ] Set up the Discord server. Channels: `#general`, `#fisherworld`, `#economy`, `#bounty-board`, `#announcements`
- [ ] Link DiscordSRV to `#fisherworld`
- [ ] Write a one-paragraph welcome message for new players. Pin it.

---

### Starting Economy Settings

These are conservative. Adjust after week 1 based on balance top.

| Jobs Reborn job | Pay per action |
|---|---|
| Miner — coal | £0.02 |
| Miner — iron | £0.10 |
| Miner — gold | £0.25 |
| Miner — diamond | £1.50 |
| Farmer — wheat | £0.02 |
| Farmer — carrot/potato | £0.03 |
| Woodcutter — oak log | £0.01 |
| Builder — block placed | £0.005 (capped 500/day) |
| Hunter — zombie/skeleton | £0.04 |
| Hunter — creeper | £0.10 |
| Fisherman — fish caught | £0.08 |

**Targets at week 1:** active player earns £10–£30/day from Jobs alone. Plot rent in Saffron town: £5/day. That means you need to actually play to keep your house — but it's not punishing.

---

### Seed the World Before Anyone Joins

People don't want to be first. Give them something to react to.

- Build a small market district in Saffron with 3–4 chest shops stocked with starter goods
- Post two open bounties in `#bounty-board` (e.g. "£40 for 2 stacks of iron — DM me")
- Make the stock ticker on the site show real (even if manually seeded) prices
- Write a changelog entry dated launch day. Makes it feel like a real project.

---

## Part 2 — Soft Launch (Friends & Girlfriend)

Target: 4–6 players, people you can actually talk to.

### The Invite

Don't just share an IP. Send a proper invite — Discord DM or voice call — that explains what makes this different. Something like:

> "I've set up a Minecraft server but it actually has an economy — you can own land, run shops, buy shares in other people's shops. There's also a website where you can earn in-game money by doing real stuff. Girlfriend has been earning by logging gym sessions. First 10 people in get a plot in the starter town and £25 starting cash."

The website is your hook. "There's a site" makes it feel real and different from every other SMP invite.

### Onboarding Checklist (for each new player)

- [ ] Send them the site URL + Discord invite before the server IP
- [ ] Walk them through `/weblink` → account link in the first session
- [ ] Give them the starter pack: £25 cash, basic tools from the admin shop
- [ ] Show them the bounty board. Explain that other players will pay for work.
- [ ] Show them one chest shop. Let them buy something.

Don't lecture. Let them find things. But make sure the first 20 minutes has a clear goal: "earn enough to rent a plot."

---

## Part 3 — Going Wider

Once the economy is seeded and stable (call it 4 weeks in), you can open it further.

### Target Audience

This server's niche is specific: people who find standard SMPs shallow, who like game systems, who might be students or young professionals. Not hardcore PvP players, not creative builders — **people who like the meta-game**.

Communities to post in:

| Community | What to say |
|---|---|
| r/admincraft | "I built a capitalist economy in Minecraft with a companion web app — here's how" (technical post, not just advertising) |
| r/feedthebeast | If you add Slimefun in Phase 5, post there |
| r/playsmc | Direct server listing |
| r/Minecraft subreddit | Post the concept + site screenshot, no direct IP (they'll ask) |
| Planet Minecraft | Server listing with proper screenshots |
| Minecraft server lists | minecraft-server-list.com, topg.org, minecraftservers.org — all free |
| TikTok / YouTube Shorts | 60-second "I made Minecraft capitalism" — this is the real growth vector |

### Social Content Strategy

The economy angle is the hook. People share novelty.

**Post ideas:**
- Screenshot of the stock market table with a caption like "my Minecraft girlfriend bought shares in my diamond shop"
- The bounty board concept — "you can hire players as labourers in my SMP"
- Time-lapse of Saffron town growing over weeks
- "Someone took out a loan to fund their shop and now owes me interest" story
- The out-of-game layer — "she did the dishes, she's now in-game richer than me"

One good TikTok or tweet that lands will do more than any server listing. Make the content about the *idea*, not the server IP.

### Reddit Post Template

For r/admincraft:

```
Title: I built a working capitalist economy in Minecraft — stock market, 
       player IPOs, bank loans, and a web layer that earns IRL effort

Built with: Paper 1.21.x, Towny, QuickShop-Hikari, Jobs Reborn, CMI, 
StockMarket plugin

The novel bit: a companion website lets players link their Minecraft 
account and earn in-game currency for real-world actions — gym sessions 
verified by a Discord bot, daily check-ins, mini-games.

My girlfriend doesn't play Minecraft much but she's the second-richest 
player on the server because she does the dishes.

Site: [link]
Full plan/docs: [github link]
Happy to share config files.
```

Technical posts with docs and open source configs do well on that sub. Don't post the IP there — you want people asking.

---

## Part 4 — Keeping Players Active

The number one killer of SMPs is: nothing to do after the first two weeks.

### Weekly Events

Pick one per week, rotating:

- **Tax holiday** — no plot rent for 48 hours, announced in Discord
- **Flash auction** — you list 3 rare items in the auction house at 7pm on Friday, first-come-first-served at 50% market price
- **Bounty spike** — double payout on all bounty board jobs for 24 hours
- **Stock event** — simulate a "diamond shortage" by halving the DIAMOND index for a week. Watch players react.
- **New plot release** — open a new district in Saffron, 10 plots, first come first served

### Feedback Loop

After week 1, after week 4, ask players directly: "what's the most annoying thing about the economy?" Fix the top answer. Do it publicly in `#announcements`. People stay when they feel heard.

### The Girlfriend Retention Problem

Non-gamer partners drop off when there's nothing to *do* that isn't just Minecraft. The web layer is specifically for this. Make sure:

- The daily check-in is genuinely rewarding (don't let it go stale — run streak events)
- New mini-games get added every few weeks
- The chore category list includes things she actually does
- Her character has a role in-game she picked (banker? shop owner?) not just "tag along"

---

## Part 5 — If It Actually Takes Off

If you hit 20+ concurrent players, the architecture changes. Considerations:

- Upgrade fisherserver RAM allocation (currently planning 6G, might need 10G+)
- Move from CMI-Lite to full CMI for proper banking UI
- Add a proper web app (not just static Pages) for the bridge — authentication, a real DB, proper rate limiting
- Consider a donation tier: perms-only, never pay-to-win. Cosmetics only. Cover hosting costs.
- Hire a moderator. Even one trustworthy regular player with ban perms makes a huge difference.
- At this scale: anti-cheat (Grim), grief logging (already have CoreProtect), and a clear rules page.

You won't need this for months if at all. Build for the player count you have, not the one you want.

---

## Timeline Summary

| When | What |
|---|---|
| Week 0 | Server up, stable, solo tested |
| Week 1 | Soft launch — friends + girlfriend, 4–6 players |
| Week 2 | Towny + economy running, web link live, Discord active |
| Week 3 | First weekly event, check economy balance, fix friction |
| Week 4 | Audit: is it fun? Who's still logging in? Why? |
| Month 2 | Stock market + auction house + bank loans |
| Month 2–3 | First public post (Reddit/TikTok) if the core group is happy |
| Month 3+ | Respond to growth, don't force it |
