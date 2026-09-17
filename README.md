# 🎫 HelpQueue Pro — Smart SLA-Driven IT Helpdesk

> **A real-time, priority-ranked helpdesk queue built so the right ticket is always on top.**  
> Designed for Priya & Alex's two-person IT desk, and engineered for any high-volume IT support team.

[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/Vanilla-ES6+-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-green.svg)]()

🌐 **Live Demo URL:** **[https://harshitrathore97.github.io/Helpdesk-Ticket-Mangement-Application/](https://harshitrathore97.github.io/Helpdesk-Ticket-Mangement-Application/)**

---

## 📖 Table of Contents

- [The Core Challenge](#-the-core-challenge)
- [Key Features](#-key-features)
- [The Queue Ordering Engine (The Heart)](#-the-queue-ordering-engine-the-heart)
- [Quick Start](#-quick-start)
- [Project Architecture](#-project-architecture)
- [SLA Policies & Time Windows](#-sla-policies--time-windows)
- [Interactive Time-Warp Simulator](#-interactive-time-warp-simulator)
- [Documentation & AI Logs](#-documentation--ai-logs)

---

## 🎯 The Core Challenge

Priya runs a two-person IT helpdesk and the queue never stops. Some tickets are *“my laptop won’t boot before a client demo”* emergencies; others are *“can I get a bigger monitor.”* Each ticket has a priority and an agreed response time:
- **Urgent**: within 2 hours
- **High**: within 4 hours
- **Normal**: within 24 hours (1 day)
- **Low**: within 48 hours (2 days)

Priya needs to **always pick the most pressing ticket next**, with **anything past its promised time jumping straight to the front**. She also spends all day answering:
1. *"What's overdue?"*
2. *"What's assigned to me?"*
3. *"Looking up a specific customer's ticket by name"*
4. Dealing with a huge queue requiring pagination.

---

## ✨ Key Features

- ⚡ **"Pick Next Ticket" Primary Action**: One-click pickup that automatically selects the highest-priority ticket according to the SLA engine, assigns it to the active agent, transitions it to *In Progress*, and slides open the drawer.
- 🚨 **Automatic Overdue Escalation**: Breached tickets automatically float to the very top, ranked by most overdue first, with a pulsating crimson alert badge and row glow.
- ⏱️ **Live Ticking Countdowns**: Every ticket displays a live countdown timer (`1h 14m remaining` or `-42m overdue`) and an SLA consumption bar updating each second.
- 👤 **Instant Agent Switcher**: Seamless 1-click toggle between **Priya Sharma** and **Alex Chen**. Automatically updates the *"Assigned to Me"* filter and claim ownership.
- 🔍 **Real-Time Omni-Search**: Instant debounced search querying across Customer Name, Company, Email, Subject, and Ticket ID with zero page reloads.
- 🏷️ **Quick-Filter Pills**:
  - `All Tickets`
  - `🔴 Overdue`
  - `👤 Priya / Alex` (Assigned to Me)
  - `○ Unassigned`
  - `✅ Resolved`
- 📑 **Predictable Pagination**: Built for large queues with configurable page size (10, 15, 25, 50) while strictly preserving global priority queue ranking across pages.
- 🗄️ **Slide-Over Detail Drawer**: Complete ticket context, customer email/company, SLA radial/bar meters, audit history, and quick note logging.
- ⚗️ **Time-Warp Simulator Bar**: Fast-forward time (`+30m`, `+1h`, `+2h`, `+4h`, `Reset`) to observe active tickets breach SLAs and jump to the front of the queue in real time.
- ⚡ **"The Twist" Automated Escalation Check**: Automated sweep that monitors overdue tickets and escalates their priority by exactly +1 level (`normal ➔ high ➔ urgent`), strictly constrained to **at most one level per run**, with full audit logging and `⚡ Escalated` badge indicators.
- 💾 **Local Storage Persistence**: Seeded with 36 realistic relative-time tickets; persists all edits, assignments, new tickets, and resolutions across browser sessions.

---

## 🧠 The Queue Ordering Engine (The Heart)

The engine enforces a strict 3-tier algorithm on every render ([`src/engine/queueEngine.js`]

| Tier | Priority Rule | Sorting Logic |
| :--- | :--- | :--- |
| **Tier 1: Overdue** | Any ticket past promised SLA jumps to the top | **Most overdue first** (`a.slaDeadline - b.slaDeadline`) |
| **Tier 2: Active SLA** | Active tickets within their SLA window | **Earliest deadline first** (`a.slaDeadline - b.slaDeadline`) |
| **Tier 3: Tie-Breaker** | Equal deadlines down to the millisecond | **Severity weight** (`urgent` > `high` > `normal` > `low`), then oldest FIFO |

*Resolved and closed tickets are excluded from the active queue and viewable under the `✅ Resolved` filter.*

For a full breakdown of the mathematical model, starvation prevention, and trade-offs, see **[REASONING.md]

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 📁 Project Architecture

```
/Users/project
├── index.html                   # Semantic HTML entry with Google Fonts & HUD mounts
├── main.js                      # Application bootstrap, reactive render loop & clock
├── package.json                 # Project configuration & Vite scripts
├── README.md                    # This file
├── REASONING.md                 # Deep architectural breakdown and design decisions
├── AI_LOGS.md                   # Full transcript of the engineering conversation
├── src/
│   ├── engine/
│   │   ├── queueEngine.js       # 3-tier priority queue sorting algorithm
│   │   ├── slaManager.js        # SLA calculation, status checks, and countdowns
│   │   └── timeSimulator.js     # Decoupled virtual clock & fast-forward controls
│   ├── state/
│   │   ├── store.js             # Reactive Pub/Sub state store with LocalStorage
│   │   └── seed-data.js         # 36 realistic IT tickets with relative timestamps
│   ├── components/
│   │   ├── queueHeader.js       # Live HUD metric cards (Overdue, Critical, Active)
│   │   ├── pickNextBanner.js    # "Pick Next Ticket" hero banner & claim action
│   │   ├── filterBar.js         # Search input, filter pills (All, Overdue, Mine, Resolved)
│   │   ├── ticketList.js        # Dynamic queue table with live countdown badges
│   │   ├── ticketDrawer.js      # Slide-out ticket detail & audit trail drawer
│   │   ├── ticketModal.js       # Accessible "+ New Ticket" creation modal
│   │   ├── pagination.js        # Multi-page controls & page size selector
│   │   └── toast.js             # Notification feedback system
│   ├── styles/
│   │   ├── reset.css            # Modern CSS reset
│   │   ├── variables.css        # Color palette, spacing, typography tokens
│   │   ├── animations.css       # Keyframes & micro-interactions
│   │   ├── queue.css            # Queue layout, table, and HUD cards
│   │   └── components.css       # Modals, drawers, pills, inputs, and simulator bar
│   └── utils/
│       ├── formatters.js        # Date, countdown, badge, and status string formatters
│       └── helpers.js           # Debounce, ID generator, and HTML sanitization
```

---

## ⏱️ SLA Policies & Time Windows

| Priority | Response SLA | Ideal For | Status Colors |
| :--- | :--- | :--- | :--- |
| **Urgent** | **2 Hours** | Hardware failures before demos, VPN collapse, VIP lockout | 🔴 Crimson Glow |
| **High** | **4 Hours** | Software crashes, team access blocks, printer offline | 🟠 Amber |
| **Normal** | **24 Hours** | New monitor requests, accessory requests, minor bugs | 🔵 Electric Indigo |
| **Low** | **48 Hours** | General inquiries, cosmetic requests, documentation | 🟢 Emerald |

---

## ⚗️ Interactive Time-Warp Simulator

To verify that tickets automatically promote upon SLA breach:
1. Locate the **amber bar at the bottom-left**: `⚗️ SLA Simulator`.
2. Click **`+1h`** or **`+2h`**.
3. Watch tickets that were nearing their deadlines cross 00:00, turn crimson red, and **automatically jump straight to the top of the queue**.
4. Click **`↩ Reset`** to restore the clock to normal current time.

---

