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

// ---------- events & calendar ----------

const EVENTS = [
  // ── Milestones ──────────────────────────────────────────────────
  { date: "2026-04-20", type: "milestone", title: "🚀 Server Launch", desc: "Infrastructure live. Admin testing begins." },
  { date: "2026-04-25", type: "milestone", title: "👥 Soft Launch", desc: "Friends + girlfriend invited. 4–6 players." },
  { date: "2026-05-04", type: "milestone", title: "🏘️ Phase 2 — Towny Live", desc: "Land ownership, plot rent, and taxes go live. Saffron founded." },
  { date: "2026-05-04", type: "economy",   title: "🌾 Farming Multiplier Week", desc: "3× Jobs Reborn pay for all Farming jobs. Lasts 7 days." },
  { date: "2026-05-18", type: "milestone", title: "📈 Phase 3 — Markets Open", desc: "Auction house, StockMarket, and bank loans go live." },
  { date: "2026-06-01", type: "milestone", title: "🌐 Phase 4 — Web Layer Live", desc: "Bridge service active. Chore verification open. Account linking enabled." },
  { date: "2026-06-14", type: "combat",    title: "🐉 Dragon Reset #1", desc: "The End is wiped and regenerated. Race to the Dragon — prize chest for the killing party." },
  { date: "2026-07-04", type: "community", title: "🗺️ World Border Expansion #1", desc: "Border grows from 3,000 to 3,500 blocks. New biomes unlocked. £200 founding grant for first new town." },
  { date: "2026-08-03", type: "economy",   title: "⛏️ Mining Multiplier Week", desc: "3× Jobs Reborn pay for all Mining jobs. Lasts 7 days." },
  { date: "2026-08-08", type: "combat",    title: "💀 Nether Incursion #1", desc: "Wither Hunt. £1000 prize pool split by damage dealt. £500 bonus for the killing blow." },
  { date: "2026-09-01", type: "milestone", title: "⚔️ mcMMO Season 1 Begins", desc: "Skills leaderboard officially resets. Season 1 runs until Mar 2027." },
  { date: "2026-09-20", type: "combat",    title: "🐉 Dragon Reset #2", desc: "The End wiped and regenerated. Second race." },
  { date: "2026-10-03", type: "community", title: "🗺️ World Border Expansion #2", desc: "Border grows to 4,000 blocks. Mesa biomes accessible." },
  { date: "2026-11-02", type: "economy",   title: "🏹 Hunting Multiplier Week", desc: "3× Jobs Reborn pay for all Hunting jobs. Lasts 7 days." },
  { date: "2026-11-07", type: "combat",    title: "💀 Nether Incursion #2", desc: "Wither Hunt. £1500 prize pool — scales with server population." },
  { date: "2026-12-13", type: "combat",    title: "🐉 Dragon Reset #3", desc: "The End wiped. Third race — End Cities full of loot again." },
  { date: "2026-12-25", type: "community", title: "🎄 Christmas Event", desc: "Snow in spawn, double XP week, gift crates placed at spawn for all players." },
  { date: "2027-01-03", type: "community", title: "🗺️ World Border Expansion #3", desc: "Border grows to 4,500 blocks." },
  { date: "2027-02-01", type: "economy",   title: "🪵 Woodcutting Multiplier Week", desc: "3× Jobs Reborn pay for all Woodcutting jobs. Lasts 7 days." },
];

// Day-of-week recurring events (0=Sun … 6=Sat)
const RECURRING_DOW = [
  { dow: 0, type: "economy",   title: "🏠 Rent Due",            desc: "Towny charges all plot rent. 3 missed = eviction." },
  { dow: 1, type: "economy",   title: "💰 Dividends Paid",      desc: "StockMarket pays weekly dividends to shareholders." },
  { dow: 5, type: "economy",   title: "⚡ Flash Auction 7pm",   desc: "3–5 rare items at 50% market price in the auction house." },
  { dow: 6, type: "community", title: "📋 Bounty Board Refresh", desc: "Old unclaimed bounties expire. New ones posted on Discord." },
];

// Day-of-month recurring events
const RECURRING_DOM = [
  { dom: 1,  type: "economy", title: "📊 Jobs Rate Review", desc: "Admin checks /baltop and adjusts Jobs Reborn pay rates." },
  { dom: 15, type: "economy", title: "📈 Dividend Sweep",   desc: "Secondary dividend payout for any missed Monday sweeps." },
];

function getEventsForDate(year, month, day) {
  const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  const fixed = EVENTS.filter(e => e.date === iso);

  const d = new Date(year, month, day);
  const dow = d.getDay();
  const dowEvents = RECURRING_DOW.filter(e => e.dow === dow).map(e => ({ ...e, recurring: true }));

  const domEvents = RECURRING_DOM.filter(e => e.dom === day).map(e => ({ ...e, recurring: true }));

  // Last Sunday of month = tax holiday
  const lastSundayEvents = [];
  const isLastSunday = (() => {
    if (dow !== 0) return false;
    const nextWeek = new Date(year, month, day + 7);
    return nextWeek.getMonth() !== month;
  })();
  if (isLastSunday) lastSundayEvents.push({ type: "community", title: "🏖️ Tax Holiday Weekend", desc: "No plot rent charged for 48h.", recurring: true });

  return [...fixed, ...dowEvents, ...domEvents, ...lastSundayEvents];
}

