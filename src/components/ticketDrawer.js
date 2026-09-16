/**
 * ticketDrawer.js — Sliding right-panel detail view for a single ticket.
 * Shows full info, SLA live timer, status transitions, assignment, and notes.
 */

import { slaStatusClass, timeRemaining } from '../engine/slaManager.js';
import { getSlaConfig } from '../engine/slaManager.js';
import { now } from '../engine/timeSimulator.js';
import { formatCountdown, formatDateTime, formatStatus, formatTimeAgo } from '../utils/formatters.js';
import { updateTicket, assignTicket, getTeam } from '../state/store.js';
import { showToast } from './toast.js';

let _currentTicketId = null;

export function initDrawer(container) {
  container.innerHTML = `
    <div class="drawer-overlay hidden" id="drawer-overlay"></div>
    <div class="drawer-panel hidden" id="drawer-panel" role="complementary" aria-label="Ticket details">
    </div>
  `;

  document.getElementById('drawer-overlay')?.addEventListener('click', closeDrawer);

  // Keyboard ESC closes drawer
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDrawer();
  });
}

export function openDrawer(ticket) {
  _currentTicketId = ticket.id;
  document.getElementById('drawer-overlay')?.classList.remove('hidden');
  document.getElementById('drawer-panel')?.classList.remove('hidden');
  renderDrawerContent(ticket);
}

export function closeDrawer() {
  _currentTicketId = null;
  document.getElementById('drawer-overlay')?.classList.add('hidden');
  document.getElementById('drawer-panel')?.classList.add('hidden');
}

export function updateDrawerTimer(ticket) {
  if (!_currentTicketId || _currentTicketId !== ticket.id) return;
  const t = now();
  const remaining = timeRemaining(ticket, t);
  const statusClass = slaStatusClass(ticket, t);

  const timerEl = document.getElementById('drawer-sla-timer');
  const barEl = document.getElementById('drawer-sla-bar');

  if (timerEl) {
    timerEl.textContent = formatCountdown(remaining);
    timerEl.className = `sla-panel-timer sla--${statusClass}`;
  }

  if (barEl) {
    const config = getSlaConfig();
    const slaHours = config[ticket.priority]?.hours ?? 24;
    const totalMs = slaHours * 3600 * 1000;
    const elapsed = ticket.slaDeadline - ticket.createdAt - Math.max(remaining, 0);
    const pct = Math.min(100, Math.max(0, (elapsed / totalMs) * 100));
    barEl.style.width = `${pct}%`;
    barEl.className = `sla-panel-bar-fill sla--${statusClass}`;
  }
}

