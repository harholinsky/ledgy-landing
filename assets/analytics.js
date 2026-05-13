(function () {
  var MEASUREMENT_ID = 'G-XFGZJ1158T';

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500
  });

  gtag('js', new Date());
  gtag('config', MEASUREMENT_ID, { anonymize_ip: true });

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + MEASUREMENT_ID;
  document.head.appendChild(s);

  var STORAGE_KEY = 'ledgy_consent_v1';

  function injectStyles() {
    var css = '#ledgy-cc{position:fixed;left:16px;right:16px;bottom:16px;max-width:480px;margin:0 auto;'
      + 'background:rgba(20,20,30,0.92);color:#fff;padding:14px 16px;border-radius:12px;'
      + 'font:14px/1.4 system-ui,sans-serif;z-index:99999;display:none;'
      + 'box-shadow:0 8px 32px rgba(0,0,0,0.4)}'
      + '#ledgy-cc.show{display:block}'
      + '#ledgy-cc .row{display:flex;gap:8px;margin-top:10px}'
      + '#ledgy-cc button{flex:1;padding:8px 12px;border-radius:8px;border:0;cursor:pointer;font-weight:600}'
      + '#ledgy-cc .accept{background:#9C96F6;color:#fff}'
      + '#ledgy-cc .reject{background:rgba(255,255,255,0.1);color:#fff}';
    var style = document.createElement('style');
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  }

  function injectBanner() {
    var div = document.createElement('div');
    div.id = 'ledgy-cc';
    div.setAttribute('role', 'dialog');
    div.setAttribute('aria-label', 'Cookie consent');
    div.innerHTML = 'We use Google Analytics to understand how visitors use ledgy.app. '
      + 'No ads, no resale, IP anonymized.'
      + '<div class="row">'
      + '<button class="reject" type="button">Reject</button>'
      + '<button class="accept" type="button">Accept</button>'
      + '</div>';
    document.body.appendChild(div);
    div.querySelector('.accept').addEventListener('click', function () { setConsent(true); });
    div.querySelector('.reject').addEventListener('click', function () { setConsent(false); });
    return div;
  }

  function grant() {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted'
    });
  }

  function setConsent(accepted) {
    try { localStorage.setItem(STORAGE_KEY, String(accepted)); } catch (e) {}
    var el = document.getElementById('ledgy-cc');
    if (el) el.classList.remove('show');
    if (accepted) grant();
  }

  function init() {
    injectStyles();
    var banner = injectBanner();
    var stored;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) { stored = null; }
    if (stored === null) {
      banner.classList.add('show');
    } else if (stored === 'true') {
      grant();
    }
  }

  window.LedgyConsent = { set: setConsent, grant: grant };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
