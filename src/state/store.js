/**
 * Reactive Store — Central state management with LocalStorage persistence.
 * Provides a simple pub/sub model for reactive UI updates.
 */

import { seedTickets, TEAM } from './seed-data.js';
import { computeDeadline } from '../engine/slaManager.js';
import { generateId } from '../utils/helpers.js';

const STORAGE_KEY = 'helpdesk_tickets_v2';

// ── State shape ───────────────────────────────────────────────────────────────
let _state = {
  tickets: [],
  activeAgent: 'priya', // Current logged-in agent
  team: TEAM,
};

// ── Subscribers ───────────────────────────────────────────────────────────────
const _subscribers = new Set();

function _notify() {
  const snapshot = getState();
  _subscribers.forEach(fn => fn(snapshot));
}

export function subscribe(fn) {
  _subscribers.add(fn);
  return () => _subscribers.delete(fn);
}

// ── Initialization ────────────────────────────────────────────────────────────
export function init() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      _state.tickets = parsed;
      return;
    } catch {
      // fall through to seed
    }
  }
  _state.tickets = seedTickets;
  _persist();
}

function _persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(_state.tickets));
}

// ── Getters ───────────────────────────────────────────────────────────────────
export function getState() {
  return { ..._state };
}

export function getTickets() {
  return _state.tickets;
}

export function getTicketById(id) {
  return _state.tickets.find(t => t.id === id) ?? null;
}

export function getActiveAgent() {
  return _state.activeAgent;
}

export function getTeam() {
  return _state.team;
}

export function getAgentById(id) {
  return _state.team.find(a => a.id === id) ?? null;
}

// ── Mutations ─────────────────────────────────────────────────────────────────

export function setActiveAgent(agentId) {
  _state.activeAgent = agentId;
  _notify();
}

/**
 * Create a new ticket and add it to the store.
 */
export function createTicket({ customer, email, company, subject, priority, assignee }) {
  const createdAt = Date.now();
  const ticket = {
    id: generateId(),
    customer,
    email: email ?? '',
    company: company ?? '',
    subject,
    priority,
    status: 'open',
    assignee: assignee ?? null,
    createdAt,
    slaDeadline: computeDeadline(priority, createdAt),
    resolvedAt: null,
    note: null,
    history: [{ at: createdAt, msg: 'Ticket created' }],
  };
  _state.tickets = [ticket, ..._state.tickets];
  _persist();
  _notify();
  return ticket;
}

/**
 * Update specific fields on a ticket.
 */
export function updateTicket(id, changes) {
  _state.tickets = _state.tickets.map(t => {
    if (t.id !== id) return t;
    const updated = { ...t, ...changes };
    // Recompute SLA if priority changed
    if (changes.priority && changes.priority !== t.priority) {
      updated.slaDeadline = computeDeadline(updated.priority, updated.createdAt);
    }
    // Track status changes in history
    if (changes.status && changes.status !== t.status) {
      const entry = { at: Date.now(), msg: `Status changed to ${changes.status}` };
      updated.history = [...(t.history ?? []), entry];
      if (changes.status === 'resolved' || changes.status === 'closed') {
        updated.resolvedAt = Date.now();
      }
    }
    return updated;
  });
  _persist();
  _notify();
}

/**
 * Assign a ticket to an agent (or null to unassign).
 */
export function assignTicket(id, agentId) {
  updateTicket(id, { assignee: agentId });
}

/**
 * Delete a ticket permanently.
 */
export function deleteTicket(id) {
  _state.tickets = _state.tickets.filter(t => t.id !== id);
  _persist();
  _notify();
}

/**
 * Reset to seed data (for demo/testing).
 */
export function resetToSeed() {
  _state.tickets = seedTickets;
  _persist();
  _notify();
}
