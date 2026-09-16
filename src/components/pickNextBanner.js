/**
 * pickNextBanner.js — Hero callout showing the #1 most pressing ticket.
 */

import { nextTicket } from '../engine/queueEngine.js';
import { slaStatusClass, timeRemaining } from '../engine/slaManager.js';
import { now } from '../engine/timeSimulator.js';
import { formatCountdown } from '../utils/formatters.js';
import { getTeam } from '../state/store.js';

export function renderPickNextBanner(tickets, container, { onPick, onView }) {
  const t = now();
  const top = nextTicket(tickets, t);

  if (!top) {
    container.innerHTML = `
      <div class="pick-next-banner" style="opacity:0.5; justify-content:center;">
        <span style="font-size:20px;">🎉</span>
        <span style="font-size:14px; color:var(--text-secondary);">Queue is clear — great work!</span>
      </div>
    `;
    return;
  }

  const statusClass = slaStatusClass(top, t);
  const remaining = timeRemaining(top, t);
  const countdown = formatCountdown(remaining);
  const team = getTeam();
  const agent = team.find(a => a.id === top.assignee);

  const isOverdueTicket = remaining < 0;

  container.innerHTML = `
    <div class="pick-next-banner ${isOverdueTicket ? 'animate-flash-red' : ''}" style="${isOverdueTicket ? 'border-color: rgba(239,68,68,0.4);' : ''}">
      <div class="pick-next-rank">#1</div>
      <div class="pick-next-content">
        <div class="pick-next-label">
          ${isOverdueTicket ? '🚨 OVERDUE — Pick this ticket now' : '⚡ Next Most Pressing Ticket'}
        </div>
        <div class="pick-next-subject">${escHtml(top.subject)}</div>
        <div class="pick-next-meta">
          <span class="font-mono sla-timer sla--${statusClass}" id="pick-next-timer">${countdown}</span>
          <span>·</span>
          <span>${escHtml(top.customer)}</span>
          <span>·</span>
          <span class="priority-badge priority--${top.priority}">${cap(top.priority)}</span>
          ${agent ? `<span>·</span><span>${agent.name}</span>` : '<span>· Unassigned</span>'}
        </div>
      </div>
      <div class="pick-next-actions">
        <button class="btn btn--ghost btn--sm" id="pick-next-view-btn">View</button>
        <button class="btn btn--primary btn--sm" id="pick-next-btn">
          ${top.assignee ? '▶ Resume' : '▶ Pick & Assign'}
        </button>
      </div>
    </div>
  `;

  document.getElementById('pick-next-btn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    onPick(top);
  });
  document.getElementById('pick-next-view-btn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    onView(top);
  });
}

export function updatePickNextTimer(tickets) {
  const t = now();
  const top = nextTicket(tickets, t);
  const el = document.getElementById('pick-next-timer');
  if (!el || !top) return;
  const remaining = timeRemaining(top, t);
  const statusClass = slaStatusClass(top, t);
  el.textContent = formatCountdown(remaining);
  el.className = `font-mono sla-timer sla--${statusClass}`;
}

function escHtml(str) {
  return String(str ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function cap(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
