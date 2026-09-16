/**
 * main.js — Application bootstrap.
 * Wires together the store, queue engine, time simulator, and all UI components.
 */

import './src/styles/reset.css';
import './src/styles/variables.css';
import './src/styles/animations.css';
import './src/styles/queue.css';
import './src/styles/components.css';

import { init as initStore, getTickets, getActiveAgent, setActiveAgent, updateTicket, assignTicket, getAgentById, getTeam, subscribe as storeSubscribe, escalateOverdueTickets } from './src/state/store.js';
import { sortQueue } from './src/engine/queueEngine.js';
import { subscribe as clockSubscribe, now, advanceTime, resetTime, formatOffset } from './src/engine/timeSimulator.js';
import { renderQueueHeader, updateQueueHeader } from './src/components/queueHeader.js';
import { renderPickNextBanner, updatePickNextTimer } from './src/components/pickNextBanner.js';
import { renderFilterBar, applyFilters, getFilters } from './src/components/filterBar.js';
import { renderTicketList, updateTicketTimers } from './src/components/ticketList.js';
import { renderPagination, paginateTickets, totalPages, setPage, getPage } from './src/components/pagination.js';
import { initDrawer, openDrawer, closeDrawer, updateDrawerTimer } from './src/components/ticketDrawer.js';
import { renderTicketModal, openCreateModal } from './src/components/ticketModal.js';
import { initToast, showToast } from './src/components/toast.js';
import { formatStatus } from './src/utils/formatters.js';

import { isOverdue } from './src/engine/slaManager.js';

// ── DOM refs ───────────────────────────────────────────────────────────────────
const $header       = document.getElementById('app-header');
const $statsBanner  = document.getElementById('stats-banner');
const $simBar       = document.getElementById('sim-bar');
const $pickNext     = document.getElementById('pick-next');
const $filterBar    = document.getElementById('filter-bar');
const $filterSummary = document.getElementById('filter-summary');
const $queueWrap    = document.getElementById('queue-wrap');
const $queueContent = document.getElementById('queue-content');
const $pagination   = document.getElementById('pagination');
const $drawerMount  = document.getElementById('drawer-mount');
const $modalMount   = document.getElementById('modal-mount');

// ── Live state ─────────────────────────────────────────────────────────────────
let _currentFiltered = [];
let _lastOverdueKey = '';

// ── Bootstrap ───────────────────────────────────────────────────────────────
initStore();
initToast();
initDrawer($drawerMount);
renderTicketModal($modalMount);
renderAppHeader();
renderSimBar();
fullRender();

// ── Store subscription — re-render when tickets change ──────────────────────
storeSubscribe(() => {
  fullRender();
});

// ── Clock subscription — smooth, non-destructive 1-second ticks ─────────────
clockSubscribe((t) => {
  const tickets = getTickets();

  // In-place updates every second (zero DOM destruction, zero flickering)
  updateQueueHeader(tickets);
  updatePickNextTimer(tickets);
  updateTicketTimers(_currentFiltered);
  tickets.forEach(tk => updateDrawerTimer(tk));

  // Update sim offset display
  const offsetEl = document.getElementById('sim-offset-display');
  if (offsetEl) offsetEl.textContent = formatOffset();

  // Update live clock
  const clockEl = document.getElementById('live-clock');
  if (clockEl) {
    const d = new Date(t);
    clockEl.textContent = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  }

  // Check if any active ticket just breached SLA deadline
  // Only re-sort when an active ticket's overdue state actually flips!
  const currentOverdueKey = tickets
    .filter(tk => !['resolved', 'closed'].includes(tk.status) && isOverdue(tk, t))
    .map(tk => tk.id)
    .sort()
    .join(',');

  if (currentOverdueKey !== _lastOverdueKey) {
    _lastOverdueKey = currentOverdueKey;
    // Run automated escalation check for breached tickets (at most 1 level per run)
    const escalated = escalateOverdueTickets(t);
    if (escalated.length > 0) {
      const summary = escalated.map(e => `${e.id} (${e.from.toUpperCase()} ➔ ${e.to.toUpperCase()})`).slice(0, 2).join(', ');
      showToast(`⚡ Automated Escalation: ${escalated.length} breached ticket(s) raised +1 priority: ${summary}`, 'warning');
    }
    fullRender();
  }
});

