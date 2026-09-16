/**
 * ticketModal.js — Create new ticket modal with SLA preview.
 */

import { getSlaConfig } from '../engine/slaManager.js';
import { createTicket } from '../state/store.js';
import { getTeam } from '../state/store.js';
import { showToast } from './toast.js';

export function renderTicketModal(container) {
  container.innerHTML = `
    <div class="modal-overlay hidden" id="create-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div class="modal-box">
        <div class="modal-header">
          <h2 class="modal-title" id="modal-title">Create New Ticket</h2>
          <button class="modal-close" id="modal-close-btn" aria-label="Close">✕</button>
        </div>
        <div class="modal-body" id="modal-body">
          <div class="form-group">
            <label class="form-label" for="f-customer">Customer Name <span class="required">*</span></label>
            <input id="f-customer" class="form-input" type="text" placeholder="e.g. Marcus Vance" required />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="f-email">Email</label>
              <input id="f-email" class="form-input" type="email" placeholder="customer@company.com" />
            </div>
            <div class="form-group">
              <label class="form-label" for="f-company">Company</label>
              <input id="f-company" class="form-input" type="text" placeholder="Acme Corp" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label" for="f-subject">Issue / Subject <span class="required">*</span></label>
            <textarea id="f-subject" class="form-textarea" placeholder="Describe the issue clearly…" rows="3"></textarea>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="f-priority">Priority <span class="required">*</span></label>
              <select id="f-priority" class="form-select">
                <option value="urgent">🔴 Urgent (2h SLA)</option>
                <option value="high">🟠 High (4h SLA)</option>
                <option value="normal" selected>🔵 Normal (24h SLA)</option>
                <option value="low">🟢 Low (48h SLA)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" for="f-assignee">Assign To</label>
              <select id="f-assignee" class="form-select">
                <option value="">Unassigned</option>
                ${getTeam().map(a => `<option value="${a.id}">${a.name}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="sla-preview" id="sla-preview-box">
            <span class="sla-preview-label">⏱ SLA Deadline:</span>
            <span class="sla-preview-value" id="sla-preview-val">Response due within 24 hours</span>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn--ghost" id="modal-cancel-btn">Cancel</button>
          <button class="btn btn--primary" id="modal-submit-btn">Create Ticket</button>
        </div>
      </div>
    </div>
  `;

  const modal = document.getElementById('create-modal');
  const prioritySelect = document.getElementById('f-priority');
  const slaPreview = document.getElementById('sla-preview-val');

  function updateSlaPreview() {
    const config = getSlaConfig();
    const p = prioritySelect.value;
    const hours = config[p]?.hours ?? 24;
    slaPreview.textContent = `Response due within ${hours < 24 ? `${hours} hour${hours > 1 ? 's' : ''}` : `${hours / 24} day${hours > 24 ? 's' : ''}`}`;
  }

  prioritySelect?.addEventListener('change', updateSlaPreview);

  document.getElementById('modal-close-btn')?.addEventListener('click', closeModal);
  document.getElementById('modal-cancel-btn')?.addEventListener('click', closeModal);

  modal?.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  document.getElementById('modal-submit-btn')?.addEventListener('click', () => {
    const customer = document.getElementById('f-customer')?.value.trim();
    const subject  = document.getElementById('f-subject')?.value.trim();
    const email    = document.getElementById('f-email')?.value.trim();
    const company  = document.getElementById('f-company')?.value.trim();
    const priority = document.getElementById('f-priority')?.value;
    const assignee = document.getElementById('f-assignee')?.value || null;

    if (!customer) { alert('Customer name is required.'); return; }
    if (!subject)  { alert('Subject is required.'); return; }

    createTicket({ customer, email, company, subject, priority, assignee });
    showToast(`Ticket created for ${customer}`, 'success');
    closeModal();
    resetForm();
  });
}

export function openCreateModal() {
  const modal = document.getElementById('create-modal');
  if (modal) {
    modal.classList.remove('hidden');
    document.getElementById('f-customer')?.focus();
  }
}

function closeModal() {
  document.getElementById('create-modal')?.classList.add('hidden');
}

function resetForm() {
  ['f-customer','f-email','f-company','f-subject'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  const priority = document.getElementById('f-priority');
  if (priority) priority.value = 'normal';
  const assignee = document.getElementById('f-assignee');
  if (assignee) assignee.value = '';
}
