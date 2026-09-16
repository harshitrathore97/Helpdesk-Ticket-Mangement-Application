/**
 * ticketList.js — Renders the main ticket queue table with live SLA timers.
 */

import { slaStatusClass, timeRemaining, isOverdue } from '../engine/slaManager.js';
import { getSlaConfig } from '../engine/slaManager.js';
import { now } from '../engine/timeSimulator.js';
import { formatCountdown, formatDateTime, formatStatus } from '../utils/formatters.js';
import { getTeam } from '../state/store.js';

export function renderTicketList(tickets, container, { onView, onAssign, onResolve, onStatusChange }) {
  const team = getTeam();

  if (tickets.length === 0) {
    container.innerHTML = `
      <div class="queue-empty">
        <div class="queue-empty-icon">🗂️</div>
        <div class="queue-empty-title">No tickets match</div>
        <div class="queue-empty-subtitle">Try adjusting your filters or search query</div>
      </div>
    `;
    return;
  }

  const t = now();

  const rows = tickets.map((ticket, idx) => renderRow(ticket, idx, t, team, { onView, onAssign, onResolve, onStatusChange }));

  container.innerHTML = `
    <table class="queue-table" aria-label="Helpdesk ticket queue">
      <thead>
        <tr>
          <th class="col-rank">#</th>
          <th class="col-id">ID</th>
          <th class="col-subject">Subject</th>
          <th class="col-customer">Customer</th>
          <th class="col-priority">Priority</th>
          <th class="col-status">Status</th>
          <th class="col-assignee">Assignee</th>
          <th class="col-sla">SLA / Deadline</th>
          <th class="col-actions">Actions</th>
        </tr>
      </thead>
      <tbody id="ticket-tbody">
        ${rows.join('')}
      </tbody>
    </table>
  `;

  // Bind click events
  container.querySelectorAll('.ticket-row').forEach(row => {
    row.addEventListener('click', (e) => {
      if (e.target.closest('.action-btn')) return;
      const id = row.dataset.id;
      const ticket = tickets.find(t2 => t2.id === id);
      if (ticket) onView(ticket);
    });
  });

  container.querySelectorAll('.action--view').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const ticket = tickets.find(t2 => t2.id === id);
      if (ticket) onView(ticket);
    });
  });

  container.querySelectorAll('.action--assign').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const ticket = tickets.find(t2 => t2.id === id);
      if (ticket) onAssign(ticket);
    });
  });

  container.querySelectorAll('.action--resolve').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const ticket = tickets.find(t2 => t2.id === id);
      if (ticket) onResolve(ticket);
    });
  });
}

/**
 * Update only the SLA timer cells (called every second).
 */
export function updateTicketTimers(tickets) {
  const t = now();
  tickets.forEach(ticket => {
    const timerEl = document.getElementById(`sla-timer-${ticket.id}`);
    const barEl = document.getElementById(`sla-bar-${ticket.id}`);
    if (!timerEl) return;

    const statusClass = slaStatusClass(ticket, t);
    const remaining = timeRemaining(ticket, t);
    const isRes = ['resolved', 'closed'].includes(ticket.status);

    if (isRes) {
      timerEl.textContent = 'Resolved';
      timerEl.className = `sla-timer sla--resolved`;
      return;
    }

    timerEl.textContent = formatCountdown(remaining);
    timerEl.className = `sla-timer sla--${statusClass}`;

    if (barEl) {
      const config = getSlaConfig();
      const slaHours = config[ticket.priority]?.hours ?? 24;
      const totalMs = slaHours * 3600 * 1000;
      const elapsed = ticket.slaDeadline - ticket.createdAt - Math.max(remaining, 0);
      const pct = Math.min(100, Math.max(0, (elapsed / totalMs) * 100));
      barEl.style.width = `${pct}%`;
      barEl.className = `sla-bar-fill sla--${statusClass}`;
    }

    // If ticket just became overdue, update the row class
    const row = document.querySelector(`.ticket-row[data-id="${ticket.id}"]`);
    if (row && remaining < 0) {
      row.classList.add('row--overdue');
      row.classList.remove('row--critical');
    } else if (row && remaining < 30 * 60 * 1000) {
      row.classList.add('row--critical');
    }
  });
}

