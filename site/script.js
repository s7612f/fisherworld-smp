// Fisherworld site — demo logic. No real bridge yet; uses mock data + localStorage.
// When the bridge is live, replace MOCK=true and point API at mc-bridge.sebastian-fisher.com.

const MOCK = true;
const API = "https://mc-bridge.sebastian-fisher.com";

function $(sel, root = document) { return root.querySelector(sel); }
function $$(sel, root = document) { return [...root.querySelectorAll(sel)]; }

function fmt(n) { return "£" + Number(n).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function today() { return new Date().toISOString().slice(0, 10); }

// ---------- account link ----------
async function handleLink(e) {
  e.preventDefault();
  const form = e.target;
  const username = form.username.value.trim();
  const code = form.code.value.trim();
  const status = $("#linkstatus");
  status.className = "status";
  status.textContent = "linking…";
  try {
    if (MOCK) {
      await new Promise(r => setTimeout(r, 600));
      if (code === "000000") throw new Error("invalid code");
      localStorage.setItem("fw_user", username);
      localStorage.setItem("fw_token", "demo-token");
    } else {
      const r = await fetch(API + "/link", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, code }),
      });
      if (!r.ok) throw new Error((await r.json()).error || "link failed");
      const { token } = await r.json();
      localStorage.setItem("fw_user", username);
      localStorage.setItem("fw_token", token);
    }
    status.classList.add("ok");
    status.textContent = `linked ✓ you're in as ${username}`;
  } catch (err) {
    status.classList.add("err");
    status.textContent = "× " + err.message;
  }
  return false;
}

// ---------- ticker ----------
function animateTicker() {
  const el = $("#ticker");
  if (!el) return;
  const spans = $$("span", el);
  setInterval(() => {
    spans.forEach(s => {
      const txt = s.textContent;
      const m = txt.match(/^(\w+) £([\d.]+) (.)$/);
      if (!m) return;
      let p = parseFloat(m[2]);
      const delta = (Math.random() - 0.5) * p * 0.02;
      p = Math.max(0.1, p + delta);
      const arrow = delta > 0.01 ? "▲" : delta < -0.01 ? "▼" : "▬";
      s.textContent = `${m[1]} £${p.toFixed(2)} ${arrow}`;
      s.style.color = delta > 0.01 ? "var(--green)" : delta < -0.01 ? "var(--red)" : "var(--muted)";
    });
  }, 2500);
}

// ---------- market table ----------
const MARKET_SEED = [
  { item: "Iron Ingot", bid: 11.80, ask: 12.40, vol: 1840 },
  { item: "Gold Ingot", bid: 29.90, ask: 31.10, vol: 720 },
  { item: "Diamond", bid: 180.00, ask: 184.00, vol: 96 },
  { item: "Netherite Ingot", bid: 595.00, ask: 612.50, vol: 12 },
  { item: "Emerald", bid: 42.50, ask: 44.00, vol: 210 },
  { item: "Wheat", bid: 0.80, ask: 0.90, vol: 12400 },
  { item: "Bread", bid: 2.50, ask: 2.90, vol: 3100 },
  { item: "Oak Log", bid: 0.60, ask: 0.75, vol: 22000 },
  { item: "Cobblestone", bid: 0.05, ask: 0.08, vol: 98000 },
  { item: "Ender Pearl", bid: 48.00, ask: 52.00, vol: 64 },
];
function renderMarket() {
  const tbody = $("#market-body");
  if (!tbody) return;
  tbody.innerHTML = "";
  MARKET_SEED.forEach(row => {
    const spread = ((row.ask - row.bid) / row.ask * 100).toFixed(1);
    tbody.insertAdjacentHTML("beforeend", `
      <tr>
        <td>${row.item}</td>
        <td>${fmt(row.bid)}</td>
        <td>${fmt(row.ask)}</td>
        <td class="flat">${spread}%</td>
        <td>${row.vol.toLocaleString("en-GB")}</td>
      </tr>
    `);
  });
}

// ---------- stocks ----------
const STOCKS_SEED = [
  { sym: "IRON", name: "Iron Index", price: 124.50, d: +2.1 },
  { sym: "GOLD", name: "Gold Index", price: 311.20, d: -0.8 },
  { sym: "DMND", name: "Diamond Index", price: 1840.00, d: +4.5 },
  { sym: "SAFF", name: "Saffron Town Bakery (player IPO)", price: 68.00, d: +12.4 },
  { sym: "FISH", name: "Fisher Holdings (player IPO)", price: 420.50, d: -1.2 },
  { sym: "REDS", name: "Redstone Corp (player IPO)", price: 55.80, d: 0 },
];
function renderStocks() {
  const tbody = $("#stocks-body");
  if (!tbody) return;
  tbody.innerHTML = "";
  STOCKS_SEED.forEach(s => {
    const cls = s.d > 0.1 ? "up" : s.d < -0.1 ? "down" : "flat";
    const arrow = s.d > 0.1 ? "▲" : s.d < -0.1 ? "▼" : "▬";
    tbody.insertAdjacentHTML("beforeend", `
      <tr>
        <td><b>${s.sym}</b></td>
        <td>${s.name}</td>
        <td>${fmt(s.price)}</td>
        <td class="${cls}">${arrow} ${s.d.toFixed(2)}%</td>
      </tr>
    `);
  });
}

