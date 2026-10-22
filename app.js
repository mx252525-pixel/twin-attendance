/* Static home-screen entry. Authentication stays in the existing Apps Script app. */
(() => {
  'use strict';
  const openApp = document.getElementById('openApp');
  const installButton = document.getElementById('installApp');
  const guide = document.getElementById('installGuide');
  const status = document.getElementById('connectionStatus');
  const standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  let installPrompt = null;
  let launchTimer;

  function showGuide() {
    if (typeof guide.showModal === 'function') guide.showModal();
    else guide.setAttribute('open', '');
  }
  function closeGuide() {
    if (typeof guide.close === 'function') guide.close();
    else guide.removeAttribute('open');
    installButton.focus();
  }
  document.getElementById('closeGuide').addEventListener('click', closeGuide);
  document.getElementById('doneGuide').addEventListener('click', closeGuide);
  guide.addEventListener('click', event => { if (event.target === guide) { const box = guide.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) closeGuide(); } });
  installButton.hidden = standalone;
  installButton.addEventListener('click', async () => {
    if (!installPrompt) { showGuide(); return; }
    const prompt = installPrompt;
    installPrompt = null;
    try { await prompt.prompt(); await prompt.userChoice; }
    catch (_) { showGuide(); }
  });
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    installPrompt = event;
    if (!standalone) installButton.hidden = false;
  });
  window.addEventListener('appinstalled', () => { installPrompt = null; installButton.hidden = true; });

  function launch() {
    if (document.visibilityState === 'hidden') return;
    if (!navigator.onLine) { status.textContent = '인터넷 연결 후 근무 기록을 열어주세요.'; return; }
    status.textContent = '근무 기록으로 연결하고 있어요.';
    // Keep OAuth in a normal top-level browser page; never embed or proxy the app.
    window.location.replace(openApp.href);
  }
  openApp.addEventListener('click', () => window.clearTimeout(launchTimer));
  if (standalone) {
    launchTimer = window.setTimeout(launch, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 350);
  }
  window.addEventListener('pagehide', () => window.clearTimeout(launchTimer));
  window.addEventListener('pageshow', event => {
    if (event.persisted) { window.clearTimeout(launchTimer); status.textContent = ''; }
  });

  // Only this static entry is cached. OAuth, sessions, and work records never pass here.
  if ('serviceWorker' in navigator && window.isSecureContext) {
    navigator.serviceWorker.register('./sw.js', { scope: './' }).catch(() => {});
  }
})();
