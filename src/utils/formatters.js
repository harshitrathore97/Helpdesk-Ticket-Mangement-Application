/**
 * Formatters — Human-readable time and status display helpers.
 */

/**
 * Format milliseconds remaining into a countdown string.
 * Positive: "Due in 1h 22m"
 * Negative: "Overdue by 14m"
 * Zero:     "Due now"
 */
export function formatCountdown(ms) {
  if (ms === 0) return 'Due now';
  const abs = Math.abs(ms);
  const h = Math.floor(abs / (3600 * 1000));
  const m = Math.floor((abs % (3600 * 1000)) / (60 * 1000));
  const s = Math.floor((abs % (60 * 1000)) / 1000);

  const parts = [];
  if (h > 0) parts.push(`${h}h`);
  if (m > 0 || h > 0) parts.push(`${m}m`);
  if (h === 0) parts.push(`${s}s`);

  const timeStr = parts.join(' ');
  return ms < 0 ? `Overdue by ${timeStr}` : `Due in ${timeStr}`;
}

/**
 * Format a Unix ms timestamp to a locale date-time string.
 */
export function formatDateTime(ms) {
  if (!ms) return '—';
  return new Date(ms).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Format time ago (e.g. "3h ago", "just now")
 */
export function formatTimeAgo(ms) {
  const diff = Date.now() - ms;
  if (diff < 60_000) return 'just now';
  const m = Math.floor(diff / 60_000);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);
  if (d > 0) return `${d}d ago`;
  if (h > 0) return `${h}h ago`;
  return `${m}m ago`;
}

/**
 * Capitalize first letter of a string.
 */
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Format status for display (e.g. 'in_progress' → 'In Progress')
 */
export function formatStatus(status) {
  return status
    .split('_')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
