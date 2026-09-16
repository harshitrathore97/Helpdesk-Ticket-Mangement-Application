/**
 * queueHeader.js — Live stats banner: Overdue, Approaching, Active, Resolved.
 */

import { isOverdue, timeRemaining } from '../engine/slaManager.js';
import { now } from '../engine/timeSimulator.js';

export function renderQueueHeader(tickets, container) {
  const t = now();
  const active = tickets.filter(tk => !['resolved', 'closed'].includes(tk.status));
  const overdue = active.filter(tk => isOverdue(tk, t));
  const approaching = active.filter(tk => {
    const rem = timeRemaining(tk, t);
    return rem >= 0 && rem < 60 * 60 * 1000; // within 1 hour
  });
  const resolved = tickets.filter(tk => tk.status === 'resolved' || tk.status === 'closed');

  container.innerHTML = `
    <div class="stats-banner">
      <div class="stat-card stat--overdue" id="stat-overdue">
        <span class="stat-icon">🔴</span>
        <div class="stat-content">
          <div class="stat-value" id="stat-overdue-count">${overdue.length}</div>
          <div class="stat-label">Overdue</div>
        </div>
        ${overdue.length > 0 ? '<span class="stat-badge-pulse"></span>' : ''}
      </div>
      <div class="stat-card stat--urgent" id="stat-approaching">
        <span class="stat-icon">⚡</span>
        <div class="stat-content">
          <div class="stat-value" id="stat-approaching-count">${approaching.length}</div>
          <div class="stat-label">Due &lt; 1h</div>
        </div>
      </div>
      <div class="stat-card stat--active" id="stat-active">
        <span class="stat-icon">📋</span>
        <div class="stat-content">
          <div class="stat-value" id="stat-active-count">${active.length}</div>
          <div class="stat-label">Active Tickets</div>
        </div>
      </div>
      <div class="stat-card stat--resolved" id="stat-resolved">
        <span class="stat-icon">✅</span>
        <div class="stat-content">
          <div class="stat-value" id="stat-resolved-count">${resolved.length}</div>
          <div class="stat-label">Resolved Today</div>
        </div>
      </div>
    </div>
  `;
}

export function updateQueueHeader(tickets) {
  const t = now();
  const active = tickets.filter(tk => !['resolved', 'closed'].includes(tk.status));
  const overdue = active.filter(tk => isOverdue(tk, t));
  const approaching = active.filter(tk => {
    const rem = timeRemaining(tk, t);
    return rem >= 0 && rem < 60 * 60 * 1000;
  });
  const resolved = tickets.filter(tk => tk.status === 'resolved' || tk.status === 'closed');

  const prevOverdue = parseInt(document.getElementById('stat-overdue-count')?.textContent ?? '0');

  document.getElementById('stat-overdue-count') && (document.getElementById('stat-overdue-count').textContent = overdue.length);
  document.getElementById('stat-approaching-count') && (document.getElementById('stat-approaching-count').textContent = approaching.length);
  document.getElementById('stat-active-count') && (document.getElementById('stat-active-count').textContent = active.length);
  document.getElementById('stat-resolved-count') && (document.getElementById('stat-resolved-count').textContent = resolved.length);

  // Animate badge pop if overdue count changed
  if (overdue.length !== prevOverdue) {
    const el = document.getElementById('stat-overdue-count');
    if (el) {
      el.classList.remove('animate-badge-pop');
      void el.offsetWidth;
      el.classList.add('animate-badge-pop');
    }
  }
}
