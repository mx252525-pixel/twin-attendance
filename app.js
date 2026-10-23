/* Top-level entry only. Authentication and records remain in Apps Script. */
(() => {
  'use strict';
  const retry = document.getElementById('retryLink');
  const status = document.getElementById('connectionStatus');
  const installPage = document.body.dataset.entry === 'install';
  const standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  const automatic = !installPage || standalone;
  let launchTimer;
  let fallbackTimer;
  let started = false;
  let left = false;

  function offerRetry(message) {
    status.textContent = message;
    retry.hidden = false;
  }
  function launch() {
    if (started || left || document.visibilityState === 'hidden') return;
    if (!navigator.onLine) { offerRetry('인터넷 연결을 확인해 주세요.'); return; }
    started = true;
    status.textContent = '';
    fallbackTimer = window.setTimeout(() => offerRetry('연결이 늦어지면 다시 시도해 주세요.'), 7000);
    // Preserve the existing OAuth flow in a normal top-level browser page.
    try { window.location.replace(retry.href); }
    catch (_) { window.clearTimeout(fallbackTimer); started = false; offerRetry('다시 연결해 주세요.'); }
  }
  function scheduleLaunch() {
    if (!automatic || started || left || document.visibilityState === 'hidden') return;
    window.clearTimeout(launchTimer);
    launchTimer = window.setTimeout(launch, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 250);
  }
  retry.addEventListener('click', () => { window.clearTimeout(launchTimer); window.clearTimeout(fallbackTimer); });
  document.addEventListener('visibilitychange', () => { if (automatic) scheduleLaunch(); });
  window.addEventListener('online', () => { if (automatic) scheduleLaunch(); });
  window.addEventListener('pagehide', () => {
    left = true;
    window.clearTimeout(launchTimer);
    window.clearTimeout(fallbackTimer);
  });
  window.addEventListener('pageshow', event => {
    if (event.persisted) { left = false; started = false; offerRetry('근무 기록으로 다시 연결할 수 있어요.'); }
  });
  scheduleLaunch();

  // Cache only this small static shell. Never cache OAuth or work records.
  if ('serviceWorker' in navigator && window.isSecureContext) {
    navigator.serviceWorker.register('./sw.js', { scope: './' }).catch(() => {});
  }
})();
