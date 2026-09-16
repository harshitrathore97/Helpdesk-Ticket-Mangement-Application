/**
 * Time Simulator — Provides a real-time clock and an optional
 * time-warp offset so Priya (and evaluators) can watch tickets
 * breach their SLA deadline and leap to the front of the queue live.
 */

let _offset = 0; // ms added to real Date.now()
let _listeners = new Set();
let _tickInterval = null;

/**
 * Returns the current simulated time in milliseconds.
 */
export function now() {
  return Date.now() + _offset;
}

/**
 * Advance the simulated clock by `deltaMs` milliseconds.
 */
export function advanceTime(deltaMs) {
  _offset += deltaMs;
  _notifyListeners();
}

/**
 * Reset the simulated clock back to real time.
 */
export function resetTime() {
  _offset = 0;
  _notifyListeners();
}

/**
 * Returns the current time offset in milliseconds.
 */
export function getOffset() {
  return _offset;
}

/**
 * Subscribe to clock ticks (called every second).
 * @param {Function} fn — callback(nowMs)
 * @returns {Function} unsubscribe function
 */
export function subscribe(fn) {
  _listeners.add(fn);
  _ensureRunning();
  return () => {
    _listeners.delete(fn);
    if (_listeners.size === 0) _stopTicker();
  };
}

function _notifyListeners() {
  const t = now();
  _listeners.forEach(fn => fn(t));
}

function _ensureRunning() {
  if (_tickInterval !== null) return;
  _tickInterval = setInterval(() => {
    _notifyListeners();
  }, 1000);
}

function _stopTicker() {
  if (_tickInterval !== null) {
    clearInterval(_tickInterval);
    _tickInterval = null;
  }
}

/**
 * Format the current offset as a human-readable string for the UI.
 * e.g. "+2h 30m ahead", "Real time"
 */
export function formatOffset() {
  if (_offset === 0) return 'Real time';
  const sign = _offset > 0 ? '+' : '-';
  const abs = Math.abs(_offset);
  const h = Math.floor(abs / (3600 * 1000));
  const m = Math.floor((abs % (3600 * 1000)) / (60 * 1000));
  const parts = [];
  if (h) parts.push(`${h}h`);
  if (m) parts.push(`${m}m`);
  if (!parts.length) parts.push('<1m');
  return `${sign}${parts.join(' ')} ahead`;
}
