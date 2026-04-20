// Fisherworld SMP - site script. Uses seed data until the server bridge is live.

function $(sel, root = document) { return root.querySelector(sel); }
function $$(sel, root = document) { return [...root.querySelectorAll(sel)]; }
function fmt(n) { return "£" + Number(n).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

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
      const arrow = delta > 0.01 ? "▲" : delta < -0.01 ? "▼" : "-";
      s.textContent = `${m[1]} £${p.toFixed(2)} ${arrow}`;
      s.style.color = delta > 0.01 ? "var(--green)" : delta < -0.01 ? "var(--red)" : "var(--muted)";
    });
  }, 2500);
}

// ---------- market ----------
const MARKET_SEED = [
  { item: "Iron Ingot",      bid: 11.80, ask: 12.40, vol: 1840 },
  { item: "Gold Ingot",      bid: 29.90, ask: 31.10, vol: 720  },
  { item: "Diamond",         bid: 180.00,ask: 184.00,vol: 96   },
  { item: "Netherite Ingot", bid: 595.00,ask: 612.50,vol: 12   },
  { item: "Emerald",         bid: 42.50, ask: 44.00, vol: 210  },
  { item: "Wheat",           bid: 0.80,  ask: 0.90,  vol: 12400},
  { item: "Bread",           bid: 2.50,  ask: 2.90,  vol: 3100 },
  { item: "Oak Log",         bid: 0.60,  ask: 0.75,  vol: 22000},
  { item: "Cobblestone",     bid: 0.05,  ask: 0.08,  vol: 98000},
  { item: "Ender Pearl",     bid: 48.00, ask: 52.00, vol: 64   },
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
      </tr>`);
  });
}

// ---------- stocks ----------
const STOCKS_SEED = [
  { sym: "IRON", name: "Iron Index",                     price: 124.50, d: +2.1 },
  { sym: "GOLD", name: "Gold Index",                     price: 311.20, d: -0.8 },
  { sym: "DMND", name: "Diamond Index",                  price: 1840.00,d: +4.5 },
  { sym: "SAFF", name: "Saffron Town Bakery (IPO)",      price: 68.00,  d: +12.4},
  { sym: "FISH", name: "Fisher Holdings (IPO)",          price: 420.50, d: -1.2 },
  { sym: "REDS", name: "Redstone Corp (IPO)",            price: 55.80,  d:  0   },
];
function renderStocks() {
  const tbody = $("#stocks-body");
  if (!tbody) return;
  tbody.innerHTML = "";
  STOCKS_SEED.forEach(s => {
    const cls   = s.d > 0.1 ? "up" : s.d < -0.1 ? "down" : "flat";
    const arrow = s.d > 0.1 ? "▲"  : s.d < -0.1 ? "▼"    : "-";
    tbody.insertAdjacentHTML("beforeend", `
      <tr>
        <td><b>${s.sym}</b></td>
        <td>${s.name}</td>
        <td>${fmt(s.price)}</td>
        <td class="${cls}">${arrow} ${Math.abs(s.d).toFixed(2)}%</td>
      </tr>`);
  });
}

// ---------- ledger ----------
const LEDGER_SEED = [
  { user: "Sebastian", amount:  8.00, reason: "sold 32x iron ingot to Tom",       ago: "4m"  },
  { user: "Lola",      amount:  1.50, reason: "Jobs: mined 6 diamonds",            ago: "22m" },
  { user: "Tom",       amount: 40.00, reason: "bounty completed: 2 stacks iron",   ago: "1h"  },
  { user: "Sebastian", amount:  0.80, reason: "Jobs: harvested 64 wheat",          ago: "2h"  },
  { user: "Lola",      amount: 24.00, reason: "sold enchanted pickaxe at auction", ago: "3h"  },
  { user: "Tom",       amount:  3.20, reason: "Jobs: killed 8 creepers",           ago: "5h"  },
  { user: "Sebastian", amount: 55.00, reason: "dividend: FISH x10 shares",        ago: "1d"  },
  { user: "Lola",      amount:  0.40, reason: "Jobs: placed 80 blocks",            ago: "1d"  },
];

const BALTOP_SEED = [
  { rank: 1, player: "Sebastian", balance: 1842.30 },
  { rank: 2, player: "Lola",      balance:  934.10 },
  { rank: 3, player: "Tom",       balance:  611.80 },
];

function renderLedger() {
  const tbody = $("#ledger-body");
  if (tbody) {
    tbody.innerHTML = "";
    LEDGER_SEED.forEach(r => {
      tbody.insertAdjacentHTML("beforeend", `
        <tr>
          <td>${r.ago}</td>
          <td><b>${r.user}</b></td>
          <td class="up">+${fmt(r.amount)}</td>
          <td>${r.reason}</td>
        </tr>`);
    });
  }

  const baltop = $("#baltop-body");
  if (baltop) {
    baltop.innerHTML = "";
    BALTOP_SEED.forEach(r => {
      baltop.insertAdjacentHTML("beforeend", `
        <tr>
          <td>${r.rank}</td>
          <td><b>${r.player}</b></td>
          <td class="up">${fmt(r.balance)}</td>
        </tr>`);
    });
  }
}

// ---------- events & calendar ----------
const EVENTS = [
  { date: "2026-04-20", type: "milestone", title: "Server Launch",              desc: "Infrastructure live. Admin testing begins." },
  { date: "2026-04-25", type: "milestone", title: "Soft Launch",                desc: "Friends invited. 4-6 players." },
  { date: "2026-05-04", type: "milestone", title: "Phase 2: Towny Live",        desc: "Land ownership, plot rent, and taxes go live. Saffron founded." },
  { date: "2026-05-04", type: "economy",   title: "Farming Multiplier Week",    desc: "3x Jobs Reborn pay for Farming. Lasts 7 days." },
  { date: "2026-05-18", type: "milestone", title: "Phase 3: Markets Open",      desc: "Auction house, stocks, and bank loans go live." },
  { date: "2026-06-14", type: "combat",    title: "Dragon Reset #1",            desc: "The End is wiped and regenerated. Race to the Dragon. Prize chest for the killing party." },
  { date: "2026-07-04", type: "community", title: "World Border Expansion #1",  desc: "Border grows from 3,000 to 3,500 blocks. New biomes unlocked. £200 founding grant for first new town." },
  { date: "2026-08-03", type: "economy",   title: "Mining Multiplier Week",     desc: "3x Jobs Reborn pay for Mining. Lasts 7 days." },
  { date: "2026-08-08", type: "combat",    title: "Nether Incursion #1",        desc: "Wither Hunt. £1000 prize pool split by damage dealt. £500 bonus for the killing blow." },
  { date: "2026-09-01", type: "milestone", title: "mcMMO Season 1 Begins",      desc: "Skills leaderboard officially resets. Season 1 runs until Mar 2027." },
  { date: "2026-09-20", type: "combat",    title: "Dragon Reset #2",            desc: "The End wiped and regenerated. Second race." },
  { date: "2026-10-03", type: "community", title: "World Border Expansion #2",  desc: "Border grows to 4,000 blocks. Mesa biomes accessible." },
  { date: "2026-11-02", type: "economy",   title: "Hunting Multiplier Week",    desc: "3x Jobs Reborn pay for Hunting. Lasts 7 days." },
  { date: "2026-11-07", type: "combat",    title: "Nether Incursion #2",        desc: "Wither Hunt. £1500 prize pool." },
  { date: "2026-12-13", type: "combat",    title: "Dragon Reset #3",            desc: "The End wiped. Third race." },
  { date: "2026-12-25", type: "community", title: "Christmas Event",            desc: "Snow in spawn, double XP week, gift crates for all players." },
  { date: "2027-01-03", type: "community", title: "World Border Expansion #3",  desc: "Border grows to 4,500 blocks." },
  { date: "2027-02-01", type: "economy",   title: "Woodcutting Multiplier Week",desc: "3x Jobs Reborn pay for Woodcutting. Lasts 7 days." },
];

const RECURRING_DOW = [
  { dow: 0, type: "economy",   title: "Rent Due",             desc: "Towny charges all plot rent. 3 missed = eviction." },
  { dow: 1, type: "economy",   title: "Dividends Paid",       desc: "StockMarket pays weekly dividends to shareholders." },
  { dow: 5, type: "economy",   title: "Flash Auction 7pm",    desc: "3-5 rare items at 50% market price in the auction house." },
  { dow: 6, type: "community", title: "Bounty Board Refresh", desc: "Old unclaimed bounties expire. New ones posted on Discord." },
];

const RECURRING_DOM = [
  { dom: 1,  type: "economy", title: "Jobs Rate Review", desc: "Admin checks /baltop and adjusts Jobs Reborn pay rates." },
  { dom: 15, type: "economy", title: "Dividend Sweep",   desc: "Secondary dividend payout for any missed Monday sweeps." },
];

function getEventsForDate(year, month, day) {
  const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  const fixed = EVENTS.filter(e => e.date === iso);
  const d = new Date(year, month, day);
  const dow = d.getDay();
  const dowEvts = RECURRING_DOW.filter(e => e.dow === dow).map(e => ({ ...e, recurring: true }));
  const domEvts = RECURRING_DOM.filter(e => e.dom === day).map(e => ({ ...e, recurring: true }));
  const extra = [];
  if (dow === 0) {
    const nextWeek = new Date(year, month, day + 7);
    if (nextWeek.getMonth() !== month) {
      extra.push({ type: "community", title: "Tax Holiday Weekend", desc: "No plot rent charged for 48h.", recurring: true });
    }
  }
  return [...fixed, ...dowEvts, ...domEvts, ...extra];
}

function typeColour(type) {
  return { milestone: "#9b59ff", economy: "#e6c65a", combat: "#c85a47", community: "#7cc867", recurring: "#5a8aff" }[type] || "#888";
}

let calYear, calMonth, selectedDay = null;

function renderCalendar() {
  const grid  = document.getElementById("cal-grid");
  const label = document.getElementById("cal-month-label");
  if (!grid) return;
  const now = new Date();
  if (calYear === undefined) { calYear = now.getFullYear(); calMonth = now.getMonth(); }
  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  label.textContent = `${monthNames[calMonth]} ${calYear}`;
  grid.innerHTML = "";
  ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].forEach(d => {
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
    if (d === now.getDate() && calMonth === now.getMonth() && calYear === now.getFullYear()) el.classList.add("today");
    if (selectedDay === d) el.classList.add("selected");
    const num = document.createElement("div");
    num.className = "cal-day-num";
    num.textContent = d;
    el.appendChild(num);
    const evts = getEventsForDate(calYear, calMonth, d);
    if (evts.length) {
      const dots = document.createElement("div");
      dots.className = "cal-dots";
      evts.slice(0, 4).forEach(ev => {
        const dot = document.createElement("div");
        dot.className = "cal-dot";
        dot.style.background = typeColour(ev.type);
        dots.appendChild(dot);
      });
      el.appendChild(dots);
    }
    el.addEventListener("click", () => { selectedDay = d; renderCalendar(); showDayDetail(d, evts); });
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
  panel.style.display = "block";
  body.innerHTML = evts.length
    ? evts.map(ev => `<div class="cal-event-item ${ev.type}"><div class="evt-title">${ev.title}</div><div class="evt-desc">${ev.desc}</div></div>`).join("")
    : `<p class="note">No events scheduled.</p>`;
}

function renderUpcoming() {
  const elCal  = document.getElementById("upcoming-list");
  const elHome = document.getElementById("upcoming-list-home");
  const el = elCal || elHome;
  if (!el) return;
  const isHome = !!elHome && !elCal;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const future = EVENTS
    .map(e => ({ ...e, d: new Date(e.date) }))
    .filter(e => e.d >= now)
    .sort((a, b) => a.d - b.d)
    .slice(0, isHome ? 4 : 8);
  const mth = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  el.innerHTML = future.map(e => {
    const diff    = Math.round((e.d - now) / 86400000);
    const diffStr = diff === 0 ? "today" : diff === 1 ? "tomorrow" : `in ${diff} days`;
    const dateStr = `${e.d.getDate()} ${mth[e.d.getMonth()]} ${e.d.getFullYear()}`;
    return `<div class="upcoming-item">
      <div class="upcoming-date">${dateStr}</div>
      <div>
        <div class="upcoming-label"><span class="tag tag-${e.type}">${e.type}</span> ${e.title}</div>
        <div class="upcoming-delta">${diffStr} - ${e.desc}</div>
      </div>
    </div>`;
  }).join("");
}

function setupCalendarNav() {
  const prev = document.getElementById("cal-prev");
  const next = document.getElementById("cal-next");
  if (!prev) return;
  prev.addEventListener("click", () => {
    calMonth--; if (calMonth < 0) { calMonth = 11; calYear--; }
    selectedDay = null; renderCalendar();
    document.getElementById("day-detail").style.display = "none";
  });
  next.addEventListener("click", () => {
    calMonth++; if (calMonth > 11) { calMonth = 0; calYear++; }
    selectedDay = null; renderCalendar();
    document.getElementById("day-detail").style.display = "none";
  });
}

// ---------- bootstrap ----------
document.addEventListener("DOMContentLoaded", () => {
  animateTicker();
  renderMarket();
  renderStocks();
  renderLedger();
  renderCalendar();
  renderUpcoming();
  setupCalendarNav();
});