function renderRow(ticket, idx, t, team, handlers) {
  const statusClass = slaStatusClass(ticket, t);
  const remaining = timeRemaining(ticket, t);
  const overdue = isOverdue(ticket, t);
  const isResolved = ['resolved', 'closed'].includes(ticket.status);

  const agent = team.find(a => a.id === ticket.assignee);

  // SLA bar percentage
  const config = getSlaConfig();
  const slaHours = config[ticket.priority]?.hours ?? 24;
  const totalMs = slaHours * 3600 * 1000;
  const elapsed = isResolved ? totalMs : (ticket.slaDeadline - ticket.createdAt - Math.max(remaining, 0));
  const barPct = isResolved ? 100 : Math.min(100, Math.max(0, (elapsed / totalMs) * 100));

  const rowClass = [
    'ticket-row',
    overdue ? 'row--overdue' : '',
    !overdue && remaining < 30 * 60 * 1000 && !isResolved ? 'row--critical' : '',
    isResolved ? 'row--resolved' : '',
  ].filter(Boolean).join(' ');

  const rankClass = idx === 0 && !isResolved ? 'rank-cell rank--top' : overdue ? 'rank-cell rank--overdue' : 'rank-cell';

  const agentHtml = agent
    ? `<div class="assignee-chip">
         <div class="agent-avatar" style="background:${agent.color}20; color:${agent.color};">${agent.avatar}</div>
         <span class="agent-name">${escHtml(agent.name.split(' ')[0])}</span>
       </div>`
    : `<span class="unassigned-chip">○ Unassigned</span>`;

  const actionsHtml = isResolved
    ? `<div class="actions-cell">
         <button class="action-btn action--view" data-id="${ticket.id}" title="View">👁</button>
       </div>`
    : `<div class="actions-cell">
         <button class="action-btn action--view" data-id="${ticket.id}" title="View details">👁</button>
         <button class="action-btn action--assign" data-id="${ticket.id}" title="Assign">👤</button>
         <button class="action-btn action--resolve" data-id="${ticket.id}" title="Mark resolved">✓</button>
       </div>`;

  return `
    <tr class="${rowClass}" data-id="${ticket.id}" tabindex="0" aria-label="Ticket ${ticket.id}: ${escHtml(ticket.subject)}">
      <td><div class="${rankClass}">${idx + 1}</div></td>
      <td><span class="ticket-id">${ticket.id}</span></td>
      <td>
        <div class="ticket-subject-wrap">
          <span class="ticket-subject">${escHtml(ticket.subject)}</span>
          <span class="ticket-company">${escHtml(ticket.company)}</span>
        </div>
      </td>
      <td>
        <div class="customer-cell">
          <span class="customer-name">${escHtml(ticket.customer)}</span>
          <span class="customer-company">${escHtml(ticket.email)}</span>
        </div>
      </td>
      <td>
        <div style="display:flex;align-items:center;gap:4px;flex-wrap:wrap;">
          <span class="priority-badge priority--${ticket.priority}">${cap(ticket.priority)}</span>
          ${ticket.isEscalated ? `<span class="badge-escalated" title="Priority auto-escalated (+${ticket.escalationCount || 1} level) due to SLA breach">⚡ Escalated</span>` : ''}
        </div>
      </td>
      <td><span class="status-badge status--${ticket.status}">${formatStatus(ticket.status)}</span></td>
      <td>${agentHtml}</td>
      <td>
        <div class="sla-cell">
          <span class="sla-timer sla--${statusClass}" id="sla-timer-${ticket.id}">
            ${isResolved ? 'Resolved' : formatCountdown(remaining)}
          </span>
          <div class="sla-bar-track">
            <div class="sla-bar-fill sla--${statusClass}" id="sla-bar-${ticket.id}" style="width:${barPct}%"></div>
          </div>
        </div>
      </td>
      <td>${actionsHtml}</td>
    </tr>
  `;
}

function escHtml(str) {
  return String(str ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function cap(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
