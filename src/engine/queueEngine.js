/**
 * Queue Engine — The heart of the system.
 *
 * ORDERING RULES (applied in strict precedence):
 *   Tier 1 — OVERDUE tickets (SLA breached) float to the absolute top,
 *             sorted by severity (most overdue → least overdue).
 *   Tier 2 — ACTIVE tickets sorted by time remaining to SLA deadline (nearest first).
 *             Tie-break: priority weight (urgent > high > normal > low).
 *             Second tie-break: creation timestamp (oldest FIFO).
 *   Tier 3 — RESOLVED / CLOSED tickets pushed to the bottom (sorted by resolvedAt desc).
 *
 * Resolved tickets are always last regardless of everything else.
 */

import { timeRemaining, isOverdue } from './slaManager.js';
import { getSlaConfig } from './slaManager.js';

const RESOLVED_STATUSES = new Set(['resolved', 'closed']);

function priorityWeight(ticket) {
  const config = getSlaConfig();
  return config[ticket.priority]?.weight ?? 0;
}

function isResolved(ticket) {
  return RESOLVED_STATUSES.has(ticket.status);
}

/**
 * Core comparator for sorting two tickets.
 * Returns negative if `a` should appear before `b`.
 */
export function compareTickets(a, b, nowMs) {
  const aResolved = isResolved(a);
  const bResolved = isResolved(b);

  // Tier 3: Push resolved tickets to the bottom
  if (aResolved && !bResolved) return 1;
  if (!aResolved && bResolved) return -1;
  if (aResolved && bResolved) {
    // Among resolved: sort by resolvedAt descending (most recent first)
    return (b.resolvedAt ?? 0) - (a.resolvedAt ?? 0);
  }

  const aOverdue = isOverdue(a, nowMs);
  const bOverdue = isOverdue(b, nowMs);

  // Tier 1: Overdue tickets always beat non-overdue
  if (aOverdue && !bOverdue) return -1;
  if (!aOverdue && bOverdue) return 1;

  // Both overdue: most severely overdue (lowest/most-negative timeRemaining) ranks higher
  if (aOverdue && bOverdue) {
    const diff = timeRemaining(a, nowMs) - timeRemaining(b, nowMs);
    if (diff !== 0) return diff; // more negative = more overdue = first
    return priorityWeight(b) - priorityWeight(a);
  }

  // Tier 2: Both active within SLA — nearest deadline first
  const remaining = timeRemaining(a, nowMs) - timeRemaining(b, nowMs);
  if (Math.abs(remaining) > 1000) return remaining; // > 1 second difference

  // Tie-break 1: Priority weight (higher weight = higher priority = first)
  const weightDiff = priorityWeight(b) - priorityWeight(a);
  if (weightDiff !== 0) return weightDiff;

  // Tie-break 2: FIFO — older ticket goes first
  return a.createdAt - b.createdAt;
}

/**
 * Returns a sorted copy of the given ticket array using the queue ordering rules.
 * @param {object[]} tickets
 * @param {number}   nowMs    — current time in milliseconds
 * @returns {object[]} sorted tickets
 */
export function sortQueue(tickets, nowMs) {
  return [...tickets].sort((a, b) => compareTickets(a, b, nowMs));
}

/**
 * Returns just the active (non-resolved) tickets, sorted by urgency.
 */
export function activeQueue(tickets, nowMs) {
  return sortQueue(
    tickets.filter(t => !isResolved(t)),
    nowMs
  );
}

/**
 * Returns the single most pressing ticket (first in sorted active queue).
 */
export function nextTicket(tickets, nowMs) {
  const sorted = activeQueue(tickets, nowMs);
  return sorted[0] ?? null;
}
