/**
 * SLA Manager — Computes deadlines and breach status for all tickets.
 * SLA definitions can be overridden via settings.
 */

export const DEFAULT_SLA_CONFIG = {
  urgent: { label: 'Urgent', hours: 2, color: '#ff4444', weight: 4 },
  high:   { label: 'High',   hours: 4, color: '#ff8c00', weight: 3 },
  normal: { label: 'Normal', hours: 24, color: '#4c9eff', weight: 2 },
  low:    { label: 'Low',    hours: 48, color: '#22c55e', weight: 1 },
};

let _slaConfig = { ...DEFAULT_SLA_CONFIG };

export function setSlaConfig(config) {
  _slaConfig = { ...DEFAULT_SLA_CONFIG, ...config };
}

export function getSlaConfig() {
  return _slaConfig;
}

/**
 * Compute the SLA deadline timestamp for a ticket.
 * @param {string} priority  — 'urgent' | 'high' | 'normal' | 'low'
 * @param {number} createdAt — Unix ms timestamp
 * @returns {number} deadline Unix ms timestamp
 */
export function computeDeadline(priority, createdAt) {
  const sla = _slaConfig[priority] ?? _slaConfig.normal;
  return createdAt + sla.hours * 60 * 60 * 1000;
}

/**
 * Returns milliseconds remaining until the SLA deadline.
 * Negative means overdue.
 */
export function timeRemaining(ticket, nowMs) {
  return ticket.slaDeadline - nowMs;
}

/**
 * Returns true if the ticket has breached its SLA deadline.
 */
export function isOverdue(ticket, nowMs) {
  if (['resolved', 'closed'].includes(ticket.status)) return false;
  return timeRemaining(ticket, nowMs) < 0;
}

/**
 * Returns a human-readable SLA status string.
 */
export function slaStatusLabel(ticket, nowMs) {
  if (['resolved', 'closed'].includes(ticket.status)) return 'Resolved';
  const ms = timeRemaining(ticket, nowMs);
  if (ms < 0) return 'OVERDUE';
  if (ms < 30 * 60 * 1000) return 'Critical';
  if (ms < 60 * 60 * 1000) return 'Imminent';
  if (ms < 4 * 60 * 60 * 1000) return 'Soon';
  return 'On Track';
}

/**
 * Maps slaStatusLabel → CSS class suffix for visual theming.
 */
export function slaStatusClass(ticket, nowMs) {
  const label = slaStatusLabel(ticket, nowMs);
  const map = {
    OVERDUE: 'overdue',
    Critical: 'critical',
    Imminent: 'imminent',
    Soon: 'soon',
    'On Track': 'on-track',
    Resolved: 'resolved',
  };
  return map[label] ?? 'on-track';
}
