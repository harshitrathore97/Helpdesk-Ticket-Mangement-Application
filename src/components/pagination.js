/**
 * pagination.js — Pagination controls with per-page selector and keyboard nav.
 */

let _page = 1;
let _perPage = 15;

export function getPage() { return _page; }
export function getPerPage() { return _perPage; }
export function setPage(p) { _page = p; }

export function paginateTickets(tickets) {
  const start = (_page - 1) * _perPage;
  const end = start + _perPage;
  return tickets.slice(start, end);
}

export function totalPages(ticketCount) {
  return Math.max(1, Math.ceil(ticketCount / _perPage));
}

export function renderPagination(container, { total, onChange }) {
  const pages = totalPages(total);
  const safeCurrentPage = Math.min(_page, pages);
  if (safeCurrentPage !== _page) { _page = safeCurrentPage; }

  const start = (_page - 1) * _perPage + 1;
  const end = Math.min(_page * _perPage, total);

  // Build page buttons (show at most 7 buttons with ellipsis)
  const pageButtons = buildPageButtons(_page, pages);

  container.innerHTML = `
    <div class="pagination">
      <div class="pagination-info">
        ${total === 0 ? 'No tickets' : `Showing <strong>${start}–${end}</strong> of <strong>${total}</strong>`}
      </div>
      <div class="pagination-controls">
        <button class="page-btn" id="page-prev" aria-label="Previous page" ${_page <= 1 ? 'disabled' : ''}>‹</button>
        ${pageButtons}
        <button class="page-btn" id="page-next" aria-label="Next page" ${_page >= pages ? 'disabled' : ''}>›</button>
        <select class="per-page-select" id="per-page-select" title="Rows per page">
          ${[10, 15, 25, 50].map(n =>
            `<option value="${n}" ${_perPage === n ? 'selected' : ''}>${n} / page</option>`
          ).join('')}
        </select>
      </div>
    </div>
  `;

  document.getElementById('page-prev')?.addEventListener('click', () => {
    if (_page > 1) { _page--; onChange(); }
  });

  document.getElementById('page-next')?.addEventListener('click', () => {
    if (_page < pages) { _page++; onChange(); }
  });

  container.querySelectorAll('.page-btn[data-page]').forEach(btn => {
    btn.addEventListener('click', () => {
      _page = parseInt(btn.dataset.page);
      onChange();
    });
  });

  document.getElementById('per-page-select')?.addEventListener('change', e => {
    _perPage = parseInt(e.target.value);
    _page = 1;
    onChange();
  });
}

function buildPageButtons(current, total) {
  if (total <= 7) {
    return range(1, total + 1).map(p => pageBtn(p, current)).join('');
  }

  const buttons = [];
  buttons.push(pageBtn(1, current));

  if (current > 4) buttons.push('<span class="page-dots">…</span>');

  const lo = Math.max(2, current - 2);
  const hi = Math.min(total - 1, current + 2);

  for (let p = lo; p <= hi; p++) {
    buttons.push(pageBtn(p, current));
  }

  if (current < total - 3) buttons.push('<span class="page-dots">…</span>');
  buttons.push(pageBtn(total, current));

  return buttons.join('');
}

function pageBtn(p, current) {
  return `<button class="page-btn ${p === current ? 'active' : ''}" data-page="${p}">${p}</button>`;
}

function range(start, end) {
  return Array.from({ length: end - start }, (_, i) => start + i);
}