// ── Full render cycle ───────────────────────────────────────────────────────
function fullRender() {
  const tickets = getTickets();
  const agentId = getActiveAgent();
  const filters = getFilters();

  // 1. Sort by queue engine
  const sorted = sortQueue(tickets, now());

  // 2. Apply UI filters
  const filtered = applyFilters(sorted, filters, agentId);
  _currentFiltered = filtered;

  // 3. Paginate
  const page = getPage();
  const pages = totalPages(filtered.length);
  if (page > pages) setPage(Math.max(1, pages));
  const visible = paginateTickets(filtered);

  // 4. Render components
  renderQueueHeader(tickets, $statsBanner);
  renderPickNextBanner(tickets, $pickNext, {
    onPick: (ticket) => handlePickNext(ticket),
    onView: (ticket) => openDrawer(ticket),
  });
  renderFilterBar($filterBar, {
    onChange: () => {
      setPage(1);
      fullRender();
    },
    activeAgentId: agentId,
    allTickets: tickets,
  });
  renderFilterSummary(filtered.length, sorted.length, filters);
  renderTicketList(visible, $queueContent, {
    onView:    (ticket) => openDrawer(ticket),
    onAssign:  (ticket) => handleQuickAssign(ticket),
    onResolve: (ticket) => handleResolve(ticket),
    onStatusChange: (ticket, status) => updateTicket(ticket.id, { status }),
  });
  renderPagination($pagination, {
    total: filtered.length,
    onChange: () => fullRender(),
  });
}

// ── Filter summary row ──────────────────────────────────────────────────────
function renderFilterSummary(filteredCount, totalCount, filters) {
  const activeFilters = [
    filters.tab !== 'all' ? `Tab: ${filters.tab}` : null,
    filters.priority !== 'all' ? `Priority: ${filters.priority}` : null,
    filters.status !== 'active' ? `Status: ${filters.status}` : null,
    filters.search ? `Search: "${filters.search}"` : null,
  ].filter(Boolean);

  $filterSummary.innerHTML = `
    <div class="filter-summary">
      <span class="filter-count">${filteredCount} ticket${filteredCount !== 1 ? 's' : ''}</span>
      ${activeFilters.length ? `<span style="color:var(--text-muted);font-size:11px;">${activeFilters.join(' · ')}</span>` : ''}
      ${activeFilters.length ? `<button class="btn btn--ghost btn--sm" id="clear-filters-btn" style="font-size:11px;padding:2px 8px;">Clear filters</button>` : ''}
    </div>
  `;

  document.getElementById('clear-filters-btn')?.addEventListener('click', () => {
    const f = getFilters();
    Object.assign(f, { search: '', tab: 'all', priority: 'all', status: 'active' });
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = '';
    setPage(1);
    fullRender();
  });
}

// ── App Header ────────────────────────────────────────────────────────────────
function renderAppHeader() {
  const team = getTeam();
  $header.innerHTML = `
    <header class="app-header">
      <div class="header-brand">
        <div class="brand-logo">🎫</div>
        <div>
          <div class="brand-title">HelpQueue Pro</div>
          <div class="brand-subtitle">Smart SLA-Driven IT Helpdesk</div>
        </div>
      </div>
      <div class="header-right">
        <div class="live-clock">
          <span style="color:var(--text-muted);font-size:11px;">TIME </span>
          <span class="clock-time" id="live-clock">—</span>
        </div>
        <div class="agent-switcher" id="agent-switcher">
          ${team.map(agent => `
            <button
              class="agent-switcher-btn ${getActiveAgent() === agent.id ? 'active' : ''}"
              data-agent="${agent.id}"
              id="agent-btn-${agent.id}"
              aria-label="Switch to ${agent.name}"
            >
              <div class="agent-avatar" style="background:${agent.color}22;color:${agent.color};width:22px;height:22px;font-size:9px;">${agent.avatar}</div>
              ${agent.name.split(' ')[0]}
            </button>
          `).join('')}
        </div>
        <button class="btn btn--primary" id="new-ticket-btn" aria-label="Create new ticket">
          + New Ticket
        </button>
      </div>
    </header>
  `;

  document.getElementById('new-ticket-btn')?.addEventListener('click', openCreateModal);

  document.querySelectorAll('[data-agent]').forEach(btn => {
    btn.addEventListener('click', () => {
      setActiveAgent(btn.dataset.agent);
      renderAppHeader(); // refresh active state
    });
  });
}

