/**
 * toast.js — Lightweight toast notification system.
 */

let _container = null;

export function initToast() {
  _container = document.createElement('div');
  _container.className = 'toast-container';
  _container.id = 'toast-container';
  document.body.appendChild(_container);
}

/**
 * @param {string} message
 * @param {'success'|'error'|'info'} type
 * @param {number} duration ms
 */
export function showToast(message, type = 'info', duration = 3500) {
  if (!_container) initToast();

  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] ?? 'ℹ️'}</span>
    <span class="toast-msg">${escHtml(message)}</span>
  `;
  _container.appendChild(toast);

  // Auto-remove after duration
  setTimeout(() => {
    toast.style.animation = 'toastOut 0.25s ease forwards';
    setTimeout(() => toast.remove(), 250);
  }, duration);
}

function escHtml(str) {
  return String(str ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
