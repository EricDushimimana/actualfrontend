(function () {
  const apiUrl = new URL('../../api/index.php', document.currentScript.src);
  let csrfToken = '';
  let csrfPromise = null;
  async function getCsrf() {
    if (csrfToken) return csrfToken;
    if (!csrfPromise) {
      csrfPromise = fetch(apiUrl.href + '?action=csrf', {
        method: 'POST', credentials: 'same-origin',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: '{}'
      }).then(async response => {
        const data = await response.json().catch(() => ({}));
        if (!response.ok || !data.success || !data.csrf) throw new Error(data.message || 'Could not start a secure session.');
        csrfToken = data.csrf; return csrfToken;
      }).finally(() => { csrfPromise = null; });
    }
    return csrfPromise;
  }
  async function api(action, data = {}) {
    const token = await getCsrf();
    const response = await fetch(apiUrl.href + '?action=' + encodeURIComponent(action), {
      method: 'POST', credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'X-AH-CSRF': token },
      body: JSON.stringify(data)
    });
    const payload = await response.json().catch(() => ({}));
    if (payload.csrf) csrfToken = payload.csrf;
    if (!response.ok || !payload.success) throw new Error(payload.message || 'Request failed.');
    return payload;
  }
  const $ = id => document.getElementById(id);
  const params = new URLSearchParams(location.search);
  if ($('verify-email')) {
    $('verify-email').value = params.get('email') || '';
    const message = (value, ok = false) => {
      $('verify-message').textContent = value;
      $('verify-message').style.color = ok ? '#18794e' : '#b42318';
    };
    if (params.get('delivery') === 'failed') message('Your account is saved, but the verification email was not delivered. Configure SMTP, then select Resend code.');
    else if (params.get('delivery') === 'sent') message('A verification email should arrive shortly. Check your inbox and spam folder.', true);
    $('verify-form').addEventListener('submit', async event => {
      event.preventDefault();
      try { const result = await api('verify', { email: $('verify-email').value.trim(), code: $('verify-code').value.trim() }); message(result.message || 'Email verified. You can now sign in.', true); setTimeout(() => location.href = 'login.html', 1200); }
      catch (error) { message(error.message); }
    });
    $('resend-code').addEventListener('click', async () => {
      try { const result = await api('resend', { email: $('verify-email').value.trim() }); message(result.message || 'If eligible, a new code has been sent.', true); }
      catch (error) { message(error.message); }
    });
  }
})();