function renderDrawerContent(ticket) {
  const t = now();
  const remaining = timeRemaining(ticket, t);
  const statusClass = slaStatusClass(ticket, t);
  const team = getTeam();
  const agent = team.find(a => a.id === ticket.assignee);
  const isResolved = ['resolved', 'closed'].includes(ticket.status);

  const config = getSlaConfig();
  const slaHours = config[ticket.priority]?.hours ?? 24;
  const totalMs = slaHours * 3600 * 1000;
  const elapsed = isResolved ? totalMs : (ticket.slaDeadline - ticket.createdAt - Math.max(remaining, 0));
  const barPct = isResolved ? 100 : Math.min(100, Math.max(0, (elapsed / totalMs) * 100));

  const statusOptions = ['open', 'in_progress', 'waiting', 'resolved', 'closed'];

  const panel = document.getElementById('drawer-panel');
  panel.innerHTML = `
    <div class="drawer-header">
      <div class="drawer-header-left">
        <span class="drawer-ticket-id">${ticket.id}</span>
        <h3 class="drawer-subject">${escHtml(ticket.subject)}</h3>
        <div class="drawer-badges">
          <span class="priority-badge priority--${ticket.priority}">${cap(ticket.priority)}</span>
          <span class="status-badge status--${ticket.status}">${formatStatus(ticket.status)}</span>
        </div>
      </div>
      <button class="drawer-close" id="drawer-close-btn" aria-label="Close details">✕</button>
    </div>

    <div class="drawer-body">

      <!-- SLA Panel -->
      <div class="sla-panel">
        <div class="drawer-section-title">SLA Status</div>
        <div class="sla-panel-timer sla--${statusClass}" id="drawer-sla-timer">
          ${isResolved ? '✅ Resolved' : formatCountdown(remaining)}
        </div>
        <div class="sla-panel-bar-track">
          <div class="sla-panel-bar-fill sla--${statusClass}" id="drawer-sla-bar" style="width:${barPct}%"></div>
        </div>
        <div class="sla-panel-meta">
          <span>Opened: ${formatTimeAgo(ticket.createdAt)}</span>
          <span>Deadline: ${formatDateTime(ticket.slaDeadline)}</span>
        </div>
      </div>

      <!-- Customer Info -->
      <div>
        <div class="drawer-section-title">Customer</div>
        <div class="drawer-info-grid">
          <div class="drawer-info-item">
            <div class="drawer-info-label">Name</div>
            <div class="drawer-info-value">${escHtml(ticket.customer)}</div>
          </div>
          <div class="drawer-info-item">
            <div class="drawer-info-label">Company</div>
            <div class="drawer-info-value">${escHtml(ticket.company || '—')}</div>
          </div>
          <div class="drawer-info-item">
            <div class="drawer-info-label">Email</div>
            <div class="drawer-info-value">${escHtml(ticket.email || '—')}</div>
          </div>
          <div class="drawer-info-item">
            <div class="drawer-info-label">Opened</div>
            <div class="drawer-info-value">${formatDateTime(ticket.createdAt)}</div>
          </div>
        </div>
      </div>

      <!-- Assignment -->
      <div>
        <div class="drawer-section-title">Assignee</div>
        <div class="assign-row">
          <select class="form-select" id="drawer-assign-select" style="max-width:200px;">
            <option value="">Unassigned</option>
            ${team.map(a => `<option value="${a.id}" ${ticket.assignee === a.id ? 'selected' : ''}>${a.name}</option>`).join('')}
          </select>
          <button class="btn btn--ghost btn--sm" id="drawer-assign-btn">Save</button>
        </div>
      </div>

      <!-- Status Transition -->
      ${!isResolved ? `
      <div>
        <div class="drawer-section-title">Change Status</div>
        <div class="status-actions">
          ${statusOptions.filter(s => s !== ticket.status).map(s => `
            <button class="btn btn--ghost btn--sm drawer-status-btn" data-status="${s}">
              → ${formatStatus(s)}
            </button>
          `).join('')}
        </div>
      </div>
      ` : ''}

      <!-- Notes -->
      <div>
        <div class="drawer-section-title">Notes</div>
        <textarea class="notes-area" id="drawer-notes" placeholder="Add notes, workarounds, or updates…">${escHtml(ticket.note ?? '')}</textarea>
        <div style="margin-top:8px;">
          <button class="btn btn--ghost btn--sm" id="drawer-save-note-btn">Save Note</button>
        </div>
      </div>

      <!-- History -->
      ${ticket.history?.length ? `
      <div>
        <div class="drawer-section-title">History</div>
        <div class="history-list">
          ${(ticket.history ?? []).map(h => `
            <div class="history-item">
              <span class="history-dot"></span>
              <span>${escHtml(h.msg)} — <em>${formatDateTime(h.at)}</em></span>
            </div>
          `).join('')}
        </div>
      </div>
      ` : ''}

    </div>
  `;

  // Events
  document.getElementById('drawer-close-btn')?.addEventListener('click', closeDrawer);

  document.getElementById('drawer-assign-btn')?.addEventListener('click', () => {
    const agentId = document.getElementById('drawer-assign-select')?.value || null;
    assignTicket(ticket.id, agentId);
    const name = team.find(a => a.id === agentId)?.name ?? 'Unassigned';
    showToast(`Assigned to ${name}`, 'success');
  });

  document.querySelectorAll('.drawer-status-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const newStatus = btn.dataset.status;
      updateTicket(ticket.id, { status: newStatus });
      showToast(`Status updated to ${formatStatus(newStatus)}`, 'success');
      closeDrawer();
    });
  });

  document.getElementById('drawer-save-note-btn')?.addEventListener('click', () => {
    const note = document.getElementById('drawer-notes')?.value ?? '';
    updateTicket(ticket.id, { note });
    showToast('Note saved', 'success');
  });
}

function escHtml(str) {
  return String(str ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function cap(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
