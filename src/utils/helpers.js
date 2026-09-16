/**
 * Helpers — Generic utility functions.
 */

let _idCounter = 1000;

/**
 * Generate a unique ticket ID like "TKT-1042"
 */
export function generateId() {
  return `TKT-${++_idCounter}`;
}

/**
 * Debounce a function — calls `fn` at most once per `delay` ms.
 */
export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Clamp a number between min and max.
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Deep clone a plain object (JSON-safe).
 */
export function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Return a query-safe string for filtering
 */
export function normalizeSearch(str) {
  return (str ?? '').toLowerCase().trim();
}

/**
 * Create a DOM element with optional attributes and children.
 */
export function el(tag, attrs = {}, ...children) {
  const element = document.createElement(tag);
  for (const [key, val] of Object.entries(attrs)) {
    if (key === 'className') element.className = val;
    else if (key === 'innerHTML') element.innerHTML = val;
    else if (key.startsWith('on')) element.addEventListener(key.slice(2).toLowerCase(), val);
    else element.setAttribute(key, val);
  }
  for (const child of children) {
    if (child == null) continue;
    if (typeof child === 'string') element.appendChild(document.createTextNode(child));
    else element.appendChild(child);
  }
  return element;
}

/**
 * Select a single DOM element (shorthand).
 */
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

/**
 * Select all matching DOM elements (shorthand).
 */
export function qsa(selector, parent = document) {
  return Array.from(parent.querySelectorAll(selector));
}
