/**
 * filterBar.js — Quick filter pills, search input, and dropdowns.
 * Manages filter state and notifies parent via onChange callback.
 */

import { debounce } from '../utils/helpers.js';
import { isOverdue } from '../engine/slaManager.js';
import { now } from '../engine/timeSimulator.js';
import { getTeam } from '../state/store.js';

const FILTERS = {
  search: '',
  tab: 'all',       // 'all' | 'overdue' | 'mine' | 'unassigned'
  priority: 'all',  // 'all' | 'urgent' | 'high' | 'normal' | 'low'
  status: 'active', // 'active' | 'all' | 'open' | 'in_progress' | 'waiting' | 'resolved'
};

let _filters = { ...FILTERS };
let _onChange = null;

export function getFilters() { return { ..._filters }; }

export function renderFilterBar(container, { onChange, activeAgentId, allTickets }) {
  _onChange = onChange;
  const t = now();
  const team = getTeam();

  const overdueCount = allTickets.filter(tk =>
    !['resolved', 'closed'].includes(tk.status) && isOverdue(tk, t)
  ).length;

  const mineCount = allTickets.filter(tk =>
    !['resolved', 'closed'].includes(tk.status) && tk.assignee === activeAgentId
  ).length;

  const unassignedCount = allTickets.filter(tk =>
    !['resolved', 'closed'].includes(tk.status) && !tk.assignee
  ).length;

  const resolvedCount = allTickets.filter(tk =>
    ['resolved', 'closed'].includes(tk.status)
  ).length;

  const activeAgent = team.find(a => a.id === activeAgentId);
  const activeTotal = allTickets.filter(t2 => !['resolved','closed'].includes(t2.status)).length;

  // In-place update if already mounted to avoid destroying focus / inputs
  if (container.querySelector('.filter-bar')) {
    const pillAll = container.querySelector('#pill-all');
    if (pillAll) {
      pillAll.className = `filter-pill ${_filters.tab === 'all' ? 'active' : ''}`;
      const c = pillAll.querySelector('.pill-count');
      if (c) c.textContent = activeTotal;
    }

    const pillOverdue = container.querySelector('#pill-overdue');
    if (pillOverdue) {
      pillOverdue.className = `filter-pill pill--overdue ${_filters.tab === 'overdue' ? 'active' : ''}`;
      const c = pillOverdue.querySelector('.pill-count');
      if (c) c.textContent = overdueCount;
    }

    const pillMine = container.querySelector('#pill-mine');
    if (pillMine) {
      pillMine.className = `filter-pill pill--my-tickets ${_filters.tab === 'mine' ? 'active' : ''}`;
      pillMine.innerHTML = `👤 ${escHtml(activeAgent?.name ?? 'My Tickets')} <span class="pill-count">${mineCount}</span>`;
    }

    const pillUnassigned = container.querySelector('#pill-unassigned');
    if (pillUnassigned) {
      pillUnassigned.className = `filter-pill pill--unassigned ${_filters.tab === 'unassigned' ? 'active' : ''}`;
      const c = pillUnassigned.querySelector('.pill-count');
      if (c) c.textContent = unassignedCount;
    }

    const pillResolved = container.querySelector('#pill-resolved');
    if (pillResolved) {
      pillResolved.className = `filter-pill pill--resolved ${_filters.tab === 'resolved' ? 'active' : ''}`;
      const c = pillResolved.querySelector('.pill-count');
      if (c) c.textContent = resolvedCount;
    }

    const prioSel = container.querySelector('#priority-filter');
    if (prioSel && prioSel.value !== _filters.priority) prioSel.value = _filters.priority;

    const statusSel = container.querySelector('#status-filter');
    if (statusSel && statusSel.value !== _filters.status) statusSel.value = _filters.status;

    return;
  }

  container.innerHTML = `
    <div class="filter-bar">
      <div class="search-wrap">
        <span class="search-icon">🔍</span>
        <input
          type="text"
          id="search-input"
          class="search-input"
          placeholder="Search by customer, subject, ID…"
          value="${escHtml(_filters.search)}"
          autocomplete="off"
        />
        <span class="search-clear" id="search-clear" title="Clear search">✕</span>
      </div>

      <div class="filter-pills">
        <button class="filter-pill ${_filters.tab === 'all' ? 'active' : ''}" data-tab="all" id="pill-all">
          All Tickets
          <span class="pill-count">${activeTotal}</span>
        </button>

        <button class="filter-pill pill--overdue ${_filters.tab === 'overdue' ? 'active' : ''}" data-tab="overdue" id="pill-overdue">
          🔴 Overdue
          <span class="pill-count">${overdueCount}</span>
        </button>

        <button class="filter-pill pill--my-tickets ${_filters.tab === 'mine' ? 'active' : ''}" data-tab="mine" id="pill-mine">
          👤 ${escHtml(activeAgent?.name ?? 'My Tickets')}
          <span class="pill-count">${mineCount}</span>
        </button>

        <button class="filter-pill pill--unassigned ${_filters.tab === 'unassigned' ? 'active' : ''}" data-tab="unassigned" id="pill-unassigned">
          ○ Unassigned
          <span class="pill-count">${unassignedCount}</span>
        </button>

        <button class="filter-pill pill--resolved ${_filters.tab === 'resolved' ? 'active' : ''}" data-tab="resolved" id="pill-resolved">
          ✅ Resolved
          <span class="pill-count">${resolvedCount}</span>
        </button>
      </div>

      <div style="display:flex; gap:8px; margin-left:auto;">
        <select class="filter-select" id="priority-filter">
          <option value="all" ${_filters.priority === 'all' ? 'selected' : ''}>All Priorities</option>
          <option value="urgent" ${_filters.priority === 'urgent' ? 'selected' : ''}>🔴 Urgent</option>
          <option value="high"   ${_filters.priority === 'high'   ? 'selected' : ''}>🟠 High</option>
          <option value="normal" ${_filters.priority === 'normal' ? 'selected' : ''}>🔵 Normal</option>
          <option value="low"    ${_filters.priority === 'low'    ? 'selected' : ''}>🟢 Low</option>
        </select>

        <select class="filter-select" id="status-filter">
          <option value="active" ${_filters.status === 'active' ? 'selected' : ''}>Active</option>
          <option value="all"    ${_filters.status === 'all' ? 'selected' : ''}>All Status</option>
          <option value="open"         ${_filters.status === 'open' ? 'selected' : ''}>Open</option>
          <option value="in_progress"  ${_filters.status === 'in_progress' ? 'selected' : ''}>In Progress</option>
          <option value="waiting"      ${_filters.status === 'waiting' ? 'selected' : ''}>Waiting</option>
          <option value="resolved"     ${_filters.status === 'resolved' ? 'selected' : ''}>Resolved</option>
        </select>
      </div>
    </div>
  `;

  // Bind events
  const searchInput = document.getElementById('search-input');
  const searchClear = document.getElementById('search-clear');

  const debouncedSearch = debounce((val) => {
    _filters.search = val;
    _onChange?.(_filters);
  }, 250);

  searchInput?.addEventListener('input', e => {
    debouncedSearch(e.target.value.trim());
  });

  searchClear?.addEventListener('click', () => {
    _filters.search = '';
    if (searchInput) searchInput.value = '';
    _onChange?.(_filters);
  });

  container.querySelectorAll('[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      _filters.tab = btn.dataset.tab;
      renderFilterBar(container, { onChange: _onChange, activeAgentId, allTickets });
      _onChange?.(_filters);
    });
  });

  document.getElementById('priority-filter')?.addEventListener('change', e => {
    _filters.priority = e.target.value;
    _onChange?.(_filters);
  });

  document.getElementById('status-filter')?.addEventListener('change', e => {
    _filters.status = e.target.value;
    _onChange?.(_filters);
  });
}