function typeColour(type) {
  return { milestone: "#9b59ff", economy: "#e6c65a", combat: "#c85a47", community: "#7cc867", recurring: "#5a8aff" }[type] || "#888";
}

let calYear, calMonth, selectedDay = null;

function renderCalendar() {
  const grid = document.getElementById("cal-grid");
  const label = document.getElementById("cal-month-label");
  if (!grid) return;

  const now = new Date();
  if (calYear === undefined) { calYear = now.getFullYear(); calMonth = now.getMonth(); }

  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  label.textContent = `${monthNames[calMonth]} ${calYear}`;

  grid.innerHTML = "";
  const dows = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  dows.forEach(d => {
    const el = document.createElement("div");
    el.className = "cal-dow";
    el.textContent = d;
    grid.appendChild(el);
  });

  const firstDow = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();

  for (let i = 0; i < firstDow; i++) {
    const el = document.createElement("div");
    el.className = "cal-day empty";
    grid.appendChild(el);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const el = document.createElement("div");
    el.className = "cal-day";
    const isToday = d === now.getDate() && calMonth === now.getMonth() && calYear === now.getFullYear();
    if (isToday) el.classList.add("today");
    if (selectedDay === d) el.classList.add("selected");

    const numEl = document.createElement("div");
    numEl.className = "cal-day-num";
    numEl.textContent = d;
    el.appendChild(numEl);

    const evts = getEventsForDate(calYear, calMonth, d);
    if (evts.length) {
      const dots = document.createElement("div");
      dots.className = "cal-dots";
      const shown = evts.slice(0, 4);
      shown.forEach(ev => {
        const dot = document.createElement("div");
        dot.className = "cal-dot";
        dot.style.background = typeColour(ev.type);
        dots.appendChild(dot);
      });
      el.appendChild(dots);
    }

    el.addEventListener("click", () => {
      selectedDay = d;
      renderCalendar();
      showDayDetail(d, evts);
    });

    grid.appendChild(el);
  }
}

function showDayDetail(day, evts) {
  const panel = document.getElementById("day-detail");
  const title = document.getElementById("day-detail-title");
  const body  = document.getElementById("day-detail-body");
  if (!panel) return;

  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  title.textContent = `${day} ${monthNames[calMonth]} ${calYear}`;

  if (!evts.length) {
    panel.style.display = "block";
    body.innerHTML = `<p class="note">No events scheduled.</p>`;
    return;
  }

  panel.style.display = "block";
  body.innerHTML = evts.map(ev => `
    <div class="cal-event-item ${ev.type}">
      <div class="evt-title">${ev.title}</div>
      <div class="evt-desc">${ev.desc}</div>
    </div>
  `).join("");
}

function renderUpcoming() {
  const el = document.getElementById("upcoming-list");
  if (!el) return;
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const future = EVENTS
    .map(e => ({ ...e, d: new Date(e.date) }))
    .filter(e => e.d >= now)
    .sort((a, b) => a.d - b.d)
    .slice(0, 8);

  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  el.innerHTML = future.map(e => {
    const diff = Math.round((e.d - now) / 86400000);
    const diffStr = diff === 0 ? "today!" : diff === 1 ? "tomorrow" : `in ${diff} days`;
    const dateStr = `${e.d.getDate()} ${monthNames[e.d.getMonth()]} ${e.d.getFullYear()}`;
    return `
      <div class="upcoming-item">
        <div class="upcoming-date">${dateStr}</div>
        <div>
          <div class="upcoming-label"><span class="tag tag-${e.type}">${e.type}</span> ${e.title}</div>
          <div class="upcoming-delta">${diffStr} · ${e.desc}</div>
        </div>
      </div>`;
  }).join("");
}

function setupCalendarNav() {
  const prev = document.getElementById("cal-prev");
  const next = document.getElementById("cal-next");
  if (!prev) return;
  prev.addEventListener("click", () => {
    calMonth--;
    if (calMonth < 0) { calMonth = 11; calYear--; }
    selectedDay = null;
    renderCalendar();
    document.getElementById("day-detail").style.display = "none";
  });
  next.addEventListener("click", () => {
    calMonth++;
    if (calMonth > 11) { calMonth = 0; calYear++; }
    selectedDay = null;
    renderCalendar();
    document.getElementById("day-detail").style.display = "none";
  });
}

// ---------- bootstrap ----------
document.addEventListener("DOMContentLoaded", () => {
  animateTicker();
  renderMarket();
  renderStocks();
  renderLedger();
  renderEarn();
  renderCalendar();
  renderUpcoming();
  setupCalendarNav();
});

window.handleLink = handleLink;
