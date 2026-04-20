// Fisherworld bridge — skeleton only, not production.
// Real implementation: wire up RCON, harden rate limiting, add HMAC on Discord webhook.

import express from "express";
import jwt from "jsonwebtoken";
import Database from "better-sqlite3";
import { Rcon } from "rcon-client";

const app = express();
app.use(express.json());

const db = new Database("bridge.db");
db.exec(`
  CREATE TABLE IF NOT EXISTS links (
    mc_username TEXT PRIMARY KEY,
    linked_at INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS pending_codes (
    code TEXT PRIMARY KEY,
    mc_username TEXT NOT NULL,
    expires_at INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS ledger (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mc_username TEXT NOT NULL,
    amount INTEGER NOT NULL,
    reason TEXT NOT NULL,
    at INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS claims (
    mc_username TEXT NOT NULL,
    kind TEXT NOT NULL,
    day TEXT NOT NULL,
    PRIMARY KEY (mc_username, kind, day)
  );
`);

const RCON_OPTS = {
  host: process.env.RCON_HOST || "localhost",
  port: Number(process.env.RCON_PORT || 25575),
  password: process.env.RCON_PASSWORD || "",
};

async function pay(user, amount, reason) {
  const rcon = await Rcon.connect(RCON_OPTS);
  try {
    await rcon.send(`eco give ${user} ${amount}`);
  } finally {
    await rcon.end();
  }
  db.prepare(
    "INSERT INTO ledger (mc_username, amount, reason, at) VALUES (?, ?, ?, ?)"
  ).run(user, amount, reason, Date.now());
}

function authed(req, res, next) {
  const token = (req.headers.authorization || "").replace("Bearer ", "");
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET).sub;
    next();
  } catch {
    res.status(401).json({ error: "bad token" });
  }
}

app.post("/link", (req, res) => {
  const { code, username } = req.body;
  const row = db
    .prepare("SELECT * FROM pending_codes WHERE code = ? AND mc_username = ?")
    .get(code, username);
  if (!row || row.expires_at < Date.now())
    return res.status(400).json({ error: "invalid code" });
  db.prepare("INSERT OR REPLACE INTO links VALUES (?, ?)").run(username, Date.now());
  db.prepare("DELETE FROM pending_codes WHERE code = ?").run(code);
  const token = jwt.sign({ sub: username }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.json({ token });
});

app.post("/claim/daily", authed, async (req, res) => {
  const day = new Date().toISOString().slice(0, 10);
  const exists = db
    .prepare("SELECT 1 FROM claims WHERE mc_username=? AND kind='daily' AND day=?")
    .get(req.user, day);
  if (exists) return res.status(429).json({ error: "already claimed today" });
  db.prepare("INSERT INTO claims VALUES (?, 'daily', ?)").run(req.user, day);
  await pay(req.user, 10, "daily check-in");
  res.json({ ok: true, amount: 10 });
});

app.get("/ledger", (_, res) => {
  const rows = db
    .prepare("SELECT mc_username, amount, reason, at FROM ledger ORDER BY id DESC LIMIT 50")
    .all();
  res.json(rows);
});

app.listen(3000, () => console.log("bridge :3000"));