/**
 * Apply filter state to a sorted ticket list.
 */
export function applyFilters(sortedTickets, filters, activeAgentId) {
  const { search, tab, priority, status } = filters;
  const t = now();

  return sortedTickets.filter(ticket => {
    // 1. Tab filter
    if (tab === 'resolved') {
      if (!['resolved', 'closed'].includes(ticket.status)) return false;
    } else if (tab === 'overdue') {
      if (['resolved', 'closed'].includes(ticket.status) || !isOverdue(ticket, t)) return false;
    } else if (tab === 'mine') {
      if (['resolved', 'closed'].includes(ticket.status) || ticket.assignee !== activeAgentId) return false;
    } else if (tab === 'unassigned') {
      if (['resolved', 'closed'].includes(ticket.status) || ticket.assignee !== null) return false;
    } else {
      // Tab is 'all' — follow status dropdown
      if (status === 'active') {
        if (['resolved', 'closed'].includes(ticket.status)) return false;
      } else if (status !== 'all') {
        if (ticket.status !== status) return false;
      }
    }

    // 2. Priority filter
    if (priority !== 'all' && ticket.priority !== priority) return false;

    // Search
    if (search) {
      const q = search.toLowerCase();
      const searchable = [
        ticket.id,
        ticket.customer,
        ticket.company,
        ticket.subject,
        ticket.email,
      ].join(' ').toLowerCase();
      if (!searchable.includes(q)) return false;
    }

    return true;
  });
}

function escHtml(str) {
  return String(str ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