// ── Simulator Bar ─────────────────────────────────────────────────────────────
function renderSimBar() {
  $simBar.innerHTML = `
    <div class="sim-bar" title="Time-warp simulator: advance clock to see SLA breaches live">
      <span class="sim-bar-label">⚗️ SLA Simulator</span>
      <span class="sim-offset" id="sim-offset-display">${formatOffset()}</span>
      <button class="sim-btn" id="sim-plus-30" title="Advance time by 30 minutes">+30m</button>
      <button class="sim-btn" id="sim-plus-1h" title="Advance time by 1 hour">+1h</button>
      <button class="sim-btn" id="sim-plus-2h" title="Advance time by 2 hours">+2h</button>
      <button class="sim-btn" id="sim-plus-4h" title="Advance time by 4 hours">+4h</button>
      <button class="sim-btn sim-btn--escalate" id="sim-run-escalation" title="Automated check: Escalates any ticket that breached its agreed response time by +1 level (at most 1 level per run)">⚡ Auto-Escalate Breached</button>
      <button class="sim-btn sim-btn--reset" id="sim-reset" title="Reset to real time">↩ Reset</button>
      <span style="color:var(--text-muted);font-size:11px;margin-left:4px;">Watch tickets breach SLA and auto-escalate!</span>
    </div>
  `;

  document.getElementById('sim-plus-30')?.addEventListener('click', () => { advanceTime(30 * 60 * 1000); triggerEscalationCheck(false); });
  document.getElementById('sim-plus-1h')?.addEventListener('click', () => { advanceTime(60 * 60 * 1000); triggerEscalationCheck(false); });
  document.getElementById('sim-plus-2h')?.addEventListener('click', () => { advanceTime(2 * 60 * 60 * 1000); triggerEscalationCheck(false); });
  document.getElementById('sim-plus-4h')?.addEventListener('click', () => { advanceTime(4 * 60 * 60 * 1000); triggerEscalationCheck(false); });
  document.getElementById('sim-run-escalation')?.addEventListener('click', () => { triggerEscalationCheck(true); });
  document.getElementById('sim-reset')?.addEventListener('click', () => { resetTime(); fullRender(); });
}

function triggerEscalationCheck(isManual = false) {
  const escalated = escalateOverdueTickets(now());
  if (escalated.length > 0) {
    const summary = escalated.map(e => `${e.id} (${e.from.toUpperCase()} ➔ ${e.to.toUpperCase()})`).slice(0, 3).join(', ');
    const extra = escalated.length > 3 ? ` +${escalated.length - 3} more` : '';
    showToast(`⚡ Auto-Escalated ${escalated.length} breached ticket(s) (+1 level): ${summary}${extra}`, 'warning');
  } else if (isManual) {
    showToast('All breached tickets are already at maximum priority (Urgent) or on track.', 'info');
  }
  fullRender();
}

// ── Action Handlers ─────────────────────────────────────────────────────────
function handlePickNext(ticket) {
  const agentId = getActiveAgent();
  const agent = getAgentById(agentId);
  if (ticket.assignee !== agentId) {
    assignTicket(ticket.id, agentId);
  }
  if (ticket.status === 'open') {
    updateTicket(ticket.id, { status: 'in_progress' });
  }
  showToast(`Picked up ${ticket.id} — now in progress`, 'success');
  openDrawer({ ...ticket, assignee: agentId, status: 'in_progress' });
}

function handleQuickAssign(ticket) {
  const agentId = getActiveAgent();
  const agent = getAgentById(agentId);
  assignTicket(ticket.id, agentId);
  showToast(`Assigned ${ticket.id} to ${agent?.name ?? 'you'}`, 'success');
}

function handleResolve(ticket) {
  if (confirm(`Mark "${ticket.subject.slice(0, 50)}…" as resolved?`)) {
    updateTicket(ticket.id, { status: 'resolved' });
    showToast(`${ticket.id} resolved ✅`, 'success');
  }
}