// ---------- ledger ----------
const LEDGER_SEED = [
  { user: "Lola", amount: 12, reason: "gym session (verified by Sebastian)", ago: "3m" },
  { user: "Sebastian", amount: 8, reason: "sold 32x iron ingot @ 0.25ea", ago: "14m" },
  { user: "Tom", amount: 3, reason: "daily check-in", ago: "1h" },
  { user: "Lola", amount: 8, reason: "block breaker minigame", ago: "2h" },
  { user: "Sebastian", amount: 20, reason: "2h coaching prep (self-reported)", ago: "4h" },
  { user: "Lola", amount: 5, reason: "dishes (verified by Tom)", ago: "5h" },
  { user: "Tom", amount: 40, reason: "bounty: 2 stacks iron delivered", ago: "6h" },
  { user: "Sebastian", amount: 75, reason: "bug bounty: quickshop price parse", ago: "1d" },
  { user: "Tom", amount: 1.50, reason: "mined 6 diamonds (Jobs)", ago: "1d" },
  { user: "Lola", amount: 0.80, reason: "sold 8x wheat @ 0.10ea", ago: "1d" },
];
function renderLedger() {
  const tbody = $("#ledger-body");
  if (!tbody) return;
  tbody.innerHTML = "";
  LEDGER_SEED.forEach(r => {
    tbody.insertAdjacentHTML("beforeend", `
      <tr>
        <td>${r.ago}</td>
        <td><b>${r.user}</b></td>
        <td class="up">+${fmt(r.amount)}</td>
        <td>${r.reason}</td>
      </tr>
    `);
  });
}

// ---------- earn page ----------
function renderEarn() {
  const daily = $("#daily-btn");
  if (!daily) return;

  const user = localStorage.getItem("fw_user");
  const greeting = $("#greeting");
  if (user) greeting.textContent = `logged in as ${user}`;
  else greeting.textContent = "not linked — link on the home page first";

  const claimedKey = `fw_daily_${today()}`;
  if (localStorage.getItem(claimedKey)) {
    daily.disabled = true;
    daily.textContent = "claimed today ✓";
  }
  daily.addEventListener("click", () => {
    if (!user) { alert("link your account first"); return; }
    localStorage.setItem(claimedKey, "1");
    daily.disabled = true;
    daily.textContent = "claimed today ✓ +£3";
    logEarn(`+£3 daily check-in`);
  });

  setupBlockBreaker();
  setupCoachingForm();
}

function logEarn(msg) {
  const log = $("#earnlog");
  if (!log) return;
  const line = document.createElement("div");
  line.textContent = `[${new Date().toLocaleTimeString("en-GB")}] ${msg}`;
  log.prepend(line);
}

function setupCoachingForm() {
  const form = $("#coaching-form");
  if (!form) return;
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const amount = parseFloat($("#coaching-amount").value);
    const note = $("#coaching-note").value.trim() || "coaching session";
    if (!amount || amount < 1 || amount > 40) {
      alert("Enter an amount between £1 and £40.");
      return;
    }
    const btn = form.querySelector("button");
    btn.disabled = true;
    btn.textContent = "logging…";
    await new Promise(r => setTimeout(r, 600));
    logEarn(`+£${amount.toFixed(2)} ${note} (coaching — pending bridge)`);
    form.reset();
    btn.disabled = false;
    btn.textContent = "log it";
  });
}

function setupBlockBreaker() {
  const grid = $("#bb-grid");
  const scoreEl = $("#bb-score");
  const startBtn = $("#bb-start");
  if (!grid || !startBtn) return;

  let score = 0, running = false, spawnTimer, endTimer;

  function cell(i) { return grid.children[i]; }
  function reset() {
    grid.innerHTML = "";
    for (let i = 0; i < 25; i++) {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = "";
      b.dataset.i = i;
      b.addEventListener("click", () => {
        if (!running || !b.classList.contains("hit")) return;
        b.classList.remove("hit");
        b.classList.add("gone");
        b.textContent = "";
        score++;
        scoreEl.textContent = score;
      });
      grid.appendChild(b);
    }
  }
  reset();

  startBtn.addEventListener("click", () => {
    if (running) return;
    const user = localStorage.getItem("fw_user");
    if (!user) { alert("link your account first"); return; }
    running = true;
    score = 0;
    scoreEl.textContent = "0";
    reset();
    startBtn.disabled = true;
    startBtn.textContent = "running…";

    spawnTimer = setInterval(() => {
      const candidates = [...grid.children].filter(c => !c.classList.contains("hit") && !c.classList.contains("gone"));
      if (!candidates.length) return;
      const pick = candidates[Math.floor(Math.random() * candidates.length)];
      pick.classList.add("hit");
      pick.textContent = "◆";
      setTimeout(() => { if (pick.classList.contains("hit")) { pick.classList.remove("hit"); pick.textContent = ""; } }, 1100);
    }, 450);

    endTimer = setTimeout(() => {
      clearInterval(spawnTimer);
      running = false;
      startBtn.disabled = false;
      startBtn.textContent = "play again";
      const earned = Math.min(Math.round(score * 0.5 * 10) / 10, 10);
      logEarn(`+£${earned} block breaker (${score} hits)`);
      alert(`round over — ${score} hits = £${earned}`);
    }, 20000);
  });
}

// ---------- bootstrap ----------
document.addEventListener("DOMContentLoaded", () => {
  animateTicker();
  renderMarket();
  renderStocks();
  renderLedger();
  renderEarn();
});

window.handleLink = handleLink;
