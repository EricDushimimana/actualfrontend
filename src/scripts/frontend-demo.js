/* Frontend-only preview: authentication is intentionally not connected to a server. */
document.addEventListener('submit', function (event) {
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) return;
  if (form.id !== 'login-form' && form.id !== 'signup-form') return;

  event.preventDefault();
  event.stopImmediatePropagation();

  let notice = form.querySelector('[data-preview-auth-notice]');
  if (!notice) {
    notice = document.createElement('p');
    notice.dataset.previewAuthNotice = 'true';
    notice.setAttribute('role', 'status');
    notice.style.cssText = 'margin-top:14px;padding:12px 14px;border-radius:10px;background:#fff9e6;color:#6b5200;font-size:14px;line-height:1.5;';
    form.appendChild(notice);
  }

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  notice.textContent = 'Frontend preview only: this form is ready for the interface review, but account creation and sign-in will work after the backend is connected.';
}, true);
